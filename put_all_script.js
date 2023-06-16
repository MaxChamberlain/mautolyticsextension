chrome.storage.local.get('all_inventory', (data) => {
    if(data){
        document.getElementById('invisible-all-data-input').innerText = JSON.stringify(data.all_inventory)
        document.getElementById('invisible-all-data-input').dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        }))
    } else {
        console.log('No data')
    }
})