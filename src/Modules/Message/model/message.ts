import { Entity } from "../../Interface/Entity";

type MessageRequestProps = {

  template_name: string
  position?: number
}

export class Message extends Entity<MessageRequestProps>{

  constructor(props: MessageRequestProps, id?: string) {

    super(props, id);
  }

  static create(props: MessageRequestProps, id?: string) {

    const message = new Message(props, id);
    return message;
  }
}
