export const CATEGORIES = ['Electronics', 'Apparel', 'Home Goods', 'Books', 'Other']

export const STATUSES = ['In Stock', 'Out of Stock']

export const SORT_OPTIONS = [
  { label: 'Newest', sortBy: 'createdAt', sortOrder: 'desc' },
  { label: 'Price: Low to High', sortBy: 'price', sortOrder: 'asc' },
  { label: 'Price: High to Low', sortBy: 'price', sortOrder: 'desc' },
  { label: 'Title: A-Z', sortBy: 'title', sortOrder: 'asc' },
]

export const DEFAULT_LIMIT = 10
