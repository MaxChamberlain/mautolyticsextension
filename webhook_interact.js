insertElements()

function insertElements(){
//   try{
//     observer.disconnect()
//   } catch(e){
//     console.log(e)
//   }
//   let observer = new MutationObserver((mutations) => {
//     if(mutations.length > 0){
//       Array.from(document.getElementById('ext-gen25').children).forEach((e, i) => {
//         if(e.querySelector('.max_auto_provisioner_container')) e.querySelector('.max_auto_provisioner_container').remove()
//         let newElement = document.createElement('div')
//         newElement.classList.add('max_auto_provisioner_container')
//         newElement.style.backgroundColor = i % 2 === 0 ? '#ffffff' : '#F2F6FC'
//         let imgSrc = 'https://user-uploads-thumbs.shutterstock.com/aws-cloudfront-user-asset-uploads-prod-us-east-1/uploads/d610351e-a31f-4034-97b9-9a76362629dd/p/5956fb3efc0e623e77a7e0d539730250de53b6af/1691424425656/autolytics_logo_small-e2f16fee/png/1691424428/1500x1500/fit/6caa07c8c23786b9de2859e3191c5dc45adbeae6/autolytics_logo_small-e2f16fee.jpg'
//         newElement.innerHTML = `
//           <div style='display: flex; gap: 0.25rem; padding: 0.5rem;'>
//             <img src='${imgSrc}' style='height: 30px; width: 30px; border-radius: 50%;' class='hover-hover'>
//             <div id='get-btn' style='padding: 0.5rem; cursor: pointer; color: black; border: 1px solid black; border-radius: 0.5rem; ${!document.getElementById('filterDescription').innerText.toUpperCase().includes('LEFT INVENTORY') && 'opacity: 0.5; pointer-events: none; cursor: default;'}'>
//               ${document.getElementById('filterDescription').innerText.toUpperCase().includes('LEFT INVENTORY') ? 'Grab Sale Details' : 'Not a sale'}
//             </div>
//           </div>
//         `
//         // newElement.addEventListener('click', () => {
//         //   createOptionsMenu(newElement)
//         // })
//         e.insertAdjacentElement('beforeend', newElement)
//       e.querySelector('#get-btn').addEventListener('click', getSaleDetail)
//     })
//     }
// //   })
  
//   observer.observe(document.getElementById('ext-gen25'), { childList: true })
  
//   Array.from(document.getElementById('ext-gen25').children).forEach((e, i) => {
//     if(e.querySelector('.max_auto_provisioner_container')) e.querySelector('.max_auto_provisioner_container').remove()
//     let newElement = document.createElement('div')
//     newElement.classList.add('max_auto_provisioner_container')
//     newElement.style.backgroundColor = i % 2 === 0 ? '#ffffff' : '#F2F6FC'
//     let imgSrc = 'https://user-uploads-thumbs.shutterstock.com/aws-cloudfront-user-asset-uploads-prod-us-east-1/uploads/d610351e-a31f-4034-97b9-9a76362629dd/p/5956fb3efc0e623e77a7e0d539730250de53b6af/1691424425656/autolytics_logo_small-e2f16fee/png/1691424428/1500x1500/fit/6caa07c8c23786b9de2859e3191c5dc45adbeae6/autolytics_logo_small-e2f16fee.jpg'
//     newElement.innerHTML = `
//       <div style='display: flex; gap: 0.25rem; padding: 0.5rem;'>
//         <img src='${imgSrc}' style='height: 30px; width: 30px; border-radius: 50%;' class='hover-hover'>
//         <div id='get-btn' style='padding: 0.5rem; cursor: pointer; color: black; border: 1px solid black; border-radius: 0.5rem; ${!document.getElementById('filterDescription').innerText.toUpperCase().includes('LEFT INVENTORY') && 'opacity: 0.5; pointer-events: none; cursor: default;'}'>
//           ${document.getElementById('filterDescription').innerText.toUpperCase().includes('LEFT INVENTORY') ? 'Grab Sale Details' : 'Not a sale'}
//         </div>
//       </div>
//     `
//     // newElement.addEventListener('click', () => {
//     //   createOptionsMenu(newElement)
//     // })
//     e.insertAdjacentElement('beforeend', newElement)
//     e.querySelector('#get-btn').addEventListener('click', getSaleDetail)
//   })
  
  
  if(document.querySelector('.max_auto_provisioner_container')) document.querySelector('.max_auto_provisioner_container').remove()
  if(document.querySelector('#max_auto_provisioner_style_head')) document.querySelector('#max_auto_provisioner_style_head').remove()
    let style = document.createElement('style')
    style.classList.add('max_auto_provisioner_options_container')
    style.innerHTML = `
      .max_auto_provisioner_container {
        height: fit-content;
        background: #ccc;
        width: 100vw;
      }
      .max_auto_provisioner_options_container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100px;
        padding: 16px;
      }
  
      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fade-out {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
  
      .enter {
        animation: fade-in 0.5s ease-in-out;
      }
      .exit {
        animation: fade-out 0.5s ease-in-out;
      }
      .hover-hover:hover:first-child {
        box-shadow: 0 0 5px 2px rgba(0,0,0,0.2);
      }
      .hover-hover:first-child {
        transition: box-shadow 0.5s ease-in-out;
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
}

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
    "body": "_pageSize=1000&_sortBy=DaysInInventory%20ASC&sorts=&_firstRecord=0&InventoryStatus=0&Historical=0&RetailWholesale=R&NewUsed=U&ExcludeFromCounts=0&customSettings=%5B%7B id %3A NADA_Retail %2C value %3A 0 %2C condition %3A Clean %2C conditionLabel %3A Clean %2C type %3A priceguide %7D%2C%7B id %3A NADA_TradeIn %2C value %3A 0 %2C condition %3A Clean %2C conditionLabel %3A Clean %2C type %3A priceguide %7D%2C%7B id %3A KBBOnline_UCFPP %2C value %3A 0 %2C condition %3A Excellent %2C conditionLabel %3A Excellent %2C type %3A priceguide %7D%2C%7B id %3A KelleyBlueBook_Wholesale %2C value %3A 0 %2C condition %3A Excellent %2C conditionLabel %3A Excellent %2C type %3A priceguide %7D%2C%7B id %3A KelleyBlueBook_Retail %2C value %3A 0 %2C condition %3A Excellent %2C conditionLabel %3A Excellent %2C type %3A priceguide %7D%5D&HqTranferEntityNotSame=false&QuickSearch=&SalePending=&PricingTargetSetId=&RankingBucket=&ChildEntity=&gridSrcName=inventoryDetail&switchReport=",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then(e => e.text()).then(e => {
    const keyFinderRegEX = /([{,]\s*)(\S+)\s*(:)/mg;
    let obj = e//.replace(keyFinderRegEX, '$1"$2"$3')
    // let obj = e.replace(/\\n/g, '')
    obj = obj.replace(/new Date\((\d+)\)/g, '$1')
    // obj = obj.replace(/\\\\\",\\\"/g, "\",\"")
    // obj = obj.replace(/\\\",\"/g, "\",\"")
    // obj = obj.replace(/\\([a-zA-Z0-9\s])/g, ' $1')
    // obj = obj.replace('+\\', '')
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
        let source = obj['VehicleSource']
        if(obj.InventoryTags){
          if(obj.InventoryTags.includes('source-')){
            if(obj.InventoryTags.split(',')[0].split('source-').length > 1){
                source = obj.InventoryTags.split(',')[0].split('source-')[1].replace('-', ' ').toUpperCase()
            }
          }
        }
        obj['VehicleSource'] = source
        returnObjs[index] = obj
        if(obj['VehicleSource'] !== source || !source) console.log(obj['VehicleSource'], source, obj['Vin'])
    })
    return returnObjs
  }).then(e => {
    fetch('https://beta-max-autolytics-42e7b1f0061c.herokuapp.com/inventory/receive', {
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

// function createOptionsMenu (anchor) {
//   let backdrop = document.createElement('div')
//   backdrop.style.position = 'fixed'
//   backdrop.style.top = '0'
//   backdrop.style.left = '0'
//   backdrop.style.right = '0'
//   backdrop.style.bottom = '0'
//   backdrop.style.zIndex = '500'
//   backdrop.id = 'menu_mauto_lytics'
//   backdrop.addEventListener('click', () => {
//     document.getElementById('menu_mauto_lytics').remove()
//     document.getElementById('max_auto_provisioner_options_container').classList.remove('enter')
//     document.getElementById('max_auto_provisioner_options_container').classList.add('exit')
//     setTimeout(() => {
//       document.getElementById('max_auto_provisioner_options_container').remove()
//     }, 500)
//   })
//   anchor.parentElement.insertAdjacentElement('beforeend', backdrop)

//   let top = anchor.getBoundingClientRect().top
//   let left = anchor.getBoundingClientRect().left

//   let element = document.createElement('div')
//   element.style.backgroundColor = 'white'
//   element.style.borderRadius = '1rem'
//   element.style.padding = '0.5rem'
//   element.style.boxShadow = '0 0 5px 2px rgba(0,0,0,0.2)'
//   element.style.position = 'fixed'
//   element.style.top = `${top}px`
//   element.style.left = `${left}px`
//   element.style.zIndex = '9995'
//   element.id = 'max_auto_provisioner_options_container'
//   element.classList.add('enter')

//     let get_sale_btn = document.createElement('div')
//     get_sale_btn.id = 'get_sale'
//     get_sale_btn.innerText = 'Grab Sale Details'
//     get_sale_btn.style.padding = '0.5rem'
//     get_sale_btn.style.cursor = 'pointer'
//     if(!document.getElementById('filterDescription').innerText.toUpperCase().includes('LEFT INVENTORY')) {
//       get_sale_btn.innerText = 'Not a sale'
//       get_sale_btn.style.opacity = 0.5
//       get_sale_btn.style.pointerEvents = 'none'
//       get_sale_btn.style.cursor = 'default'
//     } else {
//       get_sale_btn.addEventListener('click', getSaleDetail)
//     }

//   element.appendChild(get_sale_btn)
  
//   anchor.appendChild(element)
// }

// function getSaleDetail(btn){

//   let tableEl = document.querySelectorAll('.x-grid3')
//   if(tableEl.length) {
//       tableEl = tableEl[0]
//       let titleEl = document.createElement('div')
//       titleEl.innerText = 'Max Autolytics : Loading'
//       titleEl.style.fontSize = '1.25em'
//       titleEl.style.color = 'white'
//       titleEl.style.fontWeight = '600'
//       titleEl.style.backgroundColor = 'hsl(220, 100%, 60%)'
//       titleEl.style.padding = '1em'
//       titleEl.style.marginBottom = '5px'
//       titleEl.style.textAlign = 'center'
//       titleEl.id = 'new-borderEl-select-framework-title'
//       tableEl.insertBefore(titleEl, tableEl.firstChild)
//   }
  
//   btn.stopPropagation();
//   btn.target.removeEventListener('click', e => e)
//   btn.target.style.backgroundColor = '#ccc'
//   btn.target.style.border = '1px dashed #999'
//   btn.target.style.cursor = 'default'
//   btn.target.style.pointerEvents = 'none'
//   btn.target.style.opacity = '0.7'
//   const data = btn.target.parentElement.parentElement.parentElement.children[0];
  
//   // this is the elements INSIDE the <tr> element
//   let children = data.children[0].children[0].children;
  
//   children = Array.from(children);
//   children = children.map((child) => {
//       let subChildren = child.children[0].children
//       subChildren = Array.from(subChildren)
//       return subChildren.map((subChild) => subChild)

//   }).flat()

//   Array.from(children).filter(e => e?.className.includes('ColumnField')).forEach((child, index) => {
//       let newChildren = Array.from(child?.children)
//       if(newChildren.length) {
//           try{
//               let subChildren = newChildren[0]?.children[0]?.children
//               Array.from(subChildren).forEach(subChild => {
//                   if(subChild.children.length > 1){
//                       try{
//                           let label = subChild.children[0]?.innerText
//                           let value = subChild.children[1]?.innerText
//                           if(label === 'VIN:'){
//                               fetch('https://www2.vauto.com/Va/Inventory/InventoryData.ashx?QuickSearch=' + value + "&gridSrcName=inventoryDetail&IsExactWordMatch=false&HistoricalDaySpan=60", {
//                                   "headers": {
//                                       "accept": "application/json, text/javascript, */*; q=0.01",
//                                       "accept-language": "en-US,en;q=0.9",
//                                       "content-type": "application/json; charset=UTF-8",
//                                       "sec-fetch-dest": "empty",
//                                       "sec-fetch-mode": "cors",
//                                       "sec-fetch-site": "same-origin"
//                                   },
//                                   "referrer": "https://www2.vauto.com/Va/Inventory/Inventory.aspx",
//                                   "referrerPolicy": "strict-origin-when-cross-origin",
//                                   ":path": "/Va/Inventory/InventoryData.ashx",
//                                   ":scheme": "https",
//                                   ":authority": "www2.vauto.com",
//                                   "method": "POST",
//                               }).then(e => e.text()).then(e => {
//                                   let obj = e.replace(/\\n/g, ' ')
//                                   obj = obj.replace(/new Date\((\d+)\)/g, '$1')
//                                   obj = obj.replace(/\\\\\",\\\"/g, "\",\"")
//                                   obj = obj.replace(/\\\",\"/g, "\",\"")
//                                   obj = obj.replace(/\+/g, ' ')
//                                   obj = obj.replace(/\\\ /g, ' ')
//                                   console.log(obj)
//                                   obj = JSON.parse(obj)
//                                   if(obj.rows.length === 0){
//                                       if(document.querySelectorAll('#new-borderEl-select-framework') && document.querySelectorAll('#new-borderEl-select-framework').length > 0){
//                                           document.querySelectorAll('#new-borderEl-select-framework').forEach((element) => {
//                                               element.remove();
//                                           });
//                                       }
//                                       document.getElementById('new-borderEl-select-framework-title').innerText = 'Max Autolytics : There was an error. Do you have the "Left Inventory" filter selected?'
//                                       document.getElementById('new-borderEl-select-framework-title').style.backgroundColor = 'hsl(0, 100%, 60%)'
//                                   }
//                                   let returnObj = {}
//                                   console.log(obj.rows)
//                                   obj.columns.forEach((column, index) => {
//                                       returnObj[column] = obj.rows[0][index]
//                                   })
//                                   return returnObj
//                               }).then(e => {
//                                   document.getElementById('new-borderEl-select-framework-title').innerText = 'Max Autolytics : ' + e['VehicleTitle']
//                                   // document.getElementById('menu_mauto_lytics').remove()
//                                   // document.getElementById('max_auto_provisioner_options_container').classList.remove('enter')
//                                   // document.getElementById('max_auto_provisioner_options_container').classList.add('exit')
//                                   // setTimeout(() => {
//                                   //   document.getElementById('max_auto_provisioner_options_container').remove()
//                                   // }, 500)
//                                   let notes = ''
//                                   if(e['AppraisalCommmentRec'] != undefined){
//                                       try{
//                                           notes = e['AppraisalCommmentRec'] ? JSON.parse(e['AppraisalCommmentRec'])[0]?.comment : undefined
//                                       } catch(e){
//                                           try{
//                                               notes = e['AppraisalCommmentRec'].replace('[{"comment":"', '').replace('"}]', '')
//                                           } catch(e){
//                                               console.log(e)
//                                           }
//                                       }
//                                   }
//                                   let v_initial_carg_h = ''
//                                   let v_initial_carg_level = ''
//                                   let v_initial_mmr = ''
//                                   let v_msrp = ''
//                                   let splitNotes = notes?.split(' ')?.map(e => e)
//                                   let v_initialCargurusSuggestedRange = [0,0]
//                                   let v_imv = ''
//                                   if(splitNotes){
//                                       let foundCarg = false
//                                       splitNotes.forEach((note, index) => {
//                                           if(note.toUpperCase() === 'MSRP'){
//                                               v_msrp = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                           }
//                                           if(note.toUpperCase() === 'MMR'){
//                                               v_initial_mmr = splitNotes[index + 1]
//                                           }
//                                           if(note.toUpperCase() === 'GR' || note.toUpperCase() === 'GREAT'){
//                                               if(foundCarg){
//                                                   v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               } else {
//                                                 v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                                 foundCarg = true
//                                               }
//                                               v_initial_carg_h = splitNotes[index + 1]
//                                               v_initial_carg_level = 'greatPrice'
//                                           }
//                                           if(note.toUpperCase() === 'G' || note.toUpperCase() === 'GOOD'){
//                                               if(foundCarg){
//                                                   v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               } else {
//                                                 v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                                 foundCarg = true
//                                               }
//                                               v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               v_initial_carg_level = 'goodPrice'
//                                           }
//                                           if(note.toUpperCase() === 'F' || note.toUpperCase() === 'FAIR'){
//                                               if(foundCarg){
//                                                   v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               } else {
//                                                 v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                                 foundCarg = true
//                                               }
//                                               v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               v_initial_carg_level = 'fairPrice'
//                                           }
//                                           if(note.toUpperCase() === 'IMV'){
//                                               if(foundCarg){
//                                                   v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               } else {
//                                                 v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                                 foundCarg = true
//                                               }
//                                               v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               v_initial_carg_level = 'fairPrice'
//                                             }
//                                           if(note.toUpperCase() === 'H' || note.toUpperCase() === 'HIGH'){
//                                               if(foundCarg){
//                                                   v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               } else {
//                                                 v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                                 foundCarg = true
//                                               }
//                                               v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               v_initial_carg_level = 'highPrice'
//                                           }
//                                           if(note.toUpperCase() === 'OP' || note.toUpperCase() === 'OVERPRICED'){
//                                               if(foundCarg){
//                                                   v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               } else {
//                                                 v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                                 foundCarg = true
//                                               }
//                                               v_initial_carg_h = splitNotes[index + 1]?.replace(/[^\d-]/g, '')
//                                               v_initial_carg_level = 'overPrice'
//                                           }
//                                           if(note.toUpperCase() === 'IMV'){
//                                               v_imv = splitNotes[index + 1]
//                                           }
//                                       })
//                                   }
//                                   if(parseInt(v_initialCargurusSuggestedRange[0]) > parseInt(v_initialCargurusSuggestedRange[1])){
//                                       let temp = v_initialCargurusSuggestedRange[0]
//                                       v_initialCargurusSuggestedRange[0] = v_initialCargurusSuggestedRange[1]
//                                       v_initialCargurusSuggestedRange[1] = temp
//                                   }
//                                   let details = {
//                                       vAutoId: e['Id'],
//                                       v_stock_no: e['StockNumber'],
//                                       v_miles: e['Odometer'],
//                                       v_vehicle: e['VehicleTitle']?.toUpperCase(),
//                                       v_vin_no: e['Vin'],
//                                       v_source: e['VehicleSource'],
//                                       v_zip: e['AppraisedPostalCode'],
//                                       v_is_certified: e['IsCertified'] === 1 ? true : false,
//                                       v_notes: notes,
//                                       v_days: e['DaysInInventory'],
//                                       v_final_acv: e['TotalCost'],
//                                       v_acv: e['AppraisedValue'],
//                                       v_final_mmr: e['Manheim_Wholesale'],
//                                       v_start_price: e['InitialPendingPrice'],
//                                       v_sell_price: e['ListPrice'],
//                                       v_market_percent: e['EffectivePercentOfMarket'] ? Math.round(e['EffectivePercentOfMarket'] * 100) : undefined,
//                                       v_initial_carg_h,
//                                       v_initial_carg_level,
//                                       v_initial_mmr,
//                                       v_msrp,
//                                       v_imv,
//                                       type: 'sale',
//                                       v_initialCargurusSuggestedRange,
//                                   }   
//                                   console.log(details)
//                                   chrome.runtime.sendMessage({ type: 'gathered-metrics-data', data: details})
//                                   btn.target.addEventListener('click', getSaleDetail)
//                                   btn.target.style.backgroundColor = 'transparent'
//                                   btn.target.style.border = '1px solid #000'
//                                   btn.target.style.cursor = 'pointer'
//                                   btn.target.style.pointerEvents = 'all'
//                                   btn.target.style.opacity = '1'
//                               })
//                           }
//                       } catch(e) {
//                           console.log(e)
//                           if(document.querySelectorAll('#new-borderEl-select-framework') && document.querySelectorAll('#new-borderEl-select-framework').length > 0){
//                               document.querySelectorAll('#new-borderEl-select-framework').forEach((element) => {
//                                   element.remove();
//                               });
//                           }
//                           document.getElementById('new-borderEl-select-framework-title').innerText = 'Max Autolytics : There was an error. Do you have the "Left Inventory" filter selected?'
//                           btn.target.addEventListener('click', getSaleDetail)
//                           btn.target.style.backgroundColor = 'transparent'
//                           btn.target.style.border = '1px solid #000'
//                           btn.target.style.cursor = 'pointer'
//                           btn.target.style.pointerEvents = 'all'
//                           btn.target.style.opacity = '1'
//                       }
//                   }
//               })
//           }catch(e){
//               console.log(e)
//           }
//       }
//   })
// }