// chrome.runtime.sendMessage({type: 'gathered-metrics-data', data: "test"})

if (document.getElementById("new-borderEl-select-framework-title")) {
  document.getElementById("new-borderEl-select-framework-title").remove();
}
if (
  document.querySelectorAll(".x-grid3-row-table") &&
  document.querySelectorAll(".x-grid3-row-table").length > 0
) {
  var css = `
        #new-borderEl-select-framework{
            border: 1px dashed hsl(220, 100%, 60%);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }
        #new-borderEl-select-framework:hover{
            border: 3px solid hsl(220, 100%, 40%);
            background-color: hsla(220, 100%, 40%, 0.2);
        }
        #new-borderEl-select-framework:hover::before{
            content: 'Select';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            font-weight: 600;
            color: hsl(220, 100%, 40%);
        }
    `;
  try {
    let style3 = document.createElement("style");

    if (style3.styleSheet) {
      style3.styleSheet.cssText = css;
    } else {
      style3.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName("head")[0].appendChild(style3);
  } catch (e) {
    console.log(e);
  }

  let tableEl = document.querySelectorAll(".x-grid3");
  if (tableEl.length) {
    tableEl = tableEl[0];
    let titleEl = document.createElement("div");
    titleEl.innerText = "Max Autolytics : Select a Vehicle";
    titleEl.style.fontSize = "1.25em";
    titleEl.style.color = "white";
    titleEl.style.fontWeight = "600";
    titleEl.style.backgroundColor = "hsl(220, 100%, 60%)";
    titleEl.style.padding = "1em";
    titleEl.style.marginBottom = "5px";
    titleEl.style.textAlign = "center";
    titleEl.id = "new-borderEl-select-framework-title";
    tableEl.insertBefore(titleEl, tableEl.firstChild);
  }

  document.querySelectorAll(".x-grid3-row-table").forEach((element, index) => {
    let borderEl = document.createElement("div");
    borderEl.id = "new-borderEl-select-framework";
    borderEl.addEventListener("click", (e) => {
      e.stopPropagation();
      e.target.removeEventListener("click", (e) => e);
      e.target.style.backgroundColor = "#ccc";
      e.target.style.border = "1px dashed #999";
      e.target.style.cursor = "default";
      e.target.style.pointerEvents = "none";
      e.target.style.opacity = "0.7";
      document.getElementById("new-borderEl-select-framework-title").innerText =
        "Max Autolytics : Loading...";
      const data = e.target.parentElement;
      console.log(data);

      // this is the elements INSIDE the <tr> element
      let children = data.children[0].children[0].children;

      children = Array.from(children);
      children = children
        .map((child) => {
          let subChildren = child.children[0].children;
          subChildren = Array.from(subChildren);
          return subChildren.map((subChild) => subChild);
        })
        .flat();

      Array.from(children)
        .filter((e) => e?.className.includes("ColumnField"))
        .forEach((child, index) => {
          let newChildren = Array.from(child?.children);
          if (newChildren.length) {
            try {
              let subChildren = newChildren[0]?.children[0]?.children;
              Array.from(subChildren).forEach((subChild) => {
                if (subChild.children.length > 1) {
                  try {
                    let label = subChild.children[0]?.innerText;
                    let value = subChild.children[1]?.innerText;
                    if (label === "VIN:") {
                      let url =
                        "https://www2.vauto.com/Va/Inventory/InventoryData.ashx?QuickSearch=" +
                        value +
                        "&gridSrcName=inventoryDetail&IsExactWordMatch=false";
                      if (document.getElementById("filterDescription")) {
                        if (
                          document
                            .getElementById("filterDescription")
                            .innerText.toLowerCase()
                            .includes("left inventory")
                        ) {
                          url += "&HistoricalDaySpan=90";
                        }
                      }
                      fetch(
                        "https://provision.vauto.app.coxautoinc.com/Va/Inventory/InventoryData.ashx",
                        {
                          headers: {
                            accept: "*/*",
                            "accept-language": "en-US,en;q=0.9",
                            "content-type":
                              "application/x-www-form-urlencoded; charset=UTF-8",
                            newrelic:
                              "eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjE4OTM0NTQiLCJhcCI6IjM3Mjc3NDQwNiIsImlkIjoiNDA0MmY0YjI0ODQwNWQ3YyIsInRyIjoiY2M4NzI4OTY1Mzg3OGIyZTQ2OTY4NzQ1YzBjNGM4MDMiLCJ0aSI6MTcxMDUyMDAxNjU2MSwidGsiOiIxMTkwODkzIn19",
                            "sec-ch-ua":
                              '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": '"macOS"',
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            traceparent:
                              "00-cc87289653878b2e46968745c0c4c803-4042f4b248405d7c-01",
                            tracestate:
                              "1190893@nr=0-1-1893454-372774406-4042f4b248405d7c----1710520016561",
                            "x-newrelic-id": "VQ4OUlJWDBADUlhUAgIPVFE=",
                            "x-requested-with": "XMLHttpRequest",
                          },
                          referrer:
                            "https://provision.vauto.app.coxautoinc.com/Va/Inventory/Default.aspx?uq=1",
                          referrerPolicy: "strict-origin-when-cross-origin",
                          body:
                            "sorts=%5B%7B%22sort%22%3A%22DaysInInventory%22%2C%22dir%22%3A%22ASC%22%7D%5D&_pageSize=100&_sortBy=DaysInInventory%20ASC&_firstRecord=0&InventoryStatus=0&Historical=0&RetailWholesale=R&NewUsed=U&ExcludeFromCounts=0&customSettings=%5B%7B%22id%22%3A%22NADA_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22NADA_TradeIn%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Clean%22%2C%22conditionLabel%22%3A%22Clean%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KBBOnline_UCFPP%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Wholesale%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%2C%7B%22id%22%3A%22KelleyBlueBook_Retail%22%2C%22value%22%3A%220%22%2C%22condition%22%3A%22Excellent%22%2C%22conditionLabel%22%3A%22Excellent%22%2C%22type%22%3A%22priceguide%22%7D%5D&HqTranferEntityNotSame=false&SalePending=&RankingBucket=&CustomDiscount=&ChildEntity=&QuickSearch=" +
                            value +
                            "&IsExactWordMatch=false&gridSrcName=inventoryDetail&switchReport=",
                          method: "POST",
                          mode: "cors",
                          credentials: "include",
                        }
                      )
                        .then((e) => e.text())
                        .then((e) => {
                          console.log(e);
                          let obj = e.replace(/\\n/g, " ");
                          obj = obj.replace(/new Date\((\d+)\)/g, "$1");
                          obj = obj.replace(/\\\\\",\\\"/g, '","');
                          obj = obj.replace(/\\\",\"/g, '","');
                          obj = obj.replace(/\+/g, " ");
                          obj = obj.replace(/\\\ /g, " ");
                          obj = JSON.parse(obj);
                          if (obj.rows.length === 0) {
                            if (
                              document.querySelectorAll(
                                "#new-borderEl-select-framework"
                              ) &&
                              document.querySelectorAll(
                                "#new-borderEl-select-framework"
                              ).length > 0
                            ) {
                              document
                                .querySelectorAll(
                                  "#new-borderEl-select-framework"
                                )
                                .forEach((element) => {
                                  element.remove();
                                });
                            }
                            document.getElementById(
                              "new-borderEl-select-framework-title"
                            ).innerText =
                              'Max Autolytics : There was an error. Do you have the "Left Inventory" filter selected?';
                            document.getElementById(
                              "new-borderEl-select-framework-title"
                            ).style.backgroundColor = "hsl(0, 100%, 60%)";
                          }
                          let returnObj = {};
                          console.log(obj.rows);
                          obj.columns.forEach((column, index) => {
                            returnObj[column] = obj.rows[0][index];
                          });
                          returnObj.AppraisalCommmentRec = JSON.parse(
                            returnObj.AppraisalCommmentRec
                          );
                          console.log(returnObj);
                          return returnObj;
                        })
                        .then((e) => {
                          document.getElementById(
                            "new-borderEl-select-framework-title"
                          ).innerText = "Max Autolytics : " + e["VehicleTitle"];
                          let notes =
                            e["AppraisalCommmentRec"]?.[0]?.comment ?? "";
                          let v_initial_carg_h = "";
                          let v_initial_carg_level = "";
                          let v_initial_mmr = "";
                          let v_msrp = "";
                          let splitNotes = notes?.split(" ")?.map((e) => e);
                          let v_initialCargurusSuggestedRange = [0, 0];
                          let v_imv = "";
                          if (splitNotes) {
                            let foundCarg = false;
                            splitNotes.forEach((note, index) => {
                              if (note.toUpperCase() === "MSRP") {
                                v_msrp = splitNotes[index + 1]?.replace(
                                  /[^\d-]/g,
                                  ""
                                );
                              }
                              if (note.toUpperCase() === "MMR") {
                                v_initial_mmr = splitNotes[index + 1];
                              }
                              if (
                                note.toUpperCase() === "GR" ||
                                note.toUpperCase() === "GREAT"
                              ) {
                                if (foundCarg) {
                                  v_initialCargurusSuggestedRange[1] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                } else {
                                  v_initialCargurusSuggestedRange[0] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                  foundCarg = true;
                                }
                                v_initial_carg_h = splitNotes[index + 1];
                                v_initial_carg_level = "greatPrice";
                              }
                              if (
                                note.toUpperCase() === "G" ||
                                note.toUpperCase() === "GOOD"
                              ) {
                                if (foundCarg) {
                                  v_initialCargurusSuggestedRange[1] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                } else {
                                  v_initialCargurusSuggestedRange[0] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                  foundCarg = true;
                                }
                                v_initial_carg_h = splitNotes[
                                  index + 1
                                ]?.replace(/[^\d-]/g, "");
                                v_initial_carg_level = "goodPrice";
                              }
                              if (
                                note.toUpperCase() === "F" ||
                                note.toUpperCase() === "FAIR"
                              ) {
                                if (foundCarg) {
                                  v_initialCargurusSuggestedRange[1] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                } else {
                                  v_initialCargurusSuggestedRange[0] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                  foundCarg = true;
                                }
                                v_initial_carg_h = splitNotes[
                                  index + 1
                                ]?.replace(/[^\d-]/g, "");
                                v_initial_carg_level = "fairPrice";
                              }
                              if (note.toUpperCase() === "IMV") {
                                if (foundCarg) {
                                  v_initialCargurusSuggestedRange[1] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                } else {
                                  v_initialCargurusSuggestedRange[0] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                  foundCarg = true;
                                }
                                v_initial_carg_h = splitNotes[
                                  index + 1
                                ]?.replace(/[^\d-]/g, "");
                                v_initial_carg_level = "fairPrice";
                              }
                              if (
                                note.toUpperCase() === "H" ||
                                note.toUpperCase() === "HIGH"
                              ) {
                                if (foundCarg) {
                                  v_initialCargurusSuggestedRange[1] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                } else {
                                  v_initialCargurusSuggestedRange[0] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                  foundCarg = true;
                                }
                                v_initial_carg_h = splitNotes[
                                  index + 1
                                ]?.replace(/[^\d-]/g, "");
                                v_initial_carg_level = "highPrice";
                              }
                              if (
                                note.toUpperCase() === "OP" ||
                                note.toUpperCase() === "OVERPRICED"
                              ) {
                                if (foundCarg) {
                                  v_initialCargurusSuggestedRange[1] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                } else {
                                  v_initialCargurusSuggestedRange[0] =
                                    splitNotes[index + 1]?.replace(
                                      /[^\d-]/g,
                                      ""
                                    );
                                  foundCarg = true;
                                }
                                v_initial_carg_h = splitNotes[
                                  index + 1
                                ]?.replace(/[^\d-]/g, "");
                                v_initial_carg_level = "overPrice";
                              }
                              if (note.toUpperCase() === "IMV") {
                                v_imv = splitNotes[index + 1];
                              }
                            });
                          }
                          if (
                            parseInt(v_initialCargurusSuggestedRange[0]) >
                            parseInt(v_initialCargurusSuggestedRange[1])
                          ) {
                            let temp = v_initialCargurusSuggestedRange[0];
                            v_initialCargurusSuggestedRange[0] =
                              v_initialCargurusSuggestedRange[1];
                            v_initialCargurusSuggestedRange[1] = temp;
                          }
                          let source = e["VehicleSource"];
                          if (e.InventoryTags) {
                            if (e.InventoryTags.includes("source-")) {
                              source = e.InventoryTags.split(",")[0]
                                .split("source-")[1]
                                .replace("-", " ")
                                .toUpperCase();
                            }
                          }
                          let details = {
                            vAutoId: e["Id"],
                            v_stock_no: e["StockNumber"],
                            v_miles: e["Odometer"],
                            v_vehicle: e["VehicleTitle"]?.toUpperCase(),
                            v_vin_no: e["Vin"],
                            v_source: source,
                            v_zip: e["AppraisedPostalCode"],
                            v_is_certified:
                              e["IsCertified"] === 1 ? true : false,
                            v_notes: notes,
                            v_days: e["DaysInInventory"],
                            v_final_acv: e["TotalCost"],
                            v_acv: e["AppraisedValue"],
                            v_final_mmr: e["Manheim_Wholesale"],
                            v_start_price: e["InitialPendingPrice"],
                            v_sell_price: e["ListPrice"],
                            v_market_percent: e["EffectivePercentOfMarket"]
                              ? Math.round(e["EffectivePercentOfMarket"] * 100)
                              : undefined,
                            v_initial_carg_h,
                            v_initial_carg_level,
                            v_initial_mmr,
                            v_msrp,
                            v_imv,
                            type: "sale",
                            v_initialCargurusSuggestedRange,
                            v_make: e["Make"],
                            v_model: e["Model"],
                            v_year: e["ModelYear"],
                            v_trim: e["Series"],
                            logical_id: e["DealerLogicalId"],
                          };
                          console.log(details);
                          chrome.runtime.sendMessage({
                            type: "gathered-metrics-data",
                            data: details,
                          });
                        })
                        .catch(console.log);
                    }
                  } catch (e) {
                    console.log(e);
                    if (
                      document.querySelectorAll(
                        "#new-borderEl-select-framework"
                      ) &&
                      document.querySelectorAll(
                        "#new-borderEl-select-framework"
                      ).length > 0
                    ) {
                      document
                        .querySelectorAll("#new-borderEl-select-framework")
                        .forEach((element) => {
                          element.remove();
                        });
                    }
                    document.getElementById(
                      "new-borderEl-select-framework-title"
                    ).innerText =
                      'Max Autolytics : There was an error. Do you have the "Left Inventory" filter selected?';
                  }
                }
              });
            } catch (e) {
              console.log(e);
            }
          }
        });
    });

    let row = element;
    row.style.position = "relative";
    row.appendChild(borderEl);
  });
}
