import { useState } from 'react'
import Modal from '../common/Modal'
import { CATEGORIES, STATUSES } from '../../constants/catalog'

const EMPTY_FORM = {
  title: '',
  category: '',
  description: '',
  price: '',
  status: '',
}

function validate(form) {
  const errors = {}

  if (!form.title.trim()) errors.title = 'Title is required.'
  if (!form.category) errors.category = 'Category is required.'
  if (!form.status) errors.status = 'Status is required.'

  if (form.price === '') {
    errors.price = 'Price is required.'
  } else if (Number.isNaN(Number(form.price)) || Number(form.price) < 0) {
    errors.price = 'Price must be a non-negative number.'
  }

  return errors
}

function ItemFormModal({ item, onClose, onSubmit }) {
  const isEdit = Boolean(item)
  const [form, setForm] = useState(
    item
      ? {
          title: item.title,
          category: item.category,
          description: item.description || '',
          price: String(item.price),
          status: item.status,
        }
      : EMPTY_FORM
  )
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit({
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        price: Number(form.price),
        status: form.status,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={isEdit ? 'Edit Item' : 'Add Item'} onClose={onClose}>
      <form id="item-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange('title')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={handleChange('category')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={handleChange('description')}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={handleChange('price')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={form.status}
            onChange={handleChange('status')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="">Select a status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
        </div>
      </form>

      <div className="mt-2 flex justify-end gap-2 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="item-form"
          disabled={submitting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Item'}
        </button>
      </div>
    </Modal>
  )
}

export default ItemFormModal
