import { Component } from "@angular/core";
import { SignalRService } from "./services/signalR.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [SignalRService]
})
export class AppComponent {
  title = "GaVlFE";
}
