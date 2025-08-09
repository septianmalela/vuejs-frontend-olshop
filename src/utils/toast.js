import * as bootstrap from 'bootstrap'

export function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container')

  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.id = 'toast-container'
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3'
    document.body.appendChild(toastContainer)
  }

  const toastEl = document.createElement('div')
  toastEl.className = `toast align-items-center text-bg-${type} border-0`
  toastEl.role = 'alert'
  toastEl.ariaLive = 'assertive'
  toastEl.ariaAtomic = 'true'
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `

  toastContainer.appendChild(toastEl)

  const toast = new bootstrap.Toast(toastEl)
  toast.show()

  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove()
  })
}
