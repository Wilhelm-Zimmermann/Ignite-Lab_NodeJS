import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('UnRead notification', () => {
  test('it should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const newNotification = new Notification({
      category: 'faa',
      content: new Content('HELKOJ'),
      recipientId: 'dladskjf',
      readAt: new Date(),
    });

    await notificationsRepository.create(newNotification);

    await unreadNotification.execute({ notificationId: newNotification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  test('it should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const newNotification = new Notification({
      category: 'faa',
      content: new Content('HELKOJ'),
      recipientId: 'dladskjf',
    });

    expect(() => {
      return unreadNotification.execute({
        notificationId: newNotification.id,
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
