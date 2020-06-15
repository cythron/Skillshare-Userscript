// ==UserScript==
// @name        Skillshare Keyboard Shortcuts for Video 
// @namespace   Violentmonkey Scripts
// @match       https://www.skillshare.com/classes/*
// @grant       none
// @version     0.02
// @author      cythron
// @description 6/15/2020, 13:15:27 PM
// unsafemethod setup
// ==/UserScript==

/* Currently available features:
1. Seek using arrow keys
2. Play/Pause using spacebar

Todo
1. Youtube-like num key seek (1-> 10%, 5->50%)
2. Toggle CC
3. Volume Controls
4. Special Shortcuts (Ctrl+G -> Go to specific time)
*/

window.addEventListener('load', function() {

	'use strict';

	var videos = document.getElementsByClassName('playback-control-container');
	var currentVideoIndex = 0;
	var currIndex = localStorage.getItem('currentVideoIndex');
	var controls = document.getElementsByTagName('video')[0];
	var btnVideoZoom = document.getElementsByClassName('playlist-close-button')[0];

	var vjs = document.getElementById('vjs_video_3');

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

	function jumpToTime(time) {
	if (time !== 'undefined')
		controls.fastSeek(time);
	else
		console.log('Invalid Time!');
	}

	window.seekForward30 = function {
		jumpToTime(currentTime() + 30);
	}

	window.seekBackward30 = function {
		jumpToTime(currentTime() - 30);
	}

	window.changePlaybackSpeed = function {
		
	}

	window.seekForward10 = function () {
		jumpToTime(currentTime() + 10);
	}

	window.seekBackward10 = function() {
		jumpToTime(currentTime() - 10);
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
			seekForward30();
		  if (e.key == "ArrowLeft")
			seekBackward10();
		});
	}

setup();
	//#var controls = document.getElementsByClassName('controlsOverlay');

});
