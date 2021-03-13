import { apiClient } from '@/utils/api'
import { Item, ItemForm } from '@/types/item.types'
import { ItemRequest } from '@/types/request.types'

export const itemsService = {
  async getItems(isFiltered = true): Promise<ItemRequest[]> {
    const { data: items } = await apiClient.get(`/items?filterParents=${isFiltered}`)

    return items
  },

  async addItem(itemValues: ItemForm): Promise<ItemRequest> {
    const { data: item } = await apiClient.post('/items', itemValues)

    return item
  },

  async editItem(itemId: Item['_id'], itemValues: Partial<Item>): Promise<ItemRequest> {
    const { data: item } = await apiClient.put(`/items/${itemId}`, itemValues)

    return item
  },

  async deleteItem(itemId: Item['_id']): Promise<void> {
    await apiClient.delete(`/items/${itemId}`)
  },

  async bag(itemId: Item['_id']): Promise<ItemRequest> {
    const { data: item } = await apiClient.get(`/items/bag/${itemId}`)

    return item
  },

  async unbag(itemId: Item['_id']): Promise<ItemRequest> {
    const { data: item } = await apiClient.get(`/items/unbag/${itemId}`)

    return item
  },
}
