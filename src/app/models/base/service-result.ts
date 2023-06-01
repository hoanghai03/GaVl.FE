import { BaseMessageResponse } from "./base-message-response";
import { ValidateField } from "./validate-field";

export class ServiceResult extends BaseMessageResponse{
    public data: any;
    public validateInfo!: ValidateField[];
    public total: number = 0;
}