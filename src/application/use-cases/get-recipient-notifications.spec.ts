import { makeNotification } from '@test/factories/notification-factory';
import { randomUUID } from 'crypto';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get notifications by recipient id', () => {
  test('it should be able to get all notifications with recipient id', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotifications(
      notificationsRepository,
    );

    const notification = makeNotification({ recipientId: '1234' });

    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification);

    const result = await getRecipientNotification.execute({
      recipientId: '1234',
    });

    expect(result.notifications).toHaveLength(3);
  });
});
