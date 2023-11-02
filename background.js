chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: 'copyCookie',
    title: 'Copy SessionId Cookie',
    contexts: ['page'],
  })
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info && info.menuItemId === 'copyCookie') {
    chrome.cookies.get({ url: 'https://cookbook.foodtruck-qa.com/', name: 'SessionId' }, function (cookie) {
      if (cookie) {
        chrome.cookies.set({ url: 'https://test.foodtruck-qa.com:6443/', name: 'SessionId', value: cookie.value }, function () {
          console.log('Cookie copied successfully!')
        })
      } else {
        console.log('Cookie not found.')
      }
    })
  }
})
