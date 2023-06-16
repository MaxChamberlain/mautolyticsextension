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
            "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "_locale=en-US; _theme=Provision; _unauththeme=Provision; __utmz=144633130.1686878451.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _gid=GA1.2.825613520.1686878452; userty.core.p.7e89c8=__2VySWQiOiJkNzJjN2ZjMzhhZWE0NmM1MTJjY2QyZTY0N2NiMWRkZCIsIml2IjoiblFadm1aODZzeGV1SkZZU3ZnUEVjR0c5c0xWdUtZdDlSMHlndFN6RS1KYz0ifQ==eyJ1c; _gcl_au=1.1.1217475845.1686881151; _ga_N66F31EK71=GS1.1.1686881150.1.0.1686881156.54.0.0; CurrentEntity=q7Dc0A5vX7ho1xRo2Frzuwv-312aZpzVwIPSvryTl20=; _gat_UA-1207534-1=1; _fbp=fb.1.1686932346098.1402590108; ASP.NET_SessionId=btxjdmx0dm5024mpxehs2gmu; isCaBridgeCommonLogin=True; caPlatformUserId=d0ece32c-e0f8-4c83-8440-f3570d28366e; afterLogin=True; isCaBridgeEligible=True; isCaBridgeUser=True; caBridgeUserLoginTs=1686932352; __utma=144633130.1320108431.1686878451.1686878451.1686932354.2; __utmc=144633130; __utmt=1; _gat_UA-96118943-1=1; __utmb=144633130.2.10.1686932354; amp_41bf3c=IGDd-lyQ6YSjgdQQfElHst.blFadm1aODZzeGV1SkZZU3ZnUEVjR0c5c0xWdUtZdDlSMHlndFN6RS1KYz0=..1h32g1t26.1h32g2bqs.0.b.b; _ga=GA1.2.1320108431.1686878451; vAutoAuth=john chamberlain&2023-06-16T23:19:12.2108593-05:00&False&john chamberlain&0|T5q3IyNnk6NMpjQEy9Qd3/8D5QMP+OFXQTCgcyodc/8=; vAutoAuth2=john%20chamberlain%262023-06-16T23%3A19%3A12.2108593-05%3A00%26False%26john%20chamberlain%260|T5q3IyNnk6NMpjQEy9Qd3/8D5QMP+OFXQTCgcyodc/8=; amp_41bf3c_vauto.com=IGDd-lyQ6YSjgdQQfElHst.blFadm1aODZzeGV1SkZZU3ZnUEVjR0c5c0xWdUtZdDlSMHlndFN6RS1KYz0=..1h32g1t2a.1h32g2dk6.h.7.o; _ga_DHXN1F8KG4=GS1.1.1686932354.3.1.1686932373.0.0.0; AWSALBTG=Tqq5CijWt995+mG4BsIW61/lHYnuke49AjR0iFKTeb2fC45+OUIkEdYj6nJags92a5FqX8c5uJYWq9w98QS5AjN23uW0l0vzd0bwu9e43xIOS2erH2d/ZCVIGoMth/TGJIy5fXmL6aOId/vXN901vx6LfwLCyKwbAeA2q65+hU5xKdfSKk8=; AWSALBTGCORS=Tqq5CijWt995+mG4BsIW61/lHYnuke49AjR0iFKTeb2fC45+OUIkEdYj6nJags92a5FqX8c5uJYWq9w98QS5AjN23uW0l0vzd0bwu9e43xIOS2erH2d/ZCVIGoMth/TGJIy5fXmL6aOId/vXN901vx6LfwLCyKwbAeA2q65+hU5xKdfSKk8=; AWSALB=V55eHetI1pH03LVUPhxh1U6cVgxVFp3LPFaaGnIL799oAaQCfOHQwZ3LtPFs28++qzzIH+RONTvDfMa2ZkCxBavQnSOgwjCmZv1f5TmAp8pSailw0fL40hXxk6s9; AWSALBCORS=V55eHetI1pH03LVUPhxh1U6cVgxVFp3LPFaaGnIL799oAaQCfOHQwZ3LtPFs28++qzzIH+RONTvDfMa2ZkCxBavQnSOgwjCmZv1f5TmAp8pSailw0fL40hXxk6s9; userty.core.s.7e89c8=__SI6MTY4NjkzNDE3NjIxOSwic2lkIjoiMjRiODEyNjcxNjI2ZmU1YzI2Y2EwYjliMTNkMzExMmUiLCJzdCI6MTY4NjkzMjM1NDQwOSwicHYiOjIsInJlYWR5Ijp0cnVlLCJ3cyI6IntcIndcIjoxMjcxLFwiaFwiOjk2OX0ifQ==eyJzZ",
            "Referer": "https://www2.vauto.com/Va/Inventory/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "sorts=%5B%7B%22sort%22%3A%22DaysInInventory%22%2C%22dir%22%3A%22ASC%22%7D%5D&_pageSize=500&_sortBy=DaysInInventory%20ASC&_firstRecord=0&InventoryStatus=0&Historical=0&RetailWholesale=R&NewUsed=U&ExcludeFromCounts=0&customSettings=%5B%7B%22id%22%3A%22NADA_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22NADA_TradeIn%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KBBOnline_UCFPP%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Wholesale%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%5D&HqTranferEntityNotSame=false&QuickSearch=&SalePending=&PricingTargetSetId=&RankingBucket=&ChildEntity=&IsExactWordMatch=&gridSrcName=inventoryDetail&switchReport=",
        "method": "POST"
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
            return returnObjs
        }).then(e1 => {
            let allObjs = []
            e1.forEach((e, index) => {
                document.getElementById('progress-display-mauto-inner').innerText = 'Processing ' + (index + 1) + ' of ' + e1.length
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
                            v_msrp = splitNotes[index + 1]
                        }
                        if(note.toUpperCase() === 'MMR'){
                            v_initial_mmr = splitNotes[index + 1]
                        }
                        if(note.toUpperCase() === 'GR'){
                            if(foundCarg){
                                v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]
                            } else {
                                v_initial_carg_h = splitNotes[index + 1]
                                v_initial_carg_level = 'greatPrice'
                                v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]
                                foundCarg = true
                            }
                        }
                        if(note.toUpperCase() === 'G'){
                            if(foundCarg){
                                v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]
                            } else {
                                v_initial_carg_h = splitNotes[index + 1]
                                v_initial_carg_level = 'goodPrice'
                                v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]
                                foundCarg = true
                            }
                        }
                        if(note.toUpperCase() === 'F'){
                            if(foundCarg){
                                v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]
                            } else {
                                v_initial_carg_h = splitNotes[index + 1]
                                v_initial_carg_level = 'fairPrice'
                                v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]
                                foundCarg = true
                            }
                        }
                        if(note.toUpperCase() === 'IMV'){
                            if(foundCarg){
                                v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]
                            } else {
                                v_initial_carg_h = splitNotes[index + 1]
                                v_initial_carg_level = 'fairPrice'
                                v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]
                                foundCarg = true
                            }
                        }
                        if(note.toUpperCase() === 'H'){
                            if(foundCarg){
                                v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]
                            } else {
                                v_initial_carg_h = splitNotes[index + 1]
                                v_initial_carg_level = 'highPrice'
                                v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]
                                foundCarg = true
                            }
                        }
                        if(note.toUpperCase() === 'OP'){
                            if(foundCarg){
                                v_initialCargurusSuggestedRange[1] = splitNotes[index + 1]
                            } else {
                                v_initial_carg_h = splitNotes[index + 1]
                                v_initial_carg_level = 'overPrice'
                                v_initialCargurusSuggestedRange[0] = splitNotes[index + 1]
                                foundCarg = true
                            }
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
                }   
                allObjs.push(details)
            })
            document.getElementById('progress-display-mauto-inner').innerText = 'Finished Parsing ' + e1.length + ' Vehicles. Closing in 3'
            setTimeout(() => {
                document.getElementById('progress-display-mauto-inner').innerText = 'Finished Parsing ' + e1.length + ' Vehicles. Closing in 2'
            }, 1000)
            setTimeout(() => {
                document.getElementById('progress-display-mauto-inner').innerText = 'Finished Parsing ' + e1.length + ' Vehicles. Closing in 1'
            }, 2000)
            setTimeout(() => {
                document.getElementById('progress-display-mauto-inner').innerText = 'Finished Parsing ' + e1.length + ' Vehicles. Closing in 0'
            }, 3000)
            setTimeout(() => {
                    document.getElementById('progress-display-mauto-inner')?.remove()
                    document.getElementById('progress-display-mauto')?.remove()
            }, 4000)
            chrome.runtime.sendMessage({ type: 'gathered-all-data', data: allObjs})
        }).catch(e => console.log(e))
} catch(e) {
        document.getElementById('progress-display-mauto-inner').innerText = 'There was an error parsing the data. Please try again.'
        setTimeout(() => {
                document.getElementById('progress-display-mauto-inner')?.remove()
                document.getElementById('progress-display-mauto')?.remove()
        }, 3000)
        console.log(e)
}
