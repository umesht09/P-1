import api from './api'

export const fetchItems = (params) =>
  api.get('/items', {
    params: {
      page: params?.page,
      limit: params?.limit,
      search: params?.search,
      category: params?.category,
      status: params?.status,
      sortBy: params?.sortBy,
      sortOrder: params?.sortOrder,
    },
  })

export const fetchItemById = (id) => api.get(`/items/${id}`)

export const createItem = (itemData) => api.post('/items', itemData)

export const updateItem = (id, itemData) => api.put(`/items/${id}`, itemData)

export const deleteItem = (id) => api.delete(`/items/${id}`)
