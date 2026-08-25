function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-lg font-medium text-gray-700">No items found</p>
      <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
      <button
        type="button"
        onClick={onReset}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Reset filters
      </button>
    </div>
  )
}

export default EmptyState
