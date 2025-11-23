import React, { useEffect, useRef } from 'react'

export default function ConfirmModal({ open, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onClose }) {
  const ref = useRef(null)
  const instance = useRef(null)

  useEffect(() => {
    if (!ref.current || !window.bootstrap) return
    instance.current = new window.bootstrap.Modal(ref.current, { backdrop: 'static' })
    const handler = () => onClose && onClose()
    ref.current.addEventListener('hidden.bs.modal', handler)
    return () => {
      ref.current && ref.current.removeEventListener('hidden.bs.modal', handler)
      instance.current && instance.current.dispose && instance.current.dispose()
    }
  }, [])

  useEffect(() => {
    if (!instance.current) return
    if (open) instance.current.show()
    else instance.current.hide()
  }, [open])

  return (
    <div ref={ref} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content tm-card">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <p className="mb-0">{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">{cancelText}</button>
            <button className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
