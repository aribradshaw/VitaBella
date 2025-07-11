<?php
$accepted_states = get_option('vita_bella_states_accepted', []);
?>
<script>
window.vitaBellaAcceptedStates = <?php echo json_encode($accepted_states); ?>;
</script>
<div class="vita-bella-form-wrapper">
<form id="vita-bella-form" class="vita-bella-form-container">
    <!-- Hidden field to capture plan type from URL parameters -->
    <input type="hidden" name="plan_type" id="vita-bella-plan-type" value="" />
    <div id="vita-bella-form-error" class="vita-bella-form-error" style="display:none;"></div>
    <div id="vita-bella-form-success" class="vita-bella-form-success" style="display:none;"></div>
    <!-- Step 1: Biological Sex (now first and active step) -->
    <div class="vita-bella-form-step active">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">What is your biological sex? <span style="color:#d8000c;">*</span></label>
        <div class="vita-bella-form-gender-btns" style="display: flex; gap: 0; justify-content: center; margin: 32px 0;">
            <button type="button" class="vb-gender-btn vb-gender-male" data-sex="MALE" style="background:#2196f3;color:#fff;padding:18px 0;font-size:1.2em;border:none;border-radius:8px 0 0 8px;cursor:pointer;flex:1;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:1.5em;margin-right:12px;">&#9794;</span> Male
            </button>
            <button type="button" class="vb-gender-btn vb-gender-female" data-sex="FEMALE" style="background:#e91e63;color:#fff;padding:18px 0;font-size:1.2em;border:none;border-radius:0 8px 8px 0;cursor:pointer;flex:1;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:1.5em;margin-right:12px;">&#9792;</span> Female
            </button>
        </div>
    </div>
    <!-- Step 2: Name -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <div class="vita-bella-form-row">
            <div style="flex:1;">
                <label class="vita-bella-form-label">First Name <span style="color:#d8000c;">*</span></label>
                <input type="text" name="first_name" class="vita-bella-form-input" placeholder="First Name" required />
            </div>
            <div style="flex:1;">
                <label class="vita-bella-form-label">Last Name <span style="color:#d8000c;">*</span></label>
                <input type="text" name="last_name" class="vita-bella-form-input" placeholder="Last Name" required />
            </div>
        </div>
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <!-- Step 3: Email -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">Email <span style="color:#d8000c;">*</span></label>
        <input type="email" name="email" class="vita-bella-form-input" placeholder="Email" required />
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <!-- Step 4: Phone -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">Please enter a valid phone number. <span style="color:#d8000c;">*</span></label>
        <input type="tel" name="phone" id="vita-bella-phone" class="vita-bella-form-input" placeholder="+1 (___) ___-____" maxlength="18" required autocomplete="tel" inputmode="tel" />
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <script>
    // Improved phone input masking to prevent random 1s and handle editing
    document.addEventListener('DOMContentLoaded', function() {
        var phoneInput = document.getElementById('vita-bella-phone');
        if (!phoneInput) return;

        phoneInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let value = phoneInput.value.replace(/\D/g, '');

            // Remove leading '1' if user tries to type it (since we always add +1)
            if (value.startsWith('1')) {
                value = value.substring(1);
            }

            value = value.substring(0, 10); // US numbers only

            let formatted = '';
            if (value.length > 0) {
                formatted = '+1 ';
                if (value.length <= 3) {
                    formatted += '(' + value;
                } else if (value.length <= 6) {
                    formatted += '(' + value.substring(0,3) + ') ' + value.substring(3);
                } else {
                    formatted += '(' + value.substring(0,3) + ') ' + value.substring(3,6) + '-' + value.substring(6);
                }
            }
            phoneInput.value = formatted;
        });

        // On form submit, strip formatting so only digits are sent
        phoneInput.form && phoneInput.form.addEventListener('submit', function() {
            phoneInput.value = phoneInput.value.replace(/\D/g, '');
        });
    });
    </script>
    <!-- Step 5: State -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">What State Do You Live In? <span style="color:#d8000c;">*</span></label>
        <select name="state" class="vita-bella-form-select" required>
            <option value="">Select State</option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="District of Columbia">District of Columbia</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
        </select>
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <!-- Step 6: Referral -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">How did you find out about Vita Bella? <span style="color:#d8000c;">*</span></label>
        <select name="referral" id="vita-bella-referral" class="vita-bella-form-select" required>
            <option value="">Select</option>
            <option value="Google">Google</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="TikTok">TikTok</option>
            <option value="Friend / Referral">Friend / Referral</option>
            <option value="Other">Other</option>
        </select>
        <div id="vita-bella-referral-other-wrap" class="vita-bella-form-hidden">
            <input type="text" name="referral_other" id="vita-bella-referral-other" class="vita-bella-form-input" placeholder="How did you hear about us?" />
        </div>
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <!-- Step 7: Health Goals -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">What are your primary health goals for the next 90 days? <span style="color:#d8000c;">*</span></label>
        <div>
            <label><input type="checkbox" name="goals[]" value="Increase Energy Levels" class="vita-bella-form-checkbox" /> Increase Energy Levels</label><br>
            <label><input type="checkbox" name="goals[]" value="Improve Mental Clarity" class="vita-bella-form-checkbox" /> Improve Mental Clarity</label><br>
            <label><input type="checkbox" name="goals[]" value="Enhance Physical Performance" class="vita-bella-form-checkbox" /> Enhance Physical Performance</label><br>
            <label><input type="checkbox" name="goals[]" value="Balance Hormones" class="vita-bella-form-checkbox" /> Balance Hormones</label><br>
            <label><input type="checkbox" name="goals[]" value="Optimize Sleep Clarity" class="vita-bella-form-checkbox" /> Optimize Sleep Clarity</label><br>
            <label><input type="checkbox" name="goals[]" value="Lose Weight" class="vita-bella-form-checkbox" /> Lose Weight</label>
        </div>
        <textarea name="goals_detail" class="vita-bella-form-textarea" placeholder="Please elaborate (optional)"></textarea>
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <!-- Step 8: Long-term Objectives -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">What are your long-term (1+ year) health objectives? <span style="color:#d8000c;">*</span></label>
        <div>
            <label><input type="checkbox" name="objectives[]" value="Maintain peak cognitive performance" class="vita-bella-form-checkbox" /> Maintain peak cognitive performance</label><br>
            <label><input type="checkbox" name="objectives[]" value="Achieve optimal physical fitness" class="vita-bella-form-checkbox" /> Achieve optimal physical fitness</label><br>
            <label><input type="checkbox" name="objectives[]" value="Support longevity and healthy aging" class="vita-bella-form-checkbox" /> Support longevity and healthy aging</label><br>
            <label><input type="checkbox" name="objectives[]" value="Prevent age-related decline" class="vita-bella-form-checkbox" /> Prevent age-related decline</label><br>
            <label><input type="checkbox" name="objectives[]" value="Maintain career performance edge" class="vita-bella-form-checkbox" /> Maintain career performance edge</label><br>
            <label><input type="checkbox" name="objectives[]" value="Support long-term hormone balance" class="vita-bella-form-checkbox" /> Support long-term hormone balance</label><br>
            <label><input type="checkbox" name="objectives[]" value="Other" class="vita-bella-form-checkbox" /> Other</label>
        </div>
        <textarea name="objectives_detail" class="vita-bella-form-textarea" placeholder="Please elaborate (optional)"></textarea>
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <!-- Step 9: Physical Activity -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">How often do you engage in physical activity? <span style="color:#d8000c;">*</span></label>
        <select name="activity" class="vita-bella-form-select" required>
            <option value="">Select</option>
            <option value="Never">Never</option>
            <option value="Rarely (1-2x/month)">Rarely (1-2x/month)</option>
            <option value="Occasionally (1-2x/week)">Occasionally (1-2x/week)</option>
            <option value="Regularly (3-4x/week)">Regularly (3-4x/week)</option>
            <option value="Daily">Daily</option>
            <option value="Other">Other</option>
        </select>
        <textarea name="activity_detail" class="vita-bella-form-textarea" placeholder="Please elaborate (optional)"></textarea>
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <!-- Step 10: Stress -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">How often do you experience stress? <span style="color:#d8000c;">*</span></label>
        <select name="stress" class="vita-bella-form-select" required>
            <option value="">Select</option>
            <option value="Never">Never</option>
            <option value="Rarely">Rarely</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Regularly">Regularly</option>
            <option value="Daily">Daily</option>
        </select>
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <!-- Step 11: Eating Habits -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label">How would you rate your overall eating habits? <span style="color:#d8000c;">*</span></label>
        <select name="eating" class="vita-bella-form-select" required>
            <option value="">Select</option>
            <option value="0">0 - Poor / Mostly Junk Food</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5 - Excellent / Whole Foods</option>
        </select>
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="button" class="vb-form-btn vb-form-next">Next</button>
        </div>
    </div>
    <!-- Step 12: Comms Acceptance -->
    <div class="vita-bella-form-step">
        <img src="https://www.vitabella.com/wp-content/uploads/2025/03/01_VB_Main-Logo_Black_RGB.svg" alt="Vita Bella Logo" class="vita-bella-form-logo" style="margin-bottom: 12px;" />
        <label class="vita-bella-form-label" style="margin-bottom: 15px;">
            <input type="checkbox" name="comms_accept" value="1" required class="vita-bella-form-checkbox" />
            By clicking 'Submit', you agree that Vita Bella may use your responses to personalize your experience and other purposes as described in our Privacy Policy. Responses prior to account creation will not be used as part of your medical assessment.
        </label>
        <div class="vita-bella-form-btn-row">
            <button type="button" class="vb-form-btn vb-form-prev">Previous</button>
            <button type="submit" class="vb-form-btn" style="width:48%;">Submit</button>
        </div>
    </div>
    <script src="https://www.google.com/recaptcha/api.js?render=<?php echo esc_attr(get_option('vita_bella_recaptcha_site_key')); ?>"></script>
</form>
</div>
