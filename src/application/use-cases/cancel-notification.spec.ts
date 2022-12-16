import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { randomUUID } from 'crypto';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  test('it should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const newNotification = new Notification({
      category: 'faa',
      content: new Content('HELKOJ'),
      recipientId: 'dladskjf',
    });

    await notificationsRepository.create(newNotification);

    await cancelNotification.execute({ notificationId: newNotification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('it should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const newNotification = new Notification({
      category: 'faa',
      content: new Content('HELKOJ'),
      recipientId: 'dladskjf',
    });

    expect(() => {
      return cancelNotification.execute({
        notificationId: newNotification.id,
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
