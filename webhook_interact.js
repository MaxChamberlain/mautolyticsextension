insertElements();

function insertElements() {
  console.log("inserting elements");
  if (document.querySelector(".max_auto_provisioner_container"))
    document.querySelector(".max_auto_provisioner_container").remove();
  if (document.querySelector("#max_auto_provisioner_style_head"))
    document.querySelector("#max_auto_provisioner_style_head").remove();
  let style = document.createElement("style");
  style.classList.add("max_auto_provisioner_options_container");
  style.innerHTML = `
      .max_auto_provisioner_container {
        height: fit-content;
        background: transparent;
        width: 100%;
      }
      .max_auto_provisioner_options_container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100px;
        background: transparent;
        padding: 16px;
        width: 100%;
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

      .mauto_send_btn {
        background-color: #3377FF !important; 
        color: #fff;
        font-weight: semibold;
        background: white;
        padding: 5px; 
        width: calc(100% - 2.5rem); 
        cursor: pointer; 
        text-align: center; 
        margin: 0.5rem; 
        border-radius: 16px;
        pointer-events: all;
        transition: background-color 0.1s ease-in-out;
      }
      .mauto_send_btn:hover {
        background-color: #335599 !important;
      }

      #viewport {
        margin-top: 160px;
      }
      body{
        background-color: #f8f9fb;
      }
    `;
  document.head.appendChild(style);
  let container = document.createElement("div");
  container.classList.add("max_auto_provisioner_container");
  const sendButton = document.createElement("div");
  sendButton.classList.add("mauto_send_btn");
  sendButton.innerText = "Send Inventory Snapshot to Max Autolytics";
  sendButton.id = "mauto_send_btn";
  sendButton.addEventListener("click", getAllSales);
  container.appendChild(sendButton);
  document.querySelector("#menu2").appendChild(container);
}

