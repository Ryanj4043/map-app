import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public noFiles: number = 0;
  public file: File;

  constructor() {   }

  ngOnInit(): void {
  }

  onFileChanged(event: any) {
    this.file = event.target.files[0]
    if(this.noFiles < 3){
      this.noFiles++
    }
  }

  onUpload(){
    if(this.file){
      
    }
  }

}
