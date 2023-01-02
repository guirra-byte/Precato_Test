import { IMessageRepository } from "../../../Repository/IMessageRepository";

export class SendMessageIfService {
    constructor(private messageRepository: IMessageRepository){}

    async execute(): Promise<void> {}
}