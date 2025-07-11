<?php
/*
Plugin Name: Vita Bella Signup Form
Description: Fast, efficient multi-step form with ActiveCampaign integration, reCAPTCHA, and conditional logic.
Version: 1.12 - Styling Q12
Author: Ari Daniel Bradshaw - Vita Bella
*/

if (!defined('ABSPATH')) exit;

// Enqueue scripts and styles
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('vita-bella-form', plugin_dir_url(__FILE__).'assets/vita-bella-form.css', [], filemtime(plugin_dir_path(__FILE__).'assets/vita-bella-form.css'));
    wp_enqueue_script(
        'vita-bella-form',
        plugin_dir_url(__FILE__).'assets/vita-bella-form.js',
        ['jquery'],
        filemtime(plugin_dir_path(__FILE__).'assets/vita-bella-form.js'), // cache busting
        true
    );
    wp_localize_script('vita-bella-form', 'vitaBellaForm', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'recaptcha_site_key' => get_option('vita_bella_recaptcha_site_key', ''),
    ]);
});
// Exclude from Rocket Loader
add_filter('script_loader_tag', function($tag, $handle) {
    if ($handle === 'vita-bella-form') {
        return str_replace('<script ', '<script data-cfasync="false" ', $tag);
    }
    return $tag;
}, 10, 2);

// Shortcode to display the form
add_shortcode('vita_bella_form', function() {
    ob_start();
    include plugin_dir_path(__FILE__).'templates/form.php';
    return ob_get_clean();
});

// AJAX handler for form submission
add_action('wp_ajax_vita_bella_submit', 'vita_bella_handle_submit');
add_action('wp_ajax_nopriv_vita_bella_submit', 'vita_bella_handle_submit');

function vita_bella_handle_submit() {
    // Validate reCAPTCHA
    $recaptcha_secret = get_option('vita_bella_recaptcha_secret_key', '');
    $recaptcha_response = $_POST['recaptcha'] ?? '';
    $recaptcha = wp_remote_post('https://www.google.com/recaptcha/api/siteverify', [
        'body' => [
            'secret' => $recaptcha_secret,
            'response' => $recaptcha_response
        ]
    ]);
    $recaptcha_result = json_decode(wp_remote_retrieve_body($recaptcha), true);
    // Check v3 score threshold
    $recaptcha_threshold = floatval(get_option('vita_bella_recaptcha_threshold', 0.5));    if (empty($recaptcha_result['success']) || (isset($recaptcha_result['score']) && $recaptcha_result['score'] < $recaptcha_threshold)) {
        wp_send_json_error(['message' => 'reCAPTCHA failed.']);
    }

    // Collect and sanitize form data
    // Remove start_date from required fields
    $fields = [
        'sex', 'first_name', 'last_name', 'email', 'phone', 'state', 'referral', 'referral_other',
        'goals', 'goals_detail', 'objectives', 'objectives_detail',
        'activity', 'activity_detail', 'stress', 'eating', 'comms_accept', 'plan_type'
    ];
    $data = [];
    foreach ($fields as $field) {
        $data[$field] = sanitize_text_field($_POST[$field] ?? '');
    }

    // Format phone number to include +1 if not present
    if (!empty($data['phone'])) {
        $phone = preg_replace('/[^0-9]/', '', $data['phone']);
        if (strlen($phone) === 10) {
            $data['phone'] = '+1' . $phone;
        } elseif (strlen($phone) === 11 && strpos($phone, '1') === 0) {
            $data['phone'] = '+'.$phone;
        } // else, leave as is (already has country code or is invalid)
    }

    // --- SIMPLE: Always use numeric list ID, convert from name if needed ---
    $ac_api_url = get_option('vita_bella_ac_api_url', '');
    $ac_api_key = get_option('vita_bella_ac_api_key', '');
    $ac_lists = [];
    if ($ac_api_url && $ac_api_key) {
        $ac_lists = get_activecampaign_lists($ac_api_url, $ac_api_key);
    }
    $states_accepted = (array) get_option('vita_bella_states_accepted', []);
    $redirect_url = '';
    $ac_list_id = '';
    
    // Plan-based redirect logic for accepted states
    if (in_array($data['state'], $states_accepted)) {
        $plan_type = $data['plan_type'];
        switch ($plan_type) {
            case 'fm': // Foundation Monthly
                $redirect_url = get_option('vita_bella_redirect_fm', '');
                break;
            case 'fa': // Foundation Annual
                $redirect_url = get_option('vita_bella_redirect_fa', '');
                break;
            case 'pm': // Performance Monthly
                $redirect_url = get_option('vita_bella_redirect_pm', '');
                break;
            case 'pa': // Performance Annual
                $redirect_url = get_option('vita_bella_redirect_pa', '');
                break;
            default: // Fallback to original accepted URL
                $redirect_url = get_option('vita_bella_redirect_accepted', '');
                break;
        }
        $ac_list_id = get_option('vita_bella_ac_list_id_accepted', '');
        $field_map = get_option('vita_bella_map_accepted', []);
    } else {
        $redirect_url = get_option('vita_bella_redirect_waitlist', '');
        $ac_list_id = get_option('vita_bella_ac_list_id_waitlist', '');
        $field_map = get_option('vita_bella_map_waitlist', []);
    }
    // Convert list name to numeric ID if needed
    if (!is_numeric($ac_list_id) && $ac_list_id && is_array($ac_lists)) {
        foreach ($ac_lists as $list) {
            if (strcasecmp($list['name'], $ac_list_id) === 0) {
                $ac_list_id = $list['id'];
                break;
            }
        }
    }
    if (!is_numeric($ac_list_id)) {
        $ac_list_id = '';
    }

    // --- FIELD MAPPING: Use mapped field IDs for custom fields ---
    $ac_data = [
        'contact' => [
            'email' => $data['email'],
            'firstName' => $data['first_name'],
            'lastName' => $data['last_name'],
            'phone' => $data['phone'],
            'fieldValues' => []
        ]
    ];
    // Only map fields that have a mapping and a value
    foreach ($field_map as $form_key => $ac_field_id) {
        if (!empty($ac_field_id) && isset($data[$form_key]) && $data[$form_key] !== '') {
            $ac_data['contact']['fieldValues'][] = [
                'field' => $ac_field_id,
                'value' => $data[$form_key]
            ];
        }
    }
    // Special case: referral_other
    if (!empty($field_map['referral']) && $data['referral'] === 'Other' && !empty($data['referral_other'])) {
        $ac_data['contact']['fieldValues'][] = [
            'field' => $field_map['referral'],
            'value' => $data['referral_other']
        ];
    }

    file_put_contents(__DIR__.'/ac_debug.log', "Contact sync request: " . print_r($ac_data, true) . "\n", FILE_APPEND);

    // Output ActiveCampaign request/response for browser console
    if (!headers_sent()) {
        header('Content-Type: application/json');
    }
    $response = wp_remote_post($ac_api_url.'/api/3/contact/sync', [
        'headers' => [
            'Api-Token' => $ac_api_key,
            'Content-Type' => 'application/json'
        ],
        'body' => json_encode($ac_data)
    ]);
    
    file_put_contents(__DIR__.'/ac_debug.log', "Contact sync response code: " . wp_remote_retrieve_response_code($response) . "\n", FILE_APPEND);
    file_put_contents(__DIR__.'/ac_debug.log', "Contact sync response body: " . wp_remote_retrieve_body($response) . "\n", FILE_APPEND);
    
    $ac_debug = [
        'ac_request' => $ac_data,
        'ac_response' => $response
    ];
    // --- DEBUG LOGGING ---
    file_put_contents(__DIR__.'/ac_debug.log', print_r([
        'time' => date('Y-m-d H:i:s'),
        'ac_request' => $ac_data,
        'ac_response' => $response,
        'body' => is_wp_error($response) ? $response->get_error_message() : wp_remote_retrieve_body($response)
    ], true), FILE_APPEND);
    // --- END DEBUG LOGGING ---    // --- ENSURE CONTACT IS ADDED TO LIST ---
    file_put_contents(__DIR__.'/ac_debug.log', "Checking if contact should be added to list...\n", FILE_APPEND);
    file_put_contents(__DIR__.'/ac_debug.log', "ac_list_id for subscribe: " . $ac_list_id . "\n", FILE_APPEND);
    file_put_contents(__DIR__.'/ac_debug.log', "is_wp_error(response): " . (is_wp_error($response) ? 'YES' : 'NO') . "\n", FILE_APPEND);
    
    if (is_wp_error($response)) {
        file_put_contents(__DIR__.'/ac_debug.log', "ERROR: Contact sync failed: " . $response->get_error_message() . "\n", FILE_APPEND);
        wp_send_json_error(['message' => 'ActiveCampaign error: ' . $response->get_error_message(), 'ac_debug' => $ac_debug]);
    }
    
    $body = json_decode(wp_remote_retrieve_body($response), true);
    $contact_id = $body['contact']['id'] ?? null;
    
    file_put_contents(__DIR__.'/ac_debug.log', "Contact ID from sync response: " . $contact_id . "\n", FILE_APPEND);
    file_put_contents(__DIR__.'/ac_debug.log', "ac_list_id is numeric: " . (is_numeric($ac_list_id) ? 'YES' : 'NO') . "\n", FILE_APPEND);
    
    if ($contact_id && $ac_list_id && is_numeric($ac_list_id)) {
        file_put_contents(__DIR__.'/ac_debug.log', "Proceeding with list subscription...\n", FILE_APPEND);
        
        $contact_list_data = [
            'contactList' => [
                'list' => (int)$ac_list_id,
                'contact' => $contact_id,
                'status' => 1 // 1 = subscribe
            ]
        ];
        
        file_put_contents(__DIR__.'/ac_debug.log', "List subscription request: " . print_r($contact_list_data, true) . "\n", FILE_APPEND);
        
        $list_response = wp_remote_post($ac_api_url.'/api/3/contactLists', [
            'headers' => [
                'Api-Token' => $ac_api_key,
                'Content-Type' => 'application/json'
            ],
            'body' => json_encode($contact_list_data)
        ]);
        
        file_put_contents(__DIR__.'/ac_debug.log', "List subscription response code: " . wp_remote_retrieve_response_code($list_response) . "\n", FILE_APPEND);
        file_put_contents(__DIR__.'/ac_debug.log', "List subscription response body: " . wp_remote_retrieve_body($list_response) . "\n", FILE_APPEND);
        
        if (is_wp_error($list_response)) {
            file_put_contents(__DIR__.'/ac_debug.log', "ERROR: List subscription failed: " . $list_response->get_error_message() . "\n", FILE_APPEND);
        }
    } else {
        file_put_contents(__DIR__.'/ac_debug.log', "SKIPPED list subscription because:\n", FILE_APPEND);
        file_put_contents(__DIR__.'/ac_debug.log', "- contact_id: " . ($contact_id ?: 'MISSING') . "\n", FILE_APPEND);
        file_put_contents(__DIR__.'/ac_debug.log', "- ac_list_id: " . ($ac_list_id ?: 'MISSING') . "\n", FILE_APPEND);
        file_put_contents(__DIR__.'/ac_debug.log', "- is_numeric(ac_list_id): " . (is_numeric($ac_list_id) ? 'YES' : 'NO') . "\n", FILE_APPEND);
    }
    // --- END ENSURE CONTACT IS ADDED TO LIST ---

    // Save submission to DB for admin viewing
    global $wpdb;
    $table_name = $wpdb->prefix . 'vb_form_submissions';
    $is_accepted = in_array($data['state'], $states_accepted) ? 1 : 0;
    $wpdb->insert($table_name, [
        'created_at' => current_time('mysql'),
        'first_name' => $data['first_name'],
        'last_name' => $data['last_name'],
        'email' => $data['email'],
        'phone' => $data['phone'],
        'state' => $data['state'],
        'accepted' => $is_accepted,
        'data' => maybe_serialize($data)
    ]);

    wp_send_json_success(['redirect' => $redirect_url, 'ac_debug' => $ac_debug]);
}

// Create the submissions table on plugin activation
register_activation_hook(__FILE__, function() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'vb_form_submissions';
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        created_at DATETIME NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255),
        phone VARCHAR(50),
        state VARCHAR(50),
        accepted TINYINT(1),
        data LONGTEXT,
        PRIMARY KEY (id)
    ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
});

// Admin settings for API keys, redirect URLs, etc.
add_action('admin_menu', function() {
    add_options_page('Vita Bella Form Settings', 'Vita Bella Form', 'manage_options', 'vita-bella-form', 'vita_bella_form_settings_page');
});

add_action('admin_init', function() {
    register_setting('vita_bella_form', 'vita_bella_ac_api_key');
    register_setting('vita_bella_form', 'vita_bella_ac_api_url');
    register_setting('vita_bella_form', 'vita_bella_ac_list_id_accepted');
    register_setting('vita_bella_form', 'vita_bella_ac_list_id_waitlist');
    register_setting('vita_bella_form', 'vita_bella_recaptcha_site_key');
    register_setting('vita_bella_form', 'vita_bella_recaptcha_secret_key');
    register_setting('vita_bella_form', 'vita_bella_recaptcha_threshold');
    register_setting('vita_bella_form', 'vita_bella_redirect_accepted');
    register_setting('vita_bella_form', 'vita_bella_redirect_waitlist');
    register_setting('vita_bella_form', 'vita_bella_redirect_fm');
    register_setting('vita_bella_form', 'vita_bella_redirect_fa');
    register_setting('vita_bella_form', 'vita_bella_redirect_pm');
    register_setting('vita_bella_form', 'vita_bella_redirect_pa');
    register_setting('vita_bella_form', 'vita_bella_states_accepted');
    register_setting('vita_bella_form', 'vita_bella_map_accepted');
    register_setting('vita_bella_form', 'vita_bella_map_waitlist');
});

