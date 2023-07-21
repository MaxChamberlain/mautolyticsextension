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
    <div style='background-color: hsl(220, 100%, 60%); padding: 10px; width: fit-content; color: white; cursor: pointer;' id='mauto_send_btn'>
      Send update to Max Autolytics (Sales from the last 7 days)
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
      fetch('https://www2.vauto.com/Va/Inventory/InventoryData.ashx?QuickSearch=&gridSrcName=inventoryDetail&IsExactWordMatch=false&HistoricalDaySpan=7&_pageSize=800', {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://www2.vauto.com/Va/Inventory/Inventory.aspx",
        "referrerPolicy": "strict-origin-when-cross-origin",
        ":path": "/Va/Inventory/InventoryData.ashx",
        ":scheme": "https",
        ":authority": "www2.vauto.com",
        "method": "POST",
      }).then(e => e.text()).then(e => {
        let obj = e.replace(/\\n/g, ' ')
        obj = obj.replace(/new Date\((\d+)\)/g, '$1')
        obj = obj.replace(/\\\\\",\\\"/g, "\",\"")
        obj = obj.replace(/\\\",\"/g, "\",\"")
        obj = obj.replace(/\+/g, ' ')
        obj = obj.replace(/\\\ /g, ' ')
        obj = JSON.parse(obj)
        console.log(obj)
        if(obj.rows.length === 0){
            if(document.querySelectorAll('#new-borderEl-select-framework') && document.querySelectorAll('#new-borderEl-select-framework').length > 0){
                document.querySelectorAll('#new-borderEl-select-framework').forEach((element) => {
                    element.remove();
                });
            }
            document.getElementById('new-borderEl-select-framework-title').innerText = 'Max Autolytics : There was an error. Do you have the "Left Inventory" filter selected?'
            document.getElementById('new-borderEl-select-framework-title').style.backgroundColor = 'hsl(0, 100%, 60%)'
        }
        let columns = obj.columns
        let rows = []
        obj.rows.forEach((row, index) => {
            let newRow = {}
            row.forEach((cell, index) => {
                newRow[columns[index]] = cell
            })
            rows.push(newRow)
        })
        console.log(rows)
        return rows
    }).then(list => {
        document.getElementById('mauto_send_btn').innerText = 'Parsing data...'
        let sales = []
        list.forEach((e, i) => {
          document.getElementById('mauto_send_btn').innerText = 'Fetching data... (' + i + '/' + list.length + ')'
          let notes = ''
          if(e['AppraisalCommmentRec'] != undefined){
              try{
                  notes = e['AppraisalCommmentRec'] ? JSON.parse(e['AppraisalCommmentRec'])[0]?.comment : undefined
              } catch(e){
                  try{
                      notes = e['AppraisalCommmentRec'].replace('[{"comment":"', '').replace('"}]', '')
                  } catch(e){
                      console.log(e)
                  }
              }
          }
          let v_initial_carg_h = ''
          let v_initial_carg_level = ''
          let v_initial_mmr = ''
          let v_msrp = ''
          let splitNotes = notes?.split(' ')?.map(e => e)
          let v_initialCargurusSuggestedRange = [0,0]
          let v_imv = ''
          if(splitNotes){
              let foundCarg = false
              splitNotes.forEach((note, index) => {
                  if(note.toUpperCase() === 'MSRP'){
                      v_msrp = splitNotes[index + 1]?.replace(/\D/g, '')
                  }
                  if(note.toUpperCase() === 'MMR'){
                      v_initial_mmr = splitNotes[index + 1]
                  }
                  if(note.toUpperCase() === 'GR' || note.toUpperCase() === 'GREAT'){
                      if(foundCarg){
                          v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/\D/g, '')
                      } else {
                        v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/\D/g, '')
                        foundCarg = true
                      }
                      v_initial_carg_h = splitNotes[index + 1]
                      v_initial_carg_level = 'greatPrice'
                  }
                  if(note.toUpperCase() === 'G' || note.toUpperCase() === 'GOOD'){
                      if(foundCarg){
                          v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/\D/g, '')
                      } else {
                        v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/\D/g, '')
                        foundCarg = true
                      }
                      v_initial_carg_h = splitNotes[index + 1]?.replace(/\D/g, '')
                      v_initial_carg_level = 'goodPrice'
                  }
                  if(note.toUpperCase() === 'F' || note.toUpperCase() === 'FAIR'){
                      if(foundCarg){
                          v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/\D/g, '')
                      } else {
                        v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/\D/g, '')
                        foundCarg = true
                      }
                      v_initial_carg_h = splitNotes[index + 1]?.replace(/\D/g, '')
                      v_initial_carg_level = 'fairPrice'
                  }
                  if(note.toUpperCase() === 'IMV'){
                      if(foundCarg){
                          v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/\D/g, '')
                      } else {
                        v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/\D/g, '')
                        foundCarg = true
                      }
                      v_initial_carg_h = splitNotes[index + 1]?.replace(/\D/g, '')
                      v_initial_carg_level = 'fairPrice'
                    }
                  if(note.toUpperCase() === 'H' || note.toUpperCase() === 'HIGH'){
                      if(foundCarg){
                          v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/\D/g, '')
                      } else {
                        v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/\D/g, '')
                        foundCarg = true
                      }
                      v_initial_carg_h = splitNotes[index + 1]?.replace(/\D/g, '')
                      v_initial_carg_level = 'highPrice'
                  }
                  if(note.toUpperCase() === 'OP' || note.toUpperCase() === 'OVERPRICED'){
                      if(foundCarg){
                          v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]?.replace(/\D/g, '')
                      } else {
                        v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]?.replace(/\D/g, '')
                        foundCarg = true
                      }
                      v_initial_carg_h = splitNotes[index + 1]?.replace(/\D/g, '')
                      v_initial_carg_level = 'overPrice'
                  }
                  if(note.toUpperCase() === 'IMV'){
                      v_imv = splitNotes[index + 1]
                  }
              })
          }
          if(parseInt(v_initialCargurusSuggestedRange[0]) > parseInt(v_initialCargurusSuggestedRange[1])){
              let temp = v_initialCargurusSuggestedRange[0]
              v_initialCargurusSuggestedRange[0] = v_initialCargurusSuggestedRange[1]
              v_initialCargurusSuggestedRange[1] = temp
          }
          let details = {
              company_logical_id: e['DealerLogicalId'],
              vAutoId: e['Id'],
              v_stock_no: e['StockNumber'],
              v_miles: e['Odometer'],
              v_vehicle: e['VehicleTitle']?.toUpperCase(),
              v_vin_no: e['Vin'],
              v_source: e['VehicleSource'],
              v_zip: e['AppraisedPostalCode'],
              v_is_certified: e['IsCertified'] === 1 ? true : false,
              v_notes: notes,
              v_days: e['DaysInInventory'],
              v_final_acv: e['TotalCost'],
              v_acv: e['AppraisedValue'],
              v_final_mmr: e['Manheim_Wholesale'],
              v_start_price: e['InitialPendingPrice'],
              v_sell_price: e['ListPrice'],
              v_market_percent: e['EffectivePercentOfMarket'] ? Math.round(e['EffectivePercentOfMarket'] * 100) : undefined,
              v_initial_carg_h,
              v_initial_carg_level,
              v_initial_mmr,
              v_msrp,
              v_imv,
              type: 'sale',
              v_initialCargurusSuggestedRange,
              created_at: new Date(e['DeletedDate']).toLocaleDateString('en-US'),
          }   
          sales.push(details)
        })
        document.getElementById('mauto_send_btn').innerText = 'Sending data...'
        sales.forEach(sale => {
          fetch('http://localhost:9000/webhook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: 'sales',
              data: sale
            })
          })
        })
        document.getElementById('mauto_send_btn').innerText = 'Done!'
        setTimeout(() => {
          document.getElementById('mauto_send_btn').innerText = 'Send update to Max Autolytics (Sales from the last 7 days)'
          document.getElementById('mauto_send_btn').addEventListener('click', getAllSales)
          document.getElementById('mauto_send_btn').style.cursor = 'pointer'
          document.getElementById('mauto_send_btn').style.backgroundColor = 'hsl(220, 100%, 60%)'
        }
        , 3000)
    })
  }