var bgp = chrome.extension.getBackgroundPage()

document.addEventListener('DOMContentLoaded', function () {
    var btadd = document.getElementById("get_btn");
    btadd.addEventListener('click', startScraper);
    var btnput = document.getElementById("set_btn");
    btnput.addEventListener('click', putData);

    var settingsbutton = document.getElementById("settings-trigger");
    settingsbutton.addEventListener('click', function(){
        document.getElementById('setting-container').style.display = 'block'
        chrome.storage.local.get('MaxAutolyticsBaseUrl', function (result) {
          console.log('res', result)
          if (result && result.MaxAutolyticsBaseUrl) {
            document.getElementById('server_url').value = result.MaxAutolyticsBaseUrl
            document.getElementById('inventory_webhook').value = result.MaxAutolyticsInventoryWebhook
          }
        })
    });

    document.querySelector('.has-data')?.addEventListener('click', () => {
        // clear local storage
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
        document.getElementById('status').innerText = 'No data'
        document.getElementById("set_btn").disabled = true;
        document.getElementById('set_btn').style.opacity = '60%'
        document.getElementById('status-box').classList.remove('has-data')
    })
})

chrome.storage.local.get('metrics', function (result) {
    if (result && result.metrics) {
        document.getElementById('status').innerText = result.metrics.type?.toUpperCase() + ': ' + result.metrics.v_vehicle + ' (' + result.metrics.v_stock_no + ')'
        document.getElementById("set_btn").disabled = false;
        document.getElementById('status-box').classList.add('has-data')
    } else {
        document.getElementById('status').innerText = 'No data'
        document.getElementById("set_btn").disabled = true;
        document.getElementById('set_btn').style.opacity = '60%'
    }
})

chrome.storage.local.get('store', function (result) {
  if(result && result.store) {
    document.getElementById('company-display').innerText = result.store
  }
})


function startGetAll(e) {
    chrome.runtime.sendMessage({ type: 'get-all' })
    e.target.innerText = 'Getting Data...'
    e.target.removeEventListener('click', startGetAll)
}

function startPutAll(e) {
    chrome.runtime.sendMessage({ type: 'put-all' })
    e.target.innerText = 'Putting Data...'
    e.target.removeEventListener('click', startPutAll)
}

function startScraper(e) {
    chrome.runtime.sendMessage({ type: 'grab' })
    e.target.innerText = 'Cancel Getting Data'
    e.target.removeEventListener('click', startScraper)
    e.target.addEventListener('click', cancelScraper)
}

function cancelScraper(e) {
    chrome.runtime.sendMessage({ type: 'cancel-scrape' })
    e.target.innerText = 'Grab SALE Details'
    e.target.removeEventListener('click', cancelScraper)
    e.target.addEventListener('click', startScraper)
}

function startInvScraper(e) {
    chrome.runtime.sendMessage({ type: 'grab-inventory' })
    e.target.innerText = 'Cancel Getting Data'
    e.target.removeEventListener('click', startScraper)
    e.target.addEventListener('click', cancelInvScraper)
}

function cancelInvScraper(e) {
    chrome.runtime.sendMessage({ type: 'cancel-scrape' })
    e.target.innerText = 'Grab INVENTORY Details'
    e.target.removeEventListener('click', cancelScraper)
    e.target.addEventListener('click', startScraper)
}

function putData(e) {
    console.log('putting data')
    chrome.runtime.sendMessage({ type: 'put-data' })
    setTimeout(() => window.close(), 100)
}