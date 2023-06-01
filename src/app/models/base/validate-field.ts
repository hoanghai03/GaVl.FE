import { ErrorCode } from "src/app/shared/enum/error.enum";

export class ValidateField {
    public fieldName: string = "";
    public code!:ErrorCode;
    public errorMessage: string = "";
}