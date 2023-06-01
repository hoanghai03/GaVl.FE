import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-gen-qr',
  templateUrl: './gen-qr.component.html',
  styleUrls: ['./gen-qr.component.scss']
})
export class GenQrComponent implements OnInit{
  qrCode: any = '';
  constructor(private auth: AuthenticationService ) {

  }

  ngOnInit() {
    this.auth.genQrCode(localStorage.getItem('username') ).pipe(
      map((response: string) =>{
      return response
    })).subscribe(
      response => {
        debugger
        this.qrCode = response
      }
    );
    debugger
  }

}
