import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWebSocketService } from './messages-web-socket.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-messages.dtos';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload.interface';

@WebSocketGateway({ cors: true })
export class MessagesWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messagesWebSocketService: MessagesWebSocketService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.messagesWebSocketService.registerClient(client, payload.id);
    } catch (error) {
      console.log('🚀 ~ handleConnection ~ error:', error);
      client.disconnect(true);
      return;
    }
    console.log('🚀 ~ handleConnection ~ payload:', { payload });

    this.server.emit(
      'connectedClients',
      this.messagesWebSocketService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWebSocketService.removeClient(client.id);
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto): void {
    console.log('🚀 ~ handleMessageFromClient ~ client:', client.id, payload);
    //this.server.emit('message-from-server', payload);
    //emite unicamente al cliente que envio el mensaje
    //client.emit('message-from-server', payload);

    //emite a todos los clientes conectados
    client.broadcast.emit('message-from-server', {
      fullName: this.messagesWebSocketService.getUserFullName(client.id),
      message: payload.message,
    });
  }
}
