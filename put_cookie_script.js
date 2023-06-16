chrome.storage.local.get('vauto-cookie', (data) => {
    if(data){
        document.getElementById('invisible-cookie-input').innerText = JSON.stringify(data)
        document.getElementById('invisible-cookie-input').dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        }))
    } else {
        console.log('No data')
    }
})