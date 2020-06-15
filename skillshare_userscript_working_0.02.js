// ==UserScript==
// @name        Skillshare Keyboard Shortcuts for Video 3
// @namespace   Violentmonkey Scripts
// @match       https://www.skillshare.com/classes/*
// @grant       none
// @version     0.03
// @author      cythron
// @description 6/15/2020, 13:51:30 PM
// unsafemethod setup
// ==/UserScript==

window.addEventListener('load', function() {

	'use strict';

	var videos = document.getElementsByClassName('playback-control-container');
	var currentVideoIndex = 0;
	var currIndex = localStorage.getItem('currentVideoIndex');
	var controls = document.getElementsByTagName('video')[0];
	var btnVideoZoom = document.getElementsByClassName('playlist-close-button')[0];

	var vjs = document.getElementById('vjs_video_3');
  var captions = document.querySelectorAll('.vjs-transcript-mode')[0];
  var playbackSpeedUI = document.querySelectorAll('.vjs-play-speed')[0];
  var muteButton = document.querySelectorAll('.vjs-mute-control')[0];

	var currentTime = () => {
		return controls.currentTime;
	};

	// ignore this block
	var btnInjected = document.createElement('button');
	btnInjected.innerHTML = 'Kewl';
	btnInjected.width = 30;
	btnInjected.height = 30;

	// remember last-played video
	// ignore this for now

	/*
	if (typeof(trcurrIndex) === 'undefined')
		currentVideoIndex = 0;
	else
	{
		currentVideoIndex = currIndex;
		setCurrentVideo(currIndex);
	}
	*/

	// currently not used
	// found a better way to toggle video play
	function toggleVideoPlay() {
		if (controls.playbackRate !== 1 || controls.paused == true) {
			controls.paused = false;
			controls.playbackRate = 1;
			controls.play();
		}
		else
			controls.playbackRate = 0;
			controls.pause();
	}

	function setCurrentVideo(index) {
		console.log('Selecting', 'video', 'at index', index, '.');
		videos[index].click();
		localStorage.setItem('currentVideoIndex', currentVideoIndex);
	}

  // Need to bind with the keyboard shortcut
	function jumpToTime(time) {
	if (time !== 'undefined')
		controls.fastSeek(time);
	else
		console.log('Invalid Time!');
	}
  
  window.toggleCaptionShow = function() {
    captions.click();
  }
  
  window.youtubeLikeSeek = function() {
    return;
  }

	window.seekForward30 = function() {
		jumpToTime(currentTime() + 30);
	}

	window.seekBackward30 = function() {
		jumpToTime(currentTime() - 30);
	}

	window.changePlaybackSpeed = function(op){
		if (op == 1)
      controls.playbackRate += 0.5;
    else
      controls.playbackRate -= 0.5;
    
    // update UI
    playbackSpeedUI.textContent=controls.playbackRate + 'x';
	}

	window.seekForward10 = function () {
		jumpToTime(currentTime() + 10);
	}

	window.seekBackward10 = function() {
		jumpToTime(currentTime() - 10);
	}
  
  window.changeVolume = function(op) {
    if (op == 1)
      controls.volume += 0.1;
    else if (op == -1)
      controls.volume -= 0.1;
    else if (op == 0) {
      muteButton.click();
      console.log('Flipped Muted Value!')
    }
    else
      console.log('Invalid Volume Level')
  }

	function setup() {
		controls.addEventListener('keydown', (e) => {
		  if (e.key === " ") {
			if (!controls.paused)
				controls.pause();
			else
				controls.play();
		}
		  if (e.key == "ArrowRight")
			seekForward10();
		  if (e.key == "ArrowLeft")
			seekBackward10();
		  if (e.key == ">")
			seekForward30();
		  if (e.key == "<")
			seekBackward30();
		  if (e.key == "ArrowLeft")
			seekBackward10();
      if (e.key == "ArrowUp")
			changeVolume(1);
      if (e.key == "ArrowDown")
			changeVolume(-1);
      if (e.key == "+")
			changeVolume(1);
      if (e.key == "-")
			changeVolume(-1);
      if (e.key == "m")
			changeVolume(0);
      if (e.key == "c")
			toggleCaptionShow();
		});
	}

setup();
	//#var controls = document.getElementsByClassName('controlsOverlay');

});
