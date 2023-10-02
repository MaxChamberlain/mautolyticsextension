document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('MaxAutolyticsBaseUrl', function (result) {
    if (result && result.MaxAutolyticsBaseUrl) {
      document.getElementById('server_url').value = result.MaxAutolyticsBaseUrl
    }
  })
  chrome.storage.local.get(
    'MaxAutolyticsInventoryWebhookUrl',
    function (result) {
      if (result) {
        const url = result.MaxAutolyticsInventoryWebhookUrl
        document.getElementById('inventory_webhook').value = url ?? 'gd'
      }
    }
  )
  document.getElementById('save-settings-btn').addEventListener('click', () => {
    alert('test')
    chrome.storage.local.set(
      { MaxAutolyticsBaseUrl: document.getElementById('server_url').value },
      function () {
        console.log('MaxAutolyticsBaseUrl saved')
        document.getElementById('test').innerText =
          document.getElementById('server_url').value
      }
    )
    chrome.storage.local.set(
      {
        MaxAutolyticsInventoryWebhookUrl:
          document.getElementById('inventory_webhook').value
      },
      function () {
        console.log('MaxAutolyticsInventoryWebhookUrl saved')
      }
    )
  })
})
