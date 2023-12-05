import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { EventComponent } from './event/event.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    EventComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,MatDialogModule,NgxMaterialTimepickerModule,BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
