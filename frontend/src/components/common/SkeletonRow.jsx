function SkeletonRow() {
  return (
    <div className="grid animate-pulse grid-cols-5 gap-4 border-b border-gray-100 px-4 py-3">
      <div className="h-4 rounded bg-gray-200" />
      <div className="h-4 rounded bg-gray-200" />
      <div className="h-4 rounded bg-gray-200" />
      <div className="h-4 rounded bg-gray-200" />
      <div className="h-4 rounded bg-gray-200" />
    </div>
  )
}

export default SkeletonRow
