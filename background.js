chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.clear()
    chrome.storage.local.set({ MaxAutolyticsBaseUrl: 'https://beta-max-autolytics-42e7b1f0061c.herokuapp.com' , MaxAutolyticsInventoryWebhookUrl: '/webhook/inventory' }, function() {})
})

// listen for messages from the content script
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log(request, sender, sendResponse);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0].id;
        if(request.type === 'get-all') {
            chrome.scripting.executeScript({
                target: {tabId: currentTab},
                files: ['all_content_script.js']
            });
        }
        if(request.type === 'grab') {
            chrome.scripting.executeScript({
                target: {tabId: currentTab},
                files: ['content_script.js']
            });
        }
        if(request.type === 'grab-inventory'){
            chrome.scripting.executeScript({
                target: {tabId: currentTab},
                files: ['content_intentory_script.js']
            });
        }
        if(request.type === 'gathered-metrics-data') {
            chrome.storage.local.set({wasWritten: true}, function() {
            });
            chrome.scripting.executeScript({
                target: {tabId: currentTab},
                files: ['undo_content_script.js']
            });
            chrome.storage.local.set({metrics: request.data}, function() {
              console.log('Metrics data saved');
            });
        }
        if(request.type === 'gathered-all-data') {
            chrome.storage.local.set({wasWritten: true}, function() {
            });
            chrome.storage.local.set({all_inventory: request.data}, function() {
                console.log('all data saved');
            });
        }
        if(request.type === 'cancel-scrape') {
            chrome.scripting.executeScript({
                target: {tabId: currentTab},
                files: ['undo_content_script.js']
            });
        }
        if(request.type === 'put-data'){
            console.log('putting data')
            chrome.storage.local.get('metrics', (data) => {
                if(data){
                    console.log(data.metrics)
                    chrome.scripting.executeScript({
                        target: {tabId: currentTab},
                        files: ['put_data_script.js']
                    });
                } else {
                    console.log('No data')
                }
            })
        }
        if(request.type === 'put-all'){
            console.log('putting data')
            chrome.storage.local.get('all_inventory', (data) => {
                if(data){
                    console.log(data.all_inventory)
                    chrome.scripting.executeScript({
                        target: {tabId: currentTab},
                        files: ['put_all_script.js']
                    });
                } else {
                    console.log('No data')
                }
            })
        }
        if(request.type === 'store-name'){
          chrome.storage.local.set({store: request.data}, function() {
            console.log('store saved');
          });
        }
        if(request.type === 'get-image-url') {
          chrome.runtime.sendMessage({ type: 'receive-logo-image', data: chrome.runtime.getURL('logo.png') })
      }
    });
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  //get current url
  chrome.tabs.get(activeInfo.tabId, function(tab){
      var url = tab.url;
      if (!url.includes('vauto.com')) {
        chrome.storage.local.remove('store', function() {})
      }
      if(url.includes('vauto.com') || url.includes('maxautolytics.com')) {
        chrome.scripting.executeScript({
            target: {tabId: activeInfo.tabId},
            files: ['undo_content_script.js', 'webhook_interact.js']
        });
      }
  })
})

chrome.tabs.onUpdated.addListener(function(activeInfo) {
  //get current url
  chrome.tabs.get(activeInfo.tabId, function(tab){
      var url = tab.url;
      if (!url.includes('vauto.com')) {
        chrome.storage.local.remove('store', function() {})
      }
      if(url.includes('vauto.com') || url.includes('maxautolytics.com')) {
        chrome.scripting.executeScript({
            target: {tabId: activeInfo.tabId},
            files: ['undo_content_script.js', 'webhook_interact.js']
        });
      }
  })
})