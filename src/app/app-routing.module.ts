import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  {
    path:'timeline',component:DisplayComponent
  },
  {
    path:'timeline/:id',component:DisplayComponent
  },{
    path:'event',component:EventComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
