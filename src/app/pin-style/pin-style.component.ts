import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pin-style',
  templateUrl: './pin-style.component.html',
  styleUrls: ['./pin-style.component.css']
})
export class PinStyleComponent implements OnInit {

  public pinUrl: string;

  public locName: string;

  public locDes: string;

  constructor() { }

  ngOnInit(): void {
  }

}
