import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef,  Renderer2 } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';
import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';

import {SizeCheckService} from "./size-check.service";
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import {transform, toLonLat} from "ol/proj"
import { PinStyleService } from '../pin-style/pin-style.service';
import Overlay from 'ol/Overlay';
import OverlayPositioning from 'ol/OverlayPositioning';

declare var $: any;

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

  public layers: any[] = [];

  public markerLayer: VectorSource;

  public oneOff: boolean = false;

  public markerStyle = new Style({
    image: new Icon({
      src: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/32/pin-icon.png'
    })
  });

  public placePin: boolean;

  @ViewChild('popup') element: ElementRef;

  public popup: Overlay;

  constructor(private sizeCheck: SizeCheckService, private pinStyleSerive: PinStyleService,  private _renderer: Renderer2) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void{
    $(function () {
      $('[data-toggle="popover"]').popover()
  })

    this.popup = new Overlay({
      element: this.element.nativeElement,
      positioning: OverlayPositioning.BOTTOM_CENTER,
      stopEvent: false,
      offset: [0, -50]
    });
  }

  async onUpload(){
    this.markerLayer = new VectorSource({});
    if(this.url[0]){
      let wandh = await this.sizeCheck.getImageDimenstion(this.url[0]);
      this.extent[2] = wandh[0];
      this.extent[3] = wandh[1];
      this.projection.setExtent(this.extent);

      this.createLayers();

      this.map = new Map({
        interactions: defaultInteractions().extend([ new DragRotateAndZoom() ]),
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

      this.map.addOverlay(this.popup);

      this.map.on("singleclick", (event)=>{
        var lonLat = toLonLat(event.coordinate);
        if(this.placePin){
          this.addMarker(lonLat[0], lonLat[1]);
        } else {
          var feature = this.map.forEachFeatureAtPixel(event.pixel, feature => {return feature});
          if (feature) {
            let p = feature.getGeometry() as Point;
            let c = p.getCoordinates();
            this.popup.setPosition(c);
            $(this.element.nativeElement).popover({
              toggle: "popover",
              placement: 'top',
              html: true,
              content: feature.get('name')
            });
            $(this.element.nativeElement).popover('show');
          } else {
            $(this.element.nativeElement).popover('destroy');
          }
        }
      });
    }
  }

  addMarker(lon: any, lat: any): void {
    let iconFeature= undefined;

      if(this.pinStyleSerive.currentPin){
        this.pinStyleSerive.currentPin.subscribe((currentPin)=>{
          iconFeature = currentPin;
          iconFeature.setGeometry(new Point(transform([lon, lat], 'EPSG:4326', 'EPSG:3857')));
          this.markerLayer.addFeature(iconFeature);
        });
        if(!this.oneOff){
          this.pinStyleSerive.currentPin = undefined;
        }
      } else {
        iconFeature = new Feature({
          geometry: new Point(transform([lon, lat], 'EPSG:4326', 'EPSG:3857'))
        });
        this.markerLayer.addFeature(iconFeature);
      }
  }

  createLayers(): void{
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

    let vLayer = new VectorLayer({source: this.markerLayer, style: this.markerStyle});
    this.layers.push(vLayer); 
  }
}
