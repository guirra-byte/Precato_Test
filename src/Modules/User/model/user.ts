import { Entity } from "../../Interface/Entity";

type UserRequestProps = {

  name: string
  email: string
}

export class User extends Entity<UserRequestProps>{

  constructor(props: UserRequestProps, id?: string) {

    super(props, id)
  }

  static create(props: UserRequestProps, id?: string) {

    const user = new User(props, id);
    return user;
  }
}