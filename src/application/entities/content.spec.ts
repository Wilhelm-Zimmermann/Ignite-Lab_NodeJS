import { Content } from './content';

describe('Notification Content', () => {
  test('it should be able to create a notification content', () => {
    const content = new Content('You received a new friend request');

    expect(content).toBeTruthy();
  });

  test('it should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('YOU')).toThrow();
  });

  test('it should not be able to create a notification content with more than 250 characters', () => {
    expect(() => new Content('af'.repeat(250))).toThrow();
  });
});
