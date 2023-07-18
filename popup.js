var bgp = chrome.extension.getBackgroundPage()

document.addEventListener('DOMContentLoaded', function () {
    var getAllbtn = document.getElementById("get_all");
    getAllbtn.addEventListener('click', startGetAll);
    var setAllbtn = document.getElementById("put_all");
    setAllbtn.addEventListener('click', startPutAll);
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
            "www2.vauto.com/Va/Inventory/", 
            "localhost:5173/documents", 
            "localhost:5173/inventory", 
            "localhost:5173/list", 
            "127.0.0.1:5173/documents", 
            "127.0.0.1:5173/inventory", 
            "127.0.0.1:5173/list", 
            "maxautolytics.com/documents", 
            "maxautolytics.com/inventory", 
            "maxautolytics.com/list", 
            "dealer-trk.netlify.app/documents",
            "dealer-trk.netlify.app/inventory",
            "dealer-trk.netlify.app/list",
        ]
        const matchingUrl = expectedUrls.some(e => {
            return url.includes(e) || true
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

chrome.storage.local.get('all_inventory', function (result) {
    console.log(result)
    if (result && result.all_inventory) {
        document.getElementById('status').innerText = 'Holding ' + result.all_inventory.length + ' vehicles'
        document.getElementById("get_all").disabled = false;
    } else {
        document.getElementById('status').innerText = 'No data'
        document.getElementById("set_btn").disabled = true;
        document.getElementById('set_btn').style.opacity = '60%'
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