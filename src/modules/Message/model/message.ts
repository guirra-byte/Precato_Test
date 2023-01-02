import { MessageEntity } from "../../Interface/MessageEntity";
import { SubCases } from "../../Sub/model/sub";

type MessageRequestProps = {
  template_name: string
  id?: number
  expect_send_date: Date
  sendIf: SubCases
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
