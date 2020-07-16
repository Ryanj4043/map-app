import { Injectable } from '@angular/core';
import Style from 'ol/style/Style';
import Feature from 'ol/Feature';
import { of, Observable } from 'rxjs';
import Icon from 'ol/style/Icon';

@Injectable({
  providedIn: 'root'
})
export class PinStyleService {

  public styleSource: Style;  
  public currentStyle: Observable<Style>;

  public pinSource: Feature;
  public currentPin: Observable<Feature>;

  constructor() { }

  createStyle(url: string): void {
    this.styleSource = new Style({
      image: new Icon({
        src: url
      })
    });
    this.currentStyle = of(this.styleSource);
  }
  
  createPin(locName?: string, locDesc?: string, locOwner?: string): void {
    this.pinSource = new Feature({name: locName, description: locDesc, owner: locOwner});
    this.currentPin = of(this.pinSource);
  }
}
