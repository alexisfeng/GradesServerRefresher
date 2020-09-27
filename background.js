'use strict';
var interval, tabId, url;
//var word = "Pending", count = 0;

// Refreshes page
function reload() {
  chrome.tabs.executeScript(tabId, {code: 'window.location.reload(true);'});
}

// Receives message from popup.js
chrome.runtime.onMessage.addListener(function(request) {
  tabId = chrome.tabs.getSelected(null, function(tab) {
    tabId = tab.id;
  })
  
  if (request.message === "stop") {
    // Clear badge text and interval
    chrome.browserAction.setBadgeText({text: ''});
    clearInterval(interval);
  }
  else if (request.message === "countdown") {
    clearInterval(interval);
    var t = request.time;

    // Update every second
    interval = setInterval(function() {
      if (request.status === true) {
        // Set badge text
        chrome.browserAction.setBadgeText({text: '' + t});
        // Decrement time
        t--;

        // Reload if time hits zero
        if (t < 0) {
          reload();
          t = request.time;
        }
      }
      else {
        // Clear badge text and interval
        chrome.browserAction.setBadgeText({text: ''});
        clearInterval(interval);
      }
    }, 1000);
  }  
});


/** In case I can ever get fetching all of the html to work... */
/*
chrome.tabs.onUpdated.addListener(function (tId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    fetch(url).then(function (response) {
      return response.text();
    }).then(function (html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var curr, pageHtml = doc.body.innerHTML;

      console.log(pageHtml);

      while (curr = pageHtml.pop()) {
        if (curr.textContent.match(word)) {
          count++;
        }
      }

      chrome.browserAction.setBadgeText({text: ''+count});
    }).catch(function (e) {
      console.warn('Something went wrong.', e);
    });
  }
})
*/