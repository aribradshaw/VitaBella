jQuery(document).ready(function($) {
    const $steps = $('.vita-bella-form-step');
    const $form = $('#vita-bella-form');
    const $error = $('#vita-bella-form-error');
    const $success = $('#vita-bella-form-success');

    // Detect plan type from URL parameters
    function detectPlanType() {
        const urlParams = new URLSearchParams(window.location.search);
        let planType = '';
        
        if (urlParams.has('fm')) {
            planType = 'fm';
        } else if (urlParams.has('fa')) {
            planType = 'fa';
        } else if (urlParams.has('pm')) {
            planType = 'pm';
        } else if (urlParams.has('pa')) {
            planType = 'pa';
        }
        
        $('#vita-bella-plan-type').val(planType);
        console.log('Detected plan type:', planType);
    }

    // Initialize plan type detection
    detectPlanType();

    // Set currentStep to the index of the .active step (default 0)
    let currentStep = $steps.index($steps.filter('.active'));
    if (currentStep < 0) currentStep = 0;

    function showStep(idx) {
        $steps.removeClass('active');
        $($steps[idx]).addClass('active');
        $error.text('').hide();
    }
    function nextStep() {
        // Skip validation for Start step (step 0)
        if (currentStep !== 0 && !validateStep(currentStep)) return;
        if (currentStep < $steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }
    function validateStep(idx) {
        let valid = true;
        $error.text('').hide();
        const $step = $($steps[idx]);
        // Only validate required fields in the current step
        $step.find('[required]').each(function() {
            if (!$(this).val()) {
                valid = false;
                $error.text('Please fill all required fields.').show();
                // Try to focus the first invalid field
                $(this).focus();
                return false;
            }
        });
        // Special validation for biological sex radio buttons (step 1)
        if ($step.find('input[name="sex"]').length) {
            if ($step.find('input[name="sex"]:checked').length === 0) {
                valid = false;
                $error.text('Please select your biological sex.').show();
                $step.find('input[name="sex"]').first().focus();
                return false;
            }
        }
        // Email validation
        if ($step.find('input[type=email]').length) {
            const email = $step.find('input[type=email]').val();
            if (email && !/^\S+@\S+\.\S+$/.test(email)) {
                valid = false;
                $error.text('Please enter a valid email.').show();
                $step.find('input[type=email]').focus();
            }
        }
        // Phone validation (always use hidden field)
        if ($step.find('input[type=tel]').length) {
            const phone = $('#phone-raw').val();
            const phoneValid = /^\+1\d{10}$/.test(phone);
            console.log('[Phone Validation] Value:', phone, '| Valid:', phoneValid);
            if (!phoneValid) {
                valid = false;
                $error.text('Please enter a valid phone number.').show();
                $step.find('input[type=tel]').focus();
            }
        }
        return valid;
    }
    // Conditional logic for referral
    $('#vita-bella-referral').on('change', function() {
        if ($(this).val() === 'Other') {
            $('#vita-bella-referral-other-wrap').removeClass('vita-bella-form-hidden');
            $('#vita-bella-referral-other').attr('required', true);
        } else {
            $('#vita-bella-referral-other-wrap').addClass('vita-bella-form-hidden');
            $('#vita-bella-referral-other').removeAttr('required');
        }
    });
    // Navigation (support both old and new button classes) with debug
    $('.vita-bella-form-container').on('click', '.vita-bella-form-next, .vb-form-next', function(e) {
        console.log('Next button clicked:', this, 'Current step:', currentStep);
        nextStep();
    });
    $('.vita-bella-form-container').on('click', '.vita-bella-form-prev, .vb-form-prev', function(e) {
        console.log('Prev button clicked:', this, 'Current step:', currentStep);
        prevStep();
    });
    // Submit
    $form.on('submit', function(e) {
        e.preventDefault();
        console.log('Form submit triggered. Current step:', currentStep);
        if (!validateStep(currentStep)) {
            console.warn('Validation failed at step', currentStep);
            return;
        }
        if (typeof grecaptcha === 'undefined') {
            $error.text('reCAPTCHA not loaded.').show();
            console.error('reCAPTCHA not loaded.');
            return;
        }
        grecaptcha.ready(function() {
            grecaptcha.execute(vitaBellaForm.recaptcha_site_key, {action: 'submit'}).then(function(token) {
                const formData = $form.serializeArray();
                formData.push({name: 'recaptcha', value: token});
                formData.push({name: 'action', value: 'vita_bella_submit'});
                console.log('Submitting form data:', formData);
                $.post(vitaBellaForm.ajax_url, formData, function(resp) {
                    console.log('AJAX response:', resp);
                    if (resp.data && resp.data.ac_debug) {
                        console.log('ActiveCampaign REQUEST:', resp.data.ac_debug.ac_request);
                        console.log('ActiveCampaign RESPONSE:', resp.data.ac_debug.ac_response);
                    }
                    if (resp.success) {
                        $success.text('Thank you! Please wait to be redirected...').show();
                        setTimeout(function() {
                            if (resp.data && resp.data.redirect) {
                                window.location.href = resp.data.redirect;
                            } else {
                                $form.hide();
                                $success.text('Submission successful, but no redirect URL was returned.').show();
                            }
                        }, 1200);
                    } else {
                        $error.text((resp.data && resp.data.message) || 'Submission failed.').show();
                        console.error('Submission error:', resp);
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    $error.text('AJAX request failed: ' + textStatus).show();
                    console.error('AJAX request failed:', textStatus, errorThrown, jqXHR.responseText);
                });
            }).catch(function(err) {
                $error.text('reCAPTCHA error.').show();
                console.error('reCAPTCHA error:', err);
            });
        });
    });
    // Prevent Enter from submitting unless on last step
    $form.on('keydown', function(e) {
        if (e.key === 'Enter') {
            // If not on last step, prevent default and go to next step
            if (currentStep < $steps.length - 1) {
                e.preventDefault();
                nextStep();
            }
        }
    });
    // Auto-advance for single-choice radio steps (e.g., biological sex)
    $steps.each(function(idx, step) {
        const $step = $(step);
        // If this step has only one required radio group, auto-advance on change
        const $radios = $step.find('input[type=radio][name]');
        if ($radios.length && $radios.filter('[required]').length && $radios.map(function(){return this.name;}).get().filter((v,i,a)=>a.indexOf(v)===i).length === 1) {
            $radios.on('change', function() {
                // Only advance if a value is selected
                if ($step.find('input[type=radio]:checked').length) {
                    setTimeout(nextStep, 150); // slight delay for UX
                }
            });
        }
    });
    // --- CONDITIONAL SKIP LOGIC FOR ACCEPTED STATES ---
    function isAcceptedState(state) {
        if (!window.vitaBellaAcceptedStates) return false;
        return window.vitaBellaAcceptedStates.includes(state);
    }

    function getSelectedState() {
        return $('select[name="state"]').val();
    }

    // Update: After removing Step 7, comms acceptance is now step 12 (index 11)
    // But if skipping, we must count the steps dynamically in case of future changes
    function getCommsStepIndex() {
        // Find the index of the comms acceptance step
        let idx = -1;
        $steps.each(function(i, el) {
            if ($(el).find('input[name="comms_accept"]').length) {
                idx = i;
            }
        });
        return idx;
    }
    const originalNextStep = nextStep;
    nextStep = function() {
        // Only skip after referral (step 6, index 5)
        if (currentStep === 5) {
            const state = getSelectedState();
            if (isAcceptedState(state)) {
                currentStep = getCommsStepIndex();
                showStep(currentStep);
                return;
            }
        }
        // Otherwise, default behavior
        originalNextStep();
    };
    // --- GENDER BUTTON LOGIC ---
    $('.vb-gender-btn').on('click', function(e) {
        console.log('[Gender Button] Clicked:', this);
        if (typeof $ === 'undefined') {
            console.error('[Gender Button] jQuery $ is undefined!');
        }
        if (!$(this).data('sex')) {
            console.error('[Gender Button] No data-sex attribute found!');
        }
        const sex = $(this).data('sex');
        // Set hidden input or create if not exists
        let $input = $('input[name="sex"]');
        if (!$input.length) {
            $input = $('<input type="hidden" name="sex" />').appendTo('#vita-bella-form');
            console.log('[Gender Button] Created hidden input for sex');
        }
        $input.val(sex);
        console.log('[Gender Button] Set sex value:', sex);
        // Go to next step
        currentStep = 1;
        showStep(currentStep);
        console.log('[Gender Button] Advanced to step 1');
        e.preventDefault();
    });
    // --- PHONE AUTO-FORMAT (NO EXTRA 1s, ONLY 10 DIGITS, ALWAYS SUBMIT +1XXXXXXXXXX) ---
    $('input[name="phone"]').on('input', function() {
        let val = $(this).val().replace(/\D/g, '');
        // If user types a leading 1, remove it
        if (val.length > 0 && val[0] === '1') {
            val = val.slice(1);
        }
        if (val.length > 10) val = val.slice(0, 10);
        // Store as +1XXXXXXXXXX in a hidden field for submission
        let raw = val.length === 10 ? '+1' + val : '';
        let $hidden = $('#phone-raw');
        if (!$hidden.length) {
            $hidden = $('<input type="hidden" id="phone-raw" name="phone" />').appendTo('#vita-bella-form');
        }
        $hidden.val(raw);
        // Show formatted to user as +1 (XXX) XXX-XXXX
        let formatted = '';
        if (val.length > 0) {
            formatted = '+1 ';
            if (val.length <= 3) {
                formatted += '(' + val;
            } else if (val.length <= 6) {
                formatted += '(' + val.slice(0,3) + ') ' + val.slice(3);
            } else {
                formatted += '(' + val.slice(0,3) + ') ' + val.slice(3,6) + '-' + val.slice(6);
            }
        }
        $(this).val(formatted);
        // Debug logging
        console.log('[Phone Input] Raw digits:', val, '| Hidden value:', raw, '| Formatted:', formatted);
    });
    // On form submit, use hidden phone value for validation and submission
    $form.on('submit', function() {
        let $hidden = $('#phone-raw');
        if ($hidden.length) {
            $('input[name="phone"][type="tel"]').val($hidden.val());
            console.log('[Form Submit] Setting phone input to hidden value:', $hidden.val());
        }
    });
    // --- REQUIRED ATTRIBUTES LOGIC ---
    function setStepRequiredAttributes(idx) {
        // Remove 'required' from all fields
        $form.find('[required]').each(function() {
            $(this).data('vb-was-required', true).removeAttr('required');
        });
        // Add 'required' to fields in the current step that originally had it
        $($steps[idx]).find('[data-vb-was-required]').each(function() {
            $(this).attr('required', true);
        });
        // For fields that didn't have data-vb-was-required, add 'required' if they are in the current step and originally had it
        $($steps[idx]).find('input,select,textarea').each(function() {
            if ($(this).data('vb-was-required')) {
                $(this).attr('required', true);
            }
        });
    }
    // Patch showStep to update required attributes
    const originalShowStep = showStep;
    showStep = function(idx) {
        setStepRequiredAttributes(idx);
        originalShowStep(idx);
    };
    // On form submit, ensure only current step fields are required
    $form.on('submit', function() {
        setStepRequiredAttributes(currentStep);
    });
    // On page load, set required attributes for the initial step
    setStepRequiredAttributes(currentStep);
    // Initial
    showStep(currentStep);
    // Find the index of the health goals step (step 7, but dynamic)
    function getHealthGoalsStepIndex() {
        let idx = -1;
        $steps.each(function(i, el) {
            // Try to match a unique heading or class for health goals step
            if (
                $(el).find('[name="activity"]').length &&
                $(el).find('[name="stress"]').length &&
                $(el).find('[name="eating"]').length
            ) {
                idx = i;
            }
        });
        console.log('[Health Goals Step] Calculated index:', idx);
        return idx;
    }
    // Patch prevStep for accepted states logic
    const originalPrevStep = prevStep;
    prevStep = function() {
        // If on comms step
        if (currentStep === getCommsStepIndex()) {
            const state = getSelectedState();
            if (isAcceptedState(state)) {
                // Go to referral step (step 6) if accepted
                let referralIdx = -1;
                $steps.each(function(i, el) {
                    if ($(el).find('select[name="referral"]').length) {
                        referralIdx = i;
                    }
                });
                if (referralIdx !== -1) {
                    console.log('[PrevStep] On comms, accepted state, going to referral step:', referralIdx);
                    currentStep = referralIdx;
                    showStep(currentStep);
                } else {
                    console.warn('[PrevStep] Referral step index not found!');
                }
                return;
            } else {
                // Go to eating habits step if not accepted
                let eatingIdx = -1;
                $steps.each(function(i, el) {
                    if ($(el).find('select[name="eating"]').length) {
                        eatingIdx = i;
                    }
                });
                if (eatingIdx !== -1) {
                    console.log('[PrevStep] On comms, not accepted state, going to eating habits step:', eatingIdx);
                    currentStep = eatingIdx;
                    showStep(currentStep);
                } else {
                    console.warn('[PrevStep] Eating habits step index not found!');
                }
                return;
            }
        }
        // Otherwise, default behavior
        originalPrevStep();
    };
});
