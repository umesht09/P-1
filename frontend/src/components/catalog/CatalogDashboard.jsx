import { useEffect, useState } from 'react'
import { fetchItems, createItem, updateItem, deleteItem } from '../../services/itemService'
import { useDebounce } from '../../hooks/useDebounce'
import { useToast } from '../../context/ToastContext'
import { DEFAULT_LIMIT, SORT_OPTIONS } from '../../constants/catalog'
import Card from '../layout/Card'
import SkeletonList from '../common/SkeletonList'
import CatalogFilters from './CatalogFilters'
import ItemTable from './ItemTable'
import EmptyState from './EmptyState'
import Pagination from './Pagination'
import ItemFormModal from './ItemFormModal'
import ItemDetailModal from './ItemDetailModal'
import DeleteConfirmModal from './DeleteConfirmModal'

function CatalogDashboard() {
  const [items, setItems] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [sortIndex, setSortIndex] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(DEFAULT_LIMIT)
  const [totalPages, setTotalPages] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)

  const [modal, setModal] = useState(null) // { type: 'add' | 'edit' | 'view' | 'delete', item? }

  const search = useDebounce(searchInput, 400)
  const { sortBy, sortOrder } = SORT_OPTIONS[sortIndex]
  const { showToast } = useToast()

  // Reset to page 1 whenever search, filters, or sorting change.
  useEffect(() => {
    setPage(1)
  }, [search, category, status, sortIndex])

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    fetchItems({ page, limit, search, category, status, sortBy, sortOrder })
      .then((res) => {
        if (cancelled) return
        const data = res.data
        setItems(data.items)
        setTotalPages(data.totalPages)
        setCount(data.count)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.response?.data?.message || 'Failed to load items.')
        setItems([])
        setTotalPages(0)
        setCount(0)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [page, limit, search, category, status, sortBy, sortOrder, reloadToken])

  const handleReset = () => {
    setSearchInput('')
    setCategory('')
    setStatus('')
    setSortIndex(0)
    setPage(1)
  }

  const refresh = () => setReloadToken((t) => t + 1)
  const closeModal = () => setModal(null)

  const handleCreate = async (itemData) => {
    try {
      await createItem(itemData)
      showToast('Item created successfully.')
      closeModal()
      refresh()
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create item.', 'error')
    }
  }

  const handleUpdate = async (itemData) => {
    try {
      await updateItem(modal.item._id, itemData)
      showToast('Item updated successfully.')
      closeModal()
      refresh()
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update item.', 'error')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteItem(modal.item._id)
      showToast('Item deleted successfully.')
      closeModal()
      refresh()
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete item.', 'error')
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">SwiftCatalog</h1>
        <button
          type="button"
          onClick={() => setModal({ type: 'add' })}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Add Item
        </button>
      </div>

      <Card className="mb-4 p-4">
        <CatalogFilters
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
          sortIndex={sortIndex}
          onSortChange={setSortIndex}
        />
      </Card>

      <Card>
        {loading && <SkeletonList rows={limit > 8 ? 8 : limit} />}

        {!loading && error && (
          <p className="px-4 py-16 text-center text-sm text-red-600">{error}</p>
        )}

        {!loading && !error && items.length === 0 && <EmptyState onReset={handleReset} />}

        {!loading && !error && items.length > 0 && (
          <>
            <ItemTable
              items={items}
              onView={(item) => setModal({ type: 'view', item })}
              onEdit={(item) => setModal({ type: 'edit', item })}
              onDelete={(item) => setModal({ type: 'delete', item })}
            />
            <Pagination page={page} totalPages={totalPages} count={count} onPageChange={setPage} />
          </>
        )}
      </Card>

      {modal?.type === 'add' && <ItemFormModal onClose={closeModal} onSubmit={handleCreate} />}

      {modal?.type === 'edit' && (
        <ItemFormModal item={modal.item} onClose={closeModal} onSubmit={handleUpdate} />
      )}

      {modal?.type === 'view' && <ItemDetailModal item={modal.item} onClose={closeModal} />}

      {modal?.type === 'delete' && (
        <DeleteConfirmModal item={modal.item} onClose={closeModal} onConfirm={handleDelete} />
      )}
    </div>
  )
}

export default CatalogDashboard
