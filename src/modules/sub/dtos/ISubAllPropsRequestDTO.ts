import { IUpdateSubLastMessageDTO } from "./IUpdateSubLastMessage";

export interface ISubAllPropsRequestDTO{
    id?: string,
    props: {
        subs_date?: Date,
        name: string,
        email: string,
        last_message?: IUpdateSubLastMessageDTO,
        active: boolean,
        actualCase: string
    }
}
