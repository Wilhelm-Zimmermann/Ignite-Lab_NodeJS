import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountNotification } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notificatino';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotifications,
  ],
})
export class HttpModule {}
