export class MessageEntity<T>{
  props: T

  constructor(props: T) {
    this.props = props;
  }
}