import { Logger } from '@nestjs/common'
import {
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { Item } from './schemas/item.schema'

@WebSocketGateway({ cors: true, namespace: 'items' })
export class ItemsGateway implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit {
  @WebSocketServer() wss: Server

  private readonly logger = new Logger(ItemsGateway.name)

  handleItemAppear(item: Item): void {
    this.wss.emit('itemAppear', item)
  }

  handleItemBag(item: Item): void {
    this.wss.emit('itemBag', item)
  }

  handleItemsRemove(itemIds: string[]): void {
    this.wss.emit('itemsRemove', itemIds)
  }

  handleItemUpdate(item: Item): void {
    this.wss.emit('itemUpdate', item)
  }

  afterInit() {
    this.logger.log('WebSocket server with "items" namespace successfully initialized')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }
}
