import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { environment } from "src/environments/environment";
var token = `${localStorage.getItem('token')}`;
@Injectable({
    providedIn:'root'
})
export class SignalRService {
    connection: any;

  constructor() {
    this.connection = null;
  }

  // Establish a connection to the SignalR server hub
  public initiateSignalrConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(environment.hub_signalr,{ accessTokenFactory: () => token })
        .build();

      this.connection
        .start()
        .then(() => {
          console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
          this.setSignalrClientMethods();
          resolve();
        })
        .catch((error: any) => {
          console.log(`SignalR connection error: ${error}`);
          reject();
        });
    });
  }

  // This method will implement the methods defined in the ISignalrDemoHub interface in the SignalrDemo.Server .NET solution
  private setSignalrClientMethods(): void {
    this.connection.invoke('AddUserToGroup',localStorage.getItem('id'))

  }
}