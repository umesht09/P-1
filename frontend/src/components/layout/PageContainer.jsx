function PageContainer({ children }) {
  return (
    <div className="min-h-svh bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  )
}

export default PageContainer
