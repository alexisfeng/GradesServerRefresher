'use strict';

var refresh_time = 0;
var refresh_status = false;

// Load time buttons
var time_buttons = document.querySelectorAll('input.time_button');
// Load stop button
var stop_button = document.getElementById('stop_button');

// Time button clicked
function time_button_handler(ev) {
  refresh_time = parseInt(ev.target.dataset.seconds, 10);
  refresh_status = true;

  countdown(refresh_time);
}

// Stop button clicked
function stop_button_handler() {
  chrome.runtime.sendMessage({message: "stop"});
  refresh_status = false;
}

// Sends message to background.js
function countdown(t) {
  chrome.runtime.sendMessage({message: "countdown", status: refresh_status, time: t});
}

// Wait for DOM content to load before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
  // Stop button
  stop_button.addEventListener('click', stop_button_handler);
  // Time buttons
  for (var i = 0; i < time_buttons.length; i++) {
    time_buttons[i].addEventListener('click', time_button_handler);
  }
});