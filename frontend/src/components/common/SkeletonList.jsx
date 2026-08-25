import SkeletonRow from './SkeletonRow'

function SkeletonList({ rows = 5 }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SkeletonRow key={index} />
      ))}
    </div>
  )
}

export default SkeletonList
