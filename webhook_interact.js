if(document.querySelector('.max_auto_provisioner_container')) document.querySelector('.max_auto_provisioner_container').remove()
if(document.querySelector('#max_auto_provisioner_style_head')) document.querySelector('#max_auto_provisioner_style_head').remove()
  let style = document.createElement('style')
  style.id = 'max_auto_provisioner_style_head'
  style.innerHTML = `
    .max_auto_provisioner_container {
      height: fit-content;
      background: #ccc;
      width: 100vw;
    }
  `
  document.head.appendChild(style)
  let container = document.createElement('div')
  container.classList.add('max_auto_provisioner_container')
  container.innerHTML = `
    <div style='background-color: #aaa; box-shadow: 0 0 5px 2px rgba(0,0,0,0.2); padding: 10px; width: fit-content; color: white; cursor: pointer;' id='mauto_send_btn'>
      Send Inventory Snapshot to Max Autolytics
    </div>
  `
  document.getElementById('header2').style.marginTop = '70px'
  document.body.insertAdjacentElement('afterbegin', container)

  document.getElementById('mauto_send_btn').addEventListener('click', getAllSales)

async function getAllSales(){
  document.getElementById('mauto_send_btn').removeEventListener('click', getAllSales)
  document.getElementById('mauto_send_btn').innerText = 'Fetching data...'
  document.getElementById('mauto_send_btn').style.cursor = 'default'
  document.getElementById('mauto_send_btn').style.backgroundColor = 'hsl(220, 50%, 40%)'
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
    "body": "_pageSize=1000&_sortBy=DaysInInventory%20ASC&sorts=&_firstRecord=0&InventoryStatus=0&Historical=0&RetailWholesale=R&NewUsed=U&ExcludeFromCounts=0&customSettings=%5B%7B%22id%22%3A%22NADA_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22NADA_TradeIn%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KBBOnline_UCFPP%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Wholesale%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%5D&HqTranferEntityNotSame=false&QuickSearch=&SalePending=&PricingTargetSetId=&RankingBucket=&ChildEntity=&gridSrcName=inventoryDetail&switchReport=",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then(e => e.text()).then(e => {
    let obj = e.replace(/\\n/g, '')
    obj = obj.replace(/new Date\((\d+)\)/g, '$1')
    obj = obj.replace(/\\\\\",\\\"/g, "\",\"")
    obj = obj.replace(/\\\",\"/g, "\",\"")
    obj = obj.replace(/\\([a-zA-Z0-9])/g, '$1')
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
    return returnObjs
  }).then(e => {
    fetch('http://localhost:9000/inventory/receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(e)
    })
  }).catch(e => console.log(e)).finally(e => {
    document.getElementById('mauto_send_btn').addEventListener('click', getAllSales)
    document.getElementById('mauto_send_btn').innerText = 'Done!'
    document.getElementById('mauto_send_btn').style.cursor = 'pointer'
    document.getElementById('mauto_send_btn').style.backgroundColor = '#aaa'
    setTimeout(() => {
      document.getElementById('mauto_send_btn').innerText = 'Send Inventory Snapshot to Max Autolytics'
    }, 5000)
  })
}