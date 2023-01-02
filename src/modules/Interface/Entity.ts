import { v4 as uuidV4 } from 'uuid';

export class Entity<T>{

  props: T
  id: string

  constructor(props: T, id?: string) {

    this.id = id ?? uuidV4();
    this.props = props;
  }
}