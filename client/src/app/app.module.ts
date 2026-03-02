import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload.component';
import { ReviewComponent } from './components/review.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    UploadComponent,
    ReviewComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
