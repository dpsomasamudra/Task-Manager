import React, { useEffect, useRef } from 'react'

export default function Toast({ open, message, variant = 'info', onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const t = new window.bootstrap.Toast(ref.current, { delay: 3000 })
    if (open) t.show()
    const handler = () => onClose && onClose()
    ref.current.addEventListener('hidden.bs.toast', handler)
    return () => ref.current && ref.current.removeEventListener('hidden.bs.toast', handler)
  }, [open])
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
      <div ref={ref} className="toast align-items-center text-bg-light border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className={`toast-body ${variant === 'success' ? 'text-success' : variant === 'danger' ? 'text-danger' : variant === 'warning' ? 'text-warning' : ''}`}>{message}</div>
          <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
  )
}
