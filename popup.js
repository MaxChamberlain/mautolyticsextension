var bgp = chrome.extension.getBackgroundPage()

document.addEventListener('DOMContentLoaded', function () {
    var btadd = document.getElementById("get_btn");
    btadd.addEventListener('click', startScraper);
    var btinv = document.getElementById("inv_btn");
    btinv.addEventListener('click', startInvScraper);
    var btnput = document.getElementById("set_btn");
    btnput.addEventListener('click', putData);

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        url = url.split('?')[0]
        let expectedUrls = [
            "https://www2.vauto.com/Va/Inventory/", 
            "http://localhost:5173/documents", 
            "http://localhost:5173/inventory", 
            "http://127.0.0.1:5173/documents", 
            "http://127.0.0.1:5173/inventory", 
            "https://maxautolytics.com/documents", 
            "https://maxautolytics.com/inventory", 
            "https://dealer-trk.netlify.app/documents",
            "https://dealer-trk.netlify.app/inventory"
        ]
        const matchingUrl = expectedUrls.some(e => {
            console.log(e, url, url.includes(e))
            return url.includes(e)
        })
        if (!matchingUrl) {
            document.getElementById('status_title').innerText = 'Wrong page'
            document.getElementById("get_btn").disabled = true;
            document.getElementById('get_btn').style.opacity = '60%'
            document.getElementById("inv_btn").disabled = true;
            document.getElementById('inv_btn').style.opacity = '60%'
            document.getElementById("set_btn").disabled = true;
            document.getElementById('set_btn').style.opacity = '60%'
            document.getElementById('status').innerText = "Make sure you're in either the VAuto Inventory page\nor the Max Autolytics \"list\" or \"inventory\" page"
        }
    });
})

chrome.storage.local.get('metrics', function (result) {
    if (result && result.metrics) {
        document.getElementById('status').innerText = result.metrics.type?.toUpperCase() + ': ' + result.metrics.v_vehicle + ' (' + result.metrics.v_stock_no + ')'
        document.getElementById("set_btn").disabled = false;
    } else {
        document.getElementById('status').innerText = 'No data'
        document.getElementById("set_btn").disabled = true;
        document.getElementById('set_btn').style.opacity = '60%'
    }
})

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