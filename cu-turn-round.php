<?php
/*
Plugin Name: turn-round
Plugin URI: http://www.cookui.com
Description: A plugin of 3D View Simulation Base on Realistic Image
Version: 1.0
Author: cookui
Author URI: http://www.cookui.com
*/

function cu_add_media() {
	wp_enqueue_script('cu-add-media', plugins_url('js/cu-add-media.js', __FILE__), array('jquery'), '1.0', true);
}
add_action('admin_enqueue_scripts', 'cu_add_media');

function cu_add_turnround() {
	wp_enqueue_script('cu-turnround', plugins_url('js/cu-turn-round.js', __FILE__), array('jquery'), '1.0', true);
	wp_enqueue_script('cu-default', plugins_url('js/cu-onload-defaults.js', __FILE__), array('cu-turnround'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'cu_add_turnround');

add_action('media_buttons', 'add_my_media_button');

function add_my_media_button() {
    echo '<a href="#" id="insert-my-media" class="button">Add a 3D image</a>';
}

function cu_add_editor_style(){
    add_editor_style( plugins_url('css/editor.css', __FILE__) );
}
add_action( 'admin_init', 'cu_add_editor_style' );

if(!function_exists('allow_data_event_content')){
      function allow_data_event_content() {
          global $allowedposttags, $allowedtags;
          $attrdatacuw = "data-cuturnroundow";
          $attrdatacuh = "data-cuturnroundoh";
          $allowedposttags["img"][$attrdatacuw][$attrdatacuh] = true;
          $allowedtags["img"][$attrdatacuw][$attrdatacuh] = true;
          }
  }
add_action( 'init', 'allow_data_event_content' );

?>