import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CountNotificationRequest {
  recipientId: string;
}

interface CountNotificationResponse {
  count: number;
}

@Injectable()
export class CountNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountNotificationRequest,
  ): Promise<CountNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
