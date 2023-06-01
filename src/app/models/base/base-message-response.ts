import { HttpStatusCode } from "@angular/common/http";

export class BaseMessageResponse {
    public code: number = HttpStatusCode.Ok;
    public success = true;
    public message = "";
    public serverTime = "";
}