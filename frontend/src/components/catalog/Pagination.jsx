function Pagination({ page, totalPages, count, onPageChange }) {
  if (totalPages <= 0) return null

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 sm:flex-row">
      <p className="text-sm text-gray-500">
        {count} item{count === 1 ? '' : 's'} total &middot; page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-gray-50"
        >
          Previous
        </button>

        {pageNumbers.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={n === page ? 'page' : undefined}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              n === page
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
