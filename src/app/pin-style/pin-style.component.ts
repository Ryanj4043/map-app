import { Component, OnInit } from '@angular/core';
import { PinStyleService} from "./pin-style.service"

@Component({
  selector: 'app-pin-style',
  templateUrl: './pin-style.component.html',
  styleUrls: ['./pin-style.component.css']
})
export class PinStyleComponent implements OnInit {

  public pinUrl: string;

  public locName: string;

  public locDes: string;

  public locOwner: string;

  constructor(private pinStyleSerive: PinStyleService) { }

  ngOnInit(): void {
  }

  createPin(): void{
    this.pinStyleSerive.createPin(this.locName, this.locDes, this.locOwner);
    this.pinStyleSerive.createStyle(this.pinUrl);
  }

}
