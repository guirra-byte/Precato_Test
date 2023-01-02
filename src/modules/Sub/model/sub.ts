import { Entity } from '../../Interface/Entity';

export enum SubCases {
  INBOUND = 'Sub acaba de entrar em nossa lista de email',
  PROSPECT = 'Podemos informar o Sub sobre os próximos passos para abertura de seu processo',
  STAND_BY = 'Aguardando resposta positiva do Sub',
  PROCESS_ERROR = 'Processo negado pelo Sub',
  FINALLY = 'Processo autorizado pelo Sub'
}

type SubRequestProps = {
  sub_date?: Date,
  name: string,
  last_message?: number,
  active?: boolean,
  actualCase: SubCases,
}

export class Sub extends Entity<SubRequestProps>{
  constructor(props: SubRequestProps, id?: string) {
    props.active = true;
    props.actualCase = SubCases['INBOUND'];
    
    super(props, id);
  }

  static create(props: SubRequestProps, id?: string) {
    const sub = new Sub(props, id);
    return sub;
  }
}