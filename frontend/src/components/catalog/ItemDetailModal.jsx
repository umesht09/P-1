import Modal from '../common/Modal'
import StatusBadge from './StatusBadge'

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  )
}

function ItemDetailModal({ item, onClose }) {
  return (
    <Modal title="Item Details" onClose={onClose}>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Title" value={item.title} />
        <Field label="Category" value={item.category} />
        <Field label="Price" value={currencyFormatter.format(item.price)} />
        <Field label="Status" value={<StatusBadge status={item.status} />} />
        <div className="sm:col-span-2">
          <Field label="Description" value={item.description || 'No description provided.'} />
        </div>
        <Field label="Created" value={dateFormatter.format(new Date(item.createdAt))} />
        <Field label="Last Updated" value={dateFormatter.format(new Date(item.updatedAt))} />
      </dl>

      <div className="mt-4 flex justify-end border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default ItemDetailModal
