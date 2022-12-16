import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { ReadNotification } from './read-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Read notification', () => {
  test('it should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const newNotification = new Notification({
      category: 'faa',
      content: new Content('HELKOJ'),
      recipientId: 'dladskjf',
    });

    await notificationsRepository.create(newNotification);

    await readNotification.execute({ notificationId: newNotification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  test('it should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const newNotification = new Notification({
      category: 'faa',
      content: new Content('HELKOJ'),
      recipientId: 'dladskjf',
    });

    expect(() => {
      return readNotification.execute({
        notificationId: newNotification.id,
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
