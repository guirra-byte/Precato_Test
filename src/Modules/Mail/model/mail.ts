import { Entity } from "../../Interface/Entity";

type MailProps = {

  title: string
  description: string
  from: string
  to: string

}

export class Mail extends Entity<MailProps>{

  constructor(props: MailProps, id?: string) {

    super(props, id);
  }

  static create(props: MailProps, id?: string) {

    const newMail = new Mail(props, id);
    return newMail;
  }
}