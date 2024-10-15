import { Module } from '@nestjs/common';
import { MessagesWebSocketService } from './messages-web-socket.service';
import { MessagesWebSocketGateway } from './messages-web-socket.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MessagesWebSocketGateway, MessagesWebSocketService],
  imports: [AuthModule],
})
export class MessagesWebSocketModule {}
