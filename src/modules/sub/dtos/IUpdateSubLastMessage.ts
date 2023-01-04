import { SubCases } from "../infra/model/sub";

export interface IUpdateSubLastMessageDTO {
    subId: string
    id: string,
    msgCases: SubCases,
    msgDescription: string,
    send_at: Date
}