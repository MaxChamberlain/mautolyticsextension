chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.clear()
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
    });
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.scripting.executeScript({
        target: {tabId: activeInfo.tabId},
        files: ['undo_content_script.js']
    });
})