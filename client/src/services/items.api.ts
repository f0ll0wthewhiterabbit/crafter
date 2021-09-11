import { apiClient } from '@/utils/api'
import { Item, ItemForm } from '@/types/item.types'
import { ItemDeleteResponse } from '@/types/response.types'

export const itemsService = {
  async getItems(canFilterParents = true, canFilterForeign = true): Promise<Item[]> {
    const { data: items } = await apiClient.get(
      `/items?filterParents=${canFilterParents}&filterForeign=${canFilterForeign}`
    )

    return items
  },

  async addItem(itemValues: ItemForm): Promise<Item> {
    const { data: item } = await apiClient.post('/items', itemValues)

    return item
  },

  async editItem(itemId: Item['id'], itemValues: Partial<Item>): Promise<Item> {
    const { data: item } = await apiClient.put(`/items/${itemId}`, itemValues)

    return item
  },

  async deleteItem(itemId: Item['id']): Promise<ItemDeleteResponse> {
    const { data } = await apiClient.delete(`/items/${itemId}`)

    return data
  },

  async bag(itemId: Item['id']): Promise<Item> {
    const { data: item } = await apiClient.get(`/items/bag/${itemId}`)

    return item
  },

  async unbag(itemId: Item['id']): Promise<Item> {
    const { data: item } = await apiClient.get(`/items/unbag/${itemId}`)

    return item
  },
}
