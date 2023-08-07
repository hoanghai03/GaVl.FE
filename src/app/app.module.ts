import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutsModule } from "./layouts/layouts.module";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
// Language
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SignalRService } from "./services/signalR.service";
import { JwtInterceptor } from "./core/helpers/jwt.interceptor";
import { ErrorInterceptor } from "./core/helpers/error.interceptor";

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    SignalRService,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: SignalRService) => () =>
        signalrService.initiateSignalrConnection(),
      deps: [SignalRService],
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
