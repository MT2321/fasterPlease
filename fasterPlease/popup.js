let slower = document.getElementById('slower')
let faster = document.getElementById('faster')
let current = document.getElementById('current')
const STEP = 0.1
const FIXED = 1
let chromUpdateRate = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { playbackRate: parseFloat(current.textContent) },
      undefined
    )
  })
  chrome.storage.sync.set({
    playbackRate: parseFloat(current.textContent),
  })
}

window.onload = function () {
  chrome.storage.sync.get('playbackRate', function (data) {
    current.textContent = parseFloat(data.playbackRate).toFixed(FIXED)
  })
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  current.textContent = parseFloat(request.playbackRate).toFixed(FIXED)
  chrome.storage.sync.set({
    playbackRate: parseFloat(current.textContent),
  })
})

slower.onclick = function () {
  if (parseFloat(current.textContent) - STEP > 0.0) {
    current.textContent = String(
      (parseFloat(current.textContent) - STEP).toFixed(FIXED)
    )
    chromUpdateRate()
  }
}

faster.onclick = function () {
  current.textContent = String(
    (parseFloat(current.textContent) + STEP).toFixed(FIXED)
  )
  chromUpdateRate()
}
