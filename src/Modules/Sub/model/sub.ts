import { Entity } from '../../Interface/Entity';

type SubRequestProps = {

  sub_date?: Date,
  name: string,
  last_message?: number,
  active?: boolean
}

export class Sub extends Entity<SubRequestProps>{

  constructor(props: SubRequestProps, id?: string) {

    props.active = true;
    super(props, id);
  }

  static create(props: SubRequestProps, id?: string) {

    const sub = new Sub(props, id);
    return sub;
  }
}