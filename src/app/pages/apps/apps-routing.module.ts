import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { GenQrComponent } from "./gen-qr/gen-qr.component";

// Component pages

const routes: Routes = [
  // {
  //   path: "apps",
  //   redirectTo: "chat",
  //   pathMatch: "full",
  // },
  {
    path: "",
    component: ChatComponent,
  },
  {
    path: "chat",
    component: ChatComponent,
  },
  {
    path: "genqr",
    component: GenQrComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppsRoutingModule {}
