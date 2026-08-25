import { useState } from 'react'
import Modal from '../common/Modal'

function DeleteConfirmModal({ item, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false)

  const handleConfirm = async () => {
    setDeleting(true)
    try {
      await onConfirm()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Modal title="Delete Item" onClose={onClose}>
      <p className="text-sm text-gray-700">
        Are you sure you want to delete <strong>{item.title}</strong>? This action cannot be
        undone.
      </p>

      <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={deleting}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  )
}

export default DeleteConfirmModal
