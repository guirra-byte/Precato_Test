import { Entity } from "../../../interface/Entity";

type UserRequestProps = {

  name: string
  email: string
  isAdmin: boolean
}

export class User extends Entity<UserRequestProps>{

  constructor(props: UserRequestProps, id?: string) {

    props.isAdmin = false;
    super(props, id);
  }

  static create(props: UserRequestProps, id?: string) {

    const user = new User(props, id);
    return user;
  }
}