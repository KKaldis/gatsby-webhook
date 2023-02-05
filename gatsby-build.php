<?php
/*
Plugin Name: Simple HTTP Post
Description: Sends a POST request to a specified URL with the text entered in the text field
*/

// Create custom database table for plugin
function simple_http_post_create_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'simple_http_post';
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      url text NOT NULL,
      text text NOT NULL,
      last_sent datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
      UNIQUE KEY id (id)
    ) $charset_collate;";
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}
register_activation_hook( __FILE__, 'simple_http_post_create_table' );

function simple_http_post_menu() {
    add_menu_page('Simple HTTP Post', 'Simple HTTP Post', 'manage_options', 'simple-http-post', 'simple_http_post_options');
}
add_action('admin_menu', 'simple_http_post_menu');

function simple_http_post_options() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'simple_http_post';
    if (isset($_POST['submit'])) {
        $url = $_POST['url'];
        $text = $_POST['text'];
        $response = wp_remote_post($url, array(
            'method' => 'POST',
            'timeout' => 45,
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking' => true,
            'headers' => array(),
            'body' => array('text' => $text),
            'cookies' => array()
        ));
        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
            echo '<div id="message" class="error"><p>' . $error_message . '</p></div>';
        } else {
            echo '<div id="message" class="updated"><p>POST request sent successfully</p></div>';
            $wpdb->query($wpdb->prepare("UPDATE $table_name SET last_sent=%s WHERE url=%s AND text=%s", current_time('mysql'), $url, $text));
        }
    }
    if (isset($_POST['save'])) {
        $url = $_POST['url'];
        $text = $_POST['text'];
        $wpdb->query($wpdb->prepare("INSERT INTO $table_name (url, text) VALUES (%s, %s)", $url, $text));
    }
    ?>
    <div class="wrap">
        <h1>Simple HTTP Post</h1>
        <form method="post">
            <table class="form-table">
                <tbody>
                <tr>
                    <th scope="row">
                        <label for="url">URL</label>
                    </th>
                    <td>
                        <input type="text" name="url" id="url" class="regular-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="text">Text</label>
                    </th>
                    <td>
                        <input type="text" name="text" id="text" class="regular-text">
                    </td>
                </tr>
                </tbody>
            </table>
            <p class="submit">
                <input type="submit" name="submit" id="submit" class="button button-primary" value="Send POST Request">
            </p>
        </form>
    </div>
    <?php
}