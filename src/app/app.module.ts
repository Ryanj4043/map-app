import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponentComponent } from './map-component/map-component.component';
import { PinStyleComponent } from './pin-style/pin-style.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponentComponent,
    PinStyleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
