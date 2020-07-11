import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';

import {SizeCheckService} from "./size-check.service";

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponentComponent implements OnInit {

  public extent: [number, number, number, number] = [0, 0, 0, 0];
  public projection = new Projection({
    code: 'uploaded-image',
    units: 'pixels',
    extent: this.extent
  });

  public map: Map;

  public url: string[] = [];

  public layers: ImageLayer[];

  constructor(private sizeCheck: SizeCheckService) { }

  ngOnInit(): void {
  }

  async onUpload(){
    if(this.url[0]){
      let wandh = await this.sizeCheck.getImageDimenstion(this.url[0]);
      this.extent[2] = wandh[0];
      this.extent[3] = wandh[1];
      this.projection.setExtent(this.extent);

      this.createLayers();

      this.map = new Map({
        interactions: defaultInteractions().extend([
          new DragRotateAndZoom()
        ]),
        layers: this.layers,
        target: 'map',
        view: new View({
          projection: this.projection,
          center: getCenter(this.extent),
          minZoom: 1,
          zoom: 2,
          maxZoom: 5
        })
      });
    }
  }

  createLayers(): void{
    this.layers = [];

    for(let i =0 ; i < 3; i++ ){
      if(this.url[i]){
        let layer = new ImageLayer({
          source: new Static({
            url: this.url[i],
            projection: this.projection,
            imageExtent: this.extent
          })
        });
        this.layers.push(layer);
      }
    }
  }

}
