import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OCR System';
  extractedData: any = null;

  onDataExtracted(data: any) {
    console.log('Data received:', data);
    this.extractedData = data;
  }
}
