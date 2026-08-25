import { useToast } from '../../context/ToastContext'

const TYPE_CLASSES = {
  success: 'bg-green-600',
  error: 'bg-red-600',
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-white shadow-lg ${TYPE_CLASSES[toast.type] || TYPE_CLASSES.success}`}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-white/80 hover:text-white"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
