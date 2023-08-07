export const createOptionsMenu = (anchor) => {
  let top = anchor.getBoundingClientRect().bottom
  let left = anchor.getBoundingClientRect().right
  let element = `
  <div style='background-color: white; border-radius: 1rem; padding: 0.5rem; box-shadow: 0 0 5px 2px rgba(0,0,0,0.2); position: absolute; top: ${top}px; left: ${left}px; z-index: 999' id='max_auto_provisioner_options_container'>
    test
  </div>
  `
  document.body.insertAdjacentHTML('beforeend', element)
}