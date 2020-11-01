//Receives an update from popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(request.playbackRate)
  let video = document.querySelector('video')
  video.playbackRate = request.playbackRate
  // console.log(request.playbackRate)
})

