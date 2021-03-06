import { apiClient } from '@/utils/api'
import { Item, ItemForm } from '@/types/item.types'

export const itemsService = {
  async getItems(): Promise<Item[]> {
    const { data: items } = await apiClient.get('/items')

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

  async deleteItem(itemId: Item['_id']): Promise<void> {
    await apiClient.delete(`/items/${itemId}`)
  },
}
