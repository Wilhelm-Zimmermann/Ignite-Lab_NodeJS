import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountNotification } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  test('it should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountNotification(
      notificationsRepository,
    );

    const newNotification = makeNotification({ recipientId: 'AKA@!' });

    await notificationsRepository.create(newNotification);
    await notificationsRepository.create(newNotification);
    await notificationsRepository.create(newNotification);

    const result = await countRecipientNotification.execute({
      recipientId: 'AKA@!',
    });

    expect(result.count).toEqual(3);
  });
});
