document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get('MaxAutolyticsBaseUrl', function (result) {
    if (result && result.MaxAutolyticsBaseUrl) {
      document.getElementById('server_url').value = result.MaxAutolyticsBaseUrl
      document.getElementById('inventory_webhook').value = result.MaxAutolyticsInventoryWebhook
    }
  })
})