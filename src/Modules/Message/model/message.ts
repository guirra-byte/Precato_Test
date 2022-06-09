import { MessageEntity } from "../../Interface/MessageEntity";

type MessageRequestProps = {

  template_name: string
  id?: number
}

export class Message extends MessageEntity<MessageRequestProps>{

  constructor(props: MessageRequestProps) {

    super(props);
  }

  static create(props: MessageRequestProps) {

    const message = new Message(props);
    return message;
  }
}
