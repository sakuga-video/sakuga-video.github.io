const video = document.querySelector('video');
const videoContainer = document.querySelector('#videocontainer');
const fullscreenButton = document.querySelector('#fullscreen');
const playpauseButton = document.querySelector('#playpause');
const nextButton = document.querySelector('#next');
const controls = document.querySelector('#controls');

async function getRandomVideo() {
    const url = '/api/post.json?limit=1&page=' + Math.floor(Math.random() * 15390) + '&tags=fighting';
    const response = await fetch(url);
    const data = await response.json();
    return data[0].file_url;
}
function playNext() {
    getRandomVideo().then(src => {
        video.src = src;
        video.play();
    });
}

video.addEventListener('ended', playNext);
var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
if (!fullScreenEnabled) {
    fullscreenButton.style.display = 'none';
}
var isFullScreen = function() {
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}
var setFullscreenData = function(state) {
    videoContainer.setAttribute('data-fullscreen', !!state);
}
var handleFullscreen = function() {
    if (isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        setFullscreenData(false);
    }
    else {
        if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
        else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
        else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
        else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
        setFullscreenData(true);
    }
}
document.addEventListener('fullscreenchange', (e) =>
    setFullscreenData(!!(document.fullScreen || document.fullscreenElement))
);
document.addEventListener('webkitfullscreenchange', () =>
    setFullscreenData(!!document.webkitIsFullScreen)
);
document.addEventListener('mozfullscreenchange', () =>
    setFullscreenData(!!document.mozFullScreen)
);
document.addEventListener('msfullscreenchange', () =>
    setFullscreenData(!!document.msFullscreenElement)
);
fullscreenButton.addEventListener('click', handleFullscreen);
playpauseButton.addEventListener('click', e => {
    if (video.paused || video.ended) video.play();
    else video.pause();
});
nextButton.addEventListener('click', playNext);
videoContainer.addEventListener('mouseout', () => {
    controls.classList.add('fade-out')
    console.log("test fade out");
});

videoContainer.addEventListener('mouseover', () => {
    controls.classList.remove('fade-out');
    console.log("come back");
});
getRandomVideo().then(src => {
    video.src = src;
    video.play();
})