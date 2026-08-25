import { CATEGORIES, SORT_OPTIONS, STATUSES } from '../../constants/catalog'

function CatalogFilters({
  searchInput,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sortIndex,
  onSortChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title or description..."
        className="w-full flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none sm:min-w-[220px]"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      >
        <option value="">All Statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={sortIndex}
        onChange={(e) => onSortChange(Number(e.target.value))}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      >
        {SORT_OPTIONS.map((opt, index) => (
          <option key={opt.label} value={index}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CatalogFilters
