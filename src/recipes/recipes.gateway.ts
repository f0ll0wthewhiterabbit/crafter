import { Logger } from '@nestjs/common'
import {
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { Recipe } from './schemas/recipe.schema'

@WebSocketGateway({ cors: true, namespace: 'recipes' })
export class RecipesGateway implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit {
  @WebSocketServer() wss: Server

  private readonly logger = new Logger(RecipesGateway.name)

  handleRecipeAppear(recipe: Recipe): void {
    this.wss.emit('recipeAppear', recipe)
  }

  handleRecipeBag(recipe: Recipe): void {
    this.wss.emit('recipeBag', recipe)
  }

  handleRecipesRemove(recipeIds: string[]): void {
    this.wss.emit('recipesRemove', recipeIds)
  }

  handleRecipeUpdate(recipe: Recipe): void {
    this.wss.emit('recipeUpdate', recipe)
  }

  afterInit() {
    this.logger.log('WebSocket server with "recipes" namespace successfully initialized')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }
}
