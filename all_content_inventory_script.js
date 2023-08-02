document.body.appendChild(document.createElement('div')).setAttribute('id', 'progress-display-mauto')
document.getElementById('progress-display-mauto').style.position = 'fixed'
document.getElementById('progress-display-mauto').style.top = '0'
document.getElementById('progress-display-mauto').style.left = '0'
document.getElementById('progress-display-mauto').style.width = '100%'
document.getElementById('progress-display-mauto').style.height = '100%'
document.getElementById('progress-display-mauto').style.background = 'rgba(0,0,0,0.5)'
document.getElementById('progress-display-mauto').style.zIndex = '9999'
document.getElementById('progress-display-mauto').style.display = 'flex'
document.getElementById('progress-display-mauto').style.justifyContent = 'center'
document.getElementById('progress-display-mauto').style.alignItems = 'center'
document.getElementById('progress-display-mauto').appendChild(document.createElement('div')).setAttribute('id', 'progress-display-mauto-inner')
document.getElementById('progress-display-mauto-inner').style.padding = '1rem'
document.getElementById('progress-display-mauto-inner').style.background = 'white'
document.getElementById('progress-display-mauto-inner').style.borderRadius = '1rem'
document.getElementById('progress-display-mauto-inner').style.fontWeight = 'bold'
document.getElementById('progress-display-mauto-inner').innerText = 'Getting Data...'

try{
    console.log('starting script')
    fetch("https://www2.vauto.com/Va/Inventory/InventoryData.ashx", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "save-data": "on",
        "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
      },
      "referrer": "https://www2.vauto.com/Va/Inventory/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "_pageSize=100&_sortBy=DaysInInventory%20ASC&sorts=&_firstRecord=0&InventoryStatus=0&Historical=0&RetailWholesale=R&NewUsed=U&ExcludeFromCounts=0&customSettings=%5B%7B%22id%22%3A%22NADA_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22NADA_TradeIn%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KBBOnline_UCFPP%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Wholesale%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%5D&HqTranferEntityNotSame=false&QuickSearch=&SalePending=&PricingTargetSetId=&RankingBucket=&ChildEntity=&gridSrcName=inventoryDetail&switchReport=",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(e => e.text()).then(e => {
            document.getElementById('progress-display-mauto-inner').innerText = 'Got Data. Parsing...'
            let obj = e.replace(/\\n/g, '')
            obj = obj.replace(/new Date\((\d+)\)/g, '$1')
            obj = obj.replace(/\\\\\",\\\"/g, "\",\"")
            obj = obj.replace(/\\\",\"/g, "\",\"")
            console.log(obj)
            obj = JSON.parse(obj)
            console.log(obj)
            let returnObjs = []
            let keys = []
            obj.columns.forEach((column, index) => {
                keys[index] = column
            })
            obj.rows.forEach((row, index) => {
                let obj = {}
                row.forEach((column, index) => {
                    obj[keys[index]] = column
                })
                returnObjs[index] = obj
            })
          console.log(returnObjs)
            return returnObjs
        }).catch(e => console.log(e))
} catch(e) {
        document.getElementById('progress-display-mauto-inner').innerText = 'There was an error parsing the data. Please try again.'
        setTimeout(() => {
                document.getElementById('progress-display-mauto-inner')?.remove()
                document.getElementById('progress-display-mauto')?.remove()
        }, 3000)
        console.log(e)
}
