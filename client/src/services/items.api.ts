import { apiClient } from '@/utils/api'
import { Item, ItemForm } from '@/types/item.types'
import { ItemDeleteResponse } from '@/types/response.types'

export const itemsService = {
  async getItems(isFiltered = true): Promise<Item[]> {
    const { data: items } = await apiClient.get(`/items?filterParents=${isFiltered}`)

    return items
  },

  async addItem(itemValues: ItemForm): Promise<Item> {
    const { data: item } = await apiClient.post('/items', itemValues)

    return item
  },

  async editItem(itemId: Item['_id'], itemValues: Partial<Item>): Promise<Item> {
    const { data: item } = await apiClient.put(`/items/${itemId}`, itemValues)

    return item
  },

  async deleteItem(itemId: Item['_id']): Promise<ItemDeleteResponse> {
    const { data } = await apiClient.delete(`/items/${itemId}`)

    return data
  },

  async bag(itemId: Item['_id']): Promise<Item> {
    const { data: item } = await apiClient.get(`/items/bag/${itemId}`)

    return item
  },

  async unbag(itemId: Item['_id']): Promise<Item> {
    const { data: item } = await apiClient.get(`/items/unbag/${itemId}`)

    return item
  },
}