function get_activecampaign_lists($api_url, $api_key) {
    $response = wp_remote_get(rtrim($api_url, '/') . '/api/3/lists', [
        'headers' => [
            'Api-Token' => $api_key,
            'Content-Type' => 'application/json'
        ]
    ]);
    if (is_wp_error($response)) return [];
    $body = json_decode(wp_remote_retrieve_body($response), true);
    if (!empty($body['lists'])) {
        return $body['lists'];
    }
    return [];
}

function get_activecampaign_fields($api_url, $api_key) {
    $response = wp_remote_get(rtrim($api_url, '/') . '/api/3/fields', [
        'headers' => [
            'Api-Token' => $api_key,
            'Content-Type' => 'application/json'
        ]
    ]);
    if (is_wp_error($response)) return [];
    $body = json_decode(wp_remote_retrieve_body($response), true);
    if (!empty($body['fields'])) {
        return $body['fields'];
    }
    return [];
}

function vita_bella_form_settings_page() {
    $all_states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
        'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    $states_accepted = (array) get_option('vita_bella_states_accepted', []);
    $ac_api_url = get_option('vita_bella_ac_api_url');
    $ac_api_key = get_option('vita_bella_ac_api_key');
    $ac_lists = [];
    $ac_fields = [];
    if ($ac_api_url && $ac_api_key) {
        $ac_lists = get_activecampaign_lists($ac_api_url, $ac_api_key);
        $ac_fields = get_activecampaign_fields($ac_api_url, $ac_api_key);
        // Add standard ActiveCampaign fields manually (these are not returned by /fields API)
        $ac_standard_fields = [
            [ 'id' => 'email', 'title' => 'Email' ],
            [ 'id' => 'firstName', 'title' => 'First Name' ],
            [ 'id' => 'lastName', 'title' => 'Last Name' ],
            [ 'id' => 'phone', 'title' => 'Phone' ],
        ];
        if (is_array($ac_fields)) {
            $ac_fields = array_merge($ac_standard_fields, $ac_fields);
        } else {
            $ac_fields = $ac_standard_fields;
        }
    }
    $form_fields = [
        'email' => 'Email',
        'first_name' => 'First Name',
        'last_name' => 'Last Name',
        'phone' => 'Phone',
        'state' => 'State',
        'referral' => 'How did you find out about us?',
        'referral_other' => 'Referral Other',
        'start_date' => 'Start Date',
        'goals' => 'Primary Health Goals',
        'goals_detail' => 'Goals Detail',
        'objectives' => 'Long-term Objectives',
        'objectives_detail' => 'Objectives Detail',
        'activity' => 'Physical Activity',
        'activity_detail' => 'Activity Detail',
        'stress' => 'Stress',
        'eating' => 'Eating',
        'comms_accept' => 'Comms Acceptance',
    ];
    // Only allow mapping for these fields
    $mapping_fields = [
        'email' => 'Email',
        'first_name' => 'First Name',
        'last_name' => 'Last Name',
        'phone' => 'Phone',
        'state' => 'State',
    ];
    ?>
    <div class="wrap">
        <h1>Vita Bella Form Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('vita_bella_form'); do_settings_sections('vita_bella_form'); ?>
            <table class="form-table">
                <tr><th>ActiveCampaign API URL</th><td><input type="text" name="vita_bella_ac_api_url" value="<?php echo esc_attr($ac_api_url); ?>" size="50"></td></tr>
                <tr><th>ActiveCampaign API Key</th><td><input type="text" name="vita_bella_ac_api_key" value="<?php echo esc_attr($ac_api_key); ?>" size="50"></td></tr>
                <tr><th>Accepted List</th><td>
                    <?php if ($ac_lists): ?>
                        <select name="vita_bella_ac_list_id_accepted">
                            <?php foreach ($ac_lists as $list): ?>
                                <option value="<?php echo esc_attr($list['id']); ?>" <?php selected(get_option('vita_bella_ac_list_id_accepted'), $list['id']); ?>><?php echo esc_html($list['name']); ?></option>
                            <?php endforeach; ?>
                        </select>
                    <?php else: ?>
                        <input type="text" name="vita_bella_ac_list_id_accepted" value="<?php echo esc_attr(get_option('vita_bella_ac_list_id_accepted')); ?>" size="10">
                        <br><small>Enter API URL and Key above, then save and reload this page to select a list.</small>
                    <?php endif; ?>
                </td></tr>
                <tr><th>Waitlist List</th><td>
                    <?php if ($ac_lists): ?>
                        <select name="vita_bella_ac_list_id_waitlist">
                            <?php foreach ($ac_lists as $list): ?>
                                <option value="<?php echo esc_attr($list['id']); ?>" <?php selected(get_option('vita_bella_ac_list_id_waitlist'), $list['id']); ?>><?php echo esc_html($list['name']); ?></option>
                            <?php endforeach; ?>
                        </select>
                    <?php else: ?>
                        <input type="text" name="vita_bella_ac_list_id_waitlist" value="<?php echo esc_attr(get_option('vita_bella_ac_list_id_waitlist')); ?>" size="10">
                        <br><small>Enter API URL and Key above, then save and reload this page to select a list.</small>
                    <?php endif; ?>
                </td></tr>
                <tr><th>reCAPTCHA Site Key</th><td><input type="text" name="vita_bella_recaptcha_site_key" value="<?php echo esc_attr(get_option('vita_bella_recaptcha_site_key')); ?>" size="40"></td></tr>
                <tr><th>reCAPTCHA Secret Key</th><td><input type="text" name="vita_bella_recaptcha_secret_key" value="<?php echo esc_attr(get_option('vita_bella_recaptcha_secret_key')); ?>" size="40"></td></tr>
                <tr><th>reCAPTCHA v3 Threshold</th><td><input type="number" step="0.01" min="0" max="1" name="vita_bella_recaptcha_threshold" value="<?php echo esc_attr(get_option('vita_bella_recaptcha_threshold', '0.5')); ?>" size="4"> <small>(Default: 0.5)</small></td></tr>
                <tr><th>Accepted States</th><td>
                    <select name="vita_bella_states_accepted[]" multiple size="10" style="width:220px;">
                        <?php foreach ($all_states as $state): ?>
                            <option value="<?php echo esc_attr($state); ?>" <?php selected(in_array($state, $states_accepted)); ?>><?php echo esc_html($state); ?></option>
                        <?php endforeach; ?>
                    </select>
                    <br><small>Hold Ctrl (Cmd on Mac) to select multiple states. All other states will be waitlisted.</small>
                </td></tr>                <tr><th>Accepted Redirect URL</th><td><input type="text" name="vita_bella_redirect_accepted" value="<?php echo esc_attr(get_option('vita_bella_redirect_accepted')); ?>" size="60"><br><small>Fallback URL for accepted states</small></td></tr>
                <tr><th>Foundation Monthly URL</th><td><input type="text" name="vita_bella_redirect_fm" value="<?php echo esc_attr(get_option('vita_bella_redirect_fm')); ?>" size="60"><br><small>For users with ?fm parameter</small></td></tr>
                <tr><th>Foundation Annual URL</th><td><input type="text" name="vita_bella_redirect_fa" value="<?php echo esc_attr(get_option('vita_bella_redirect_fa')); ?>" size="60"><br><small>For users with ?fa parameter</small></td></tr>
                <tr><th>Performance Monthly URL</th><td><input type="text" name="vita_bella_redirect_pm" value="<?php echo esc_attr(get_option('vita_bella_redirect_pm')); ?>" size="60"><br><small>For users with ?pm parameter</small></td></tr>
                <tr><th>Performance Annual URL</th><td><input type="text" name="vita_bella_redirect_pa" value="<?php echo esc_attr(get_option('vita_bella_redirect_pa')); ?>" size="60"><br><small>For users with ?pa parameter</small></td></tr>
                <tr><th>Waitlist Redirect URL</th><td><input type="text" name="vita_bella_redirect_waitlist" value="<?php echo esc_attr(get_option('vita_bella_redirect_waitlist')); ?>" size="60"></td></tr>
                <tr><th colspan="2"><details><summary><b>Accepted List Field Mapping</b></summary>
                    <?php if ($ac_fields): ?>
                        <?php foreach ($mapping_fields as $form_key => $form_label): ?>
                            <div style="margin-bottom:8px;">
                                <label><?php echo esc_html($form_label); ?>:</label>
                                <select name="vita_bella_map_accepted[<?php echo esc_attr($form_key); ?>]">
                                    <option value="">- None -</option>
                                    <?php foreach ($ac_fields as $field): ?>
                                        <option value="<?php echo esc_attr($field['id']); ?>" <?php selected((get_option('vita_bella_map_accepted')[$form_key] ?? '') == $field['id']); ?>><?php echo esc_html($field['title']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <em>Enter API URL and Key above, then save and reload this page to map fields.</em>
                    <?php endif; ?>
                </details></th></tr>
                <tr><th colspan="2"><details><summary><b>Waitlist List Field Mapping</b></summary>
                    <?php if ($ac_fields): ?>
                        <?php foreach ($mapping_fields as $form_key => $form_label): ?>
                            <div style="margin-bottom:8px;">
                                <label><?php echo esc_html($form_label); ?>:</label>
                                <select name="vita_bella_map_waitlist[<?php echo esc_attr($form_key); ?>]">
                                    <option value="">- None -</option>
                                    <?php foreach ($ac_fields as $field): ?>
                                        <option value="<?php echo esc_attr($field['id']); ?>" <?php selected((get_option('vita_bella_map_waitlist')[$form_key] ?? '') == $field['id']); ?>><?php echo esc_html($field['title']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <em>Enter API URL and Key above, then save and reload this page to map fields.</em>
                    <?php endif; ?>
                </details></th></tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// Admin page for viewing submissions
add_action('admin_menu', function() {
    add_menu_page('VB Form Submissions', 'VB Form Submissions', 'manage_options', 'vb-form-submissions', 'vb_form_submissions_page', 'dashicons-list-view', 56);
});

function vb_form_submissions_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'vb_form_submissions';
    $filter = isset($_GET['filter']) ? $_GET['filter'] : '';
    $start_date = isset($_GET['start_date']) ? $_GET['start_date'] : '';
    $end_date = isset($_GET['end_date']) ? $_GET['end_date'] : '';
    $where = [];
    if ($filter === 'accepted') {
        $where[] = 'accepted = 1';
    } elseif ($filter === 'waitlist') {
        $where[] = 'accepted = 0';
    }
    if ($start_date) {
        $where[] = $wpdb->prepare('created_at >= %s', $start_date . ' 00:00:00');
    }
    if ($end_date) {
        $where[] = $wpdb->prepare('created_at <= %s', $end_date . ' 23:59:59');
    }
    $where_sql = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

    // CSV Export
    if (isset($_GET['export_csv']) && $_GET['export_csv'] === '1') {
        $results = $wpdb->get_results("SELECT * FROM $table_name $where_sql ORDER BY created_at DESC", ARRAY_A);
        if ($results) {
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="vb_form_submissions_'.date('Ymd_His').'.csv"');
            $out = fopen('php://output', 'w');
            // CSV header
            fputcsv($out, ['Date', 'First Name', 'Last Name', 'Email', 'Phone', 'State', 'Status', 'Data']);
            foreach ($results as $row) {
                $data = maybe_unserialize($row['data']);
                fputcsv($out, [
                    $row['created_at'],
                    $row['first_name'],
                    $row['last_name'],
                    $row['email'],
                    $row['phone'],
                    $row['state'],
                    $row['accepted'] ? 'Accepted' : 'Waitlist',
                    json_encode($data)
                ]);
            }
            fclose($out);
            exit;
        }
    }

    $results = $wpdb->get_results("SELECT * FROM $table_name $where_sql ORDER BY created_at DESC LIMIT 200");
    ?>
    <div class="wrap">
        <h1>VB Form Submissions</h1>
        <form method="get" style="margin-bottom:20px; display:flex; gap:10px; align-items:end;">
            <input type="hidden" name="page" value="vb-form-submissions" />
            <label>Filter:
                <select name="filter">
                    <option value="">All</option>
                    <option value="accepted" <?php selected($filter, 'accepted'); ?>>Accepted</option>
                    <option value="waitlist" <?php selected($filter, 'waitlist'); ?>>Waitlist</option>
                </select>
            </label>
            <label>Start Date:
                <input type="date" name="start_date" value="<?php echo esc_attr($start_date); ?>" />
            </label>
            <label>End Date:
                <input type="date" name="end_date" value="<?php echo esc_attr($end_date); ?>" />
            </label>
            <button class="button">Filter</button>
            <button class="button button-primary" name="export_csv" value="1" style="margin-left:10px;">Export CSV</button>
        </form>
        <table class="widefat fixed striped">
            <thead><tr>
                <th>Date</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>State</th><th>Status</th><th>Details</th>
            </tr></thead>
            <tbody>
            <?php foreach ($results as $row): $data = maybe_unserialize($row->data); ?>
                <tr>
                    <td><?php echo esc_html($row->created_at); ?></td>
                    <td><?php echo esc_html($row->first_name); ?></td>
                    <td><?php echo esc_html($row->last_name); ?></td>
                    <td><?php echo esc_html($row->email); ?></td>
                    <td><?php echo esc_html($row->phone); ?></td>
                    <td><?php echo esc_html($row->state); ?></td>
                    <td><?php echo $row->accepted ? '<span style="color:green;">Accepted</span>' : '<span style="color:#bfa000;">Waitlist</span>'; ?></td>
                    <td><details><summary>View</summary><pre><?php echo esc_html(print_r($data, true)); ?></pre></details></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php
}
