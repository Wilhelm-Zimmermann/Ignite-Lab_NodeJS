import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';
import { Content } from './content';

export interface NotificationProps {
  content: Content;
  category: string;
  readAt?: Date | null;
  recipientId: string;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  // ID
  public get id(): string {
    return this._id;
  }

  // CONTENT
  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  // CATEGORY
  public set category(category: string) {
    if (category.length <= 6) {
      throw new Error('');
    }

    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  // RECIPIENTID
  public set recipientId(recipientId: string) {
    if (recipientId.length <= 6) {
      throw new Error('');
    }

    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  // READAT
  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  // CREATEDAT
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  // CANCELED AT
  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }
}