async function getAllSales(element) {
  element.target.removeEventListener("click", getAllSales);
  element.target.innerText = "Fetching data...";
  element.target.style.cursor = "default";
  element.target.style.backgroundColor = "hsl(220, 50%, 40%)";
  element.target.style.width = "100%";
  element.target.style.pointerEvents = "none";
  fetch(
    "https://provision.vauto.app.coxautoinc.com/Va/Inventory/InventoryData.ashx",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "save-data": "on",
        "sec-ch-ua":
          '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: "https://provision.vauto.app.coxautoinc.com/Va/Inventory/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: "_pageSize=1000&_sortBy=DaysInInventory%20ASC&sorts=&_firstRecord=0&InventoryStatus=0&Historical=0&RetailWholesale=R&NewUsed=U&ExcludeFromCounts=0&customSettings=%5B%7B id %3A NADA_Retail %2C value %3A 0 %2C condition %3A Clean %2C conditionLabel %3A Clean %2C type %3A priceguide %7D%2C%7B id %3A NADA_TradeIn %2C value %3A 0 %2C condition %3A Clean %2C conditionLabel %3A Clean %2C type %3A priceguide %7D%2C%7B id %3A KBBOnline_UCFPP %2C value %3A 0 %2C condition %3A Excellent %2C conditionLabel %3A Excellent %2C type %3A priceguide %7D%2C%7B id %3A KelleyBlueBook_Wholesale %2C value %3A 0 %2C condition %3A Excellent %2C conditionLabel %3A Excellent %2C type %3A priceguide %7D%2C%7B id %3A KelleyBlueBook_Retail %2C value %3A 0 %2C condition %3A Excellent %2C conditionLabel %3A Excellent %2C type %3A priceguide %7D%5D&HqTranferEntityNotSame=false&QuickSearch=&SalePending=&PricingTargetSetId=&RankingBucket=&ChildEntity=&gridSrcName=inventoryDetail&switchReport=",
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  )
    .then((e) => e.text())
    .then((e) => {
      let obj = e;
      obj = obj.replace(/new Date\((\d+)\)/g, "$1");
      obj = JSON.parse(obj);
      console.log(obj);
      let returnObjs = [];
      let keys = [];
      obj.columns.forEach((column, index) => {
        keys[index] = column;
      });
      obj.rows.forEach((row, index) => {
        let obj = {};
        row.forEach((column, index) => {
          obj[keys[index]] = column;
        });
        let source = obj["VehicleSource"];
        if (obj.InventoryTags) {
          if (obj.InventoryTags.includes("source-")) {
            if (obj.InventoryTags.split(",")[0].split("source-").length > 1) {
              source = obj.InventoryTags.split(",")[0]
                .split("source-")[1]
                .replace(/-/g, " ")
                .toUpperCase();
            }
          }
        }
        obj["VehicleSource"] = source;
        returnObjs[index] = obj;
        if (obj["VehicleSource"] !== source || !source)
          console.log(obj["VehicleSource"], source, obj["Vin"]);
      });
      return returnObjs;
    })
    .then((e) => {
      element.target.innerText =
        "Sending data to database... This can take up to 5 minutes. Please do not refresh or leave the page.";
      // return fetch('http://localhost:9000/webhook/inventory', {
      // return fetch("http://localhost:9000/api/v2/webhook/inventory", {
      return fetch(
        "https://v3-max-autolytics-0c66f527a760.herokuapp.com/api/v2/webhook/inventory",
        {
          // fetch(
          //   'https://beta-max-autolytics-42e7b1f0061c.herokuapp.com/webhook/inventory',
          //   {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(e),
        }
      );
    })
    .then((e) => {
      const data = e.text();
      return data;
    })
    .then(async (e) => {
      let intervalId;
      intervalId = setInterval(() => {
        fetch(
          "https://v3-max-autolytics-0c66f527a760.herokuapp.com/api/v2/webhook/inventory?taskId=" +
            e
          // "http://localhost:9000/api/v2/webhook/inventory?taskId=" + e
        ).then(async (x) => {
          const data = await x.json();
          const { taskId, batchCurrent, batchTotal, isCompleted } = data;
          if (isCompleted) {
            clearInterval(intervalId);
            document
              .getElementById("mauto_send_btn")
              .addEventListener("click", getAllSales);
            document.getElementById("mauto_send_btn").innerText = "Done!";
            document.getElementById("mauto_send_btn").style.cursor = "pointer";
            document.getElementById("mauto_send_btn").style.backgroundColor =
              "#99ff99";
            document.getElementById("mauto_send_btn").style.pointerEvents =
              "all";
            setTimeout(() => {
              document.getElementById("mauto_send_btn").innerText =
                "Send Inventory Snapshot to Max Autolytics";
              document.getElementById("mauto_send_btn").style.backgroundColor =
                "#ccc";
            }, 5000);
          } else {
            document.getElementById("mauto_send_btn").style.backgroundColor =
              "hsl(220, 50%, 40%)";
            document.getElementById("mauto_send_btn").style.cursor = "default";
            document
              .getElementById("mauto_send_btn")
              .removeEventListener("click", getAllSales);
            document.getElementById("mauto_send_btn").style.pointerEvents =
              "none";
            document.getElementById("mauto_send_btn").innerHTML = `
              Sending data to database... This can take up to 5 minutes. Please do not refresh or leave the page.
              <div style='width: 100%; height: 20px; background-color: #aaa; border-radius: 16px;'>
                <div style='width: ${Math.floor(
                  (batchCurrent / batchTotal) * 100
                )}%; height: 20px; background-color: hsl(220, 50%, 40%); border-radius: 16px;'></div>
              </div>
              <div style='width: 100%; height: 20px; text-align:center;'>
              ${batchCurrent}/${batchTotal} - ${Math.floor(
              (batchCurrent / batchTotal) * 100
            )} % complete
              </div>
            `;
          }
        });
      }, 1000);
    })
    .catch((e) => {
      console.log(e);
      element.target.addEventListener("click", getAllSales);
      element.target.innerText = "There was an error. Try Again";
      element.target.style.cursor = "pointer";
      element.target.style.backgroundColor = "#ff9999";
      element.target.style.pointerEvents = "all";
      setTimeout(() => {
        element.target.innerText = "Send Inventory Snapshot to Max Autolytics";
      }, 5000);
    });
}
