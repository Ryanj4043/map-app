import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeCheckService {

  constructor() { }

  async getImageDimenstion(imgUrl: string): Promise<number[]> {
    let x = [];
    let image = new Image();
    image.src = imgUrl;
    return new Promise<number[]>((resolve, _reject) =>{
      image.onload = (event) =>{
        let  loadedImage = event.currentTarget as HTMLImageElement ;
        x.push(loadedImage.width);
        x.push(loadedImage.height);
        resolve(x)
      }
    });
  }
}
