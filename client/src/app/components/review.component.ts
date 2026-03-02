import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card p-4" *ngIf="form">
      <h3>Review & Confirm Data</h3>
      <form [formGroup]="form">
        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" formControlName="fullName">
        </div>
        <div class="mb-3">
          <label class="form-label">Document Number</label>
          <input type="text" class="form-control" formControlName="documentNumber">
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">Date of Birth</label>
            <input type="text" class="form-control" formControlName="dateOfBirth">
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Issue Date</label>
            <input type="text" class="form-control" formControlName="issueDate">
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Expiry Date</label>
            <input type="text" class="form-control" formControlName="expiryDate">
            <div *ngIf="form.errors?.['invalidExpiry']" class="text-danger small">
              Expiry date must be after Issue date.
            </div>
          </div>
        </div>
        
        <div class="alert alert-info" *ngIf="confidence < 70">
           Warning: Low OCR Confidence ({{confidence | number:'1.0-0'}}%). Please verify carefully.
        </div>
        
        <div class="alert alert-success" *ngIf="confidence >= 80">
           <strong>Excellent!</strong> High OCR Confidence ({{confidence | number:'1.0-0'}}%). Data looks good.
        </div>
        
        <div class="alert alert-warning" *ngIf="confidence >= 70 && confidence < 80">
           OCR Confidence: {{confidence | number:'1.0-0'}}%. Please review fields.
        </div>

        <button class="btn btn-success" [disabled]="form.invalid" (click)="onSubmit()">Confirm Data</button>
      </form>
    </div>
  `
})
export class ReviewComponent implements OnChanges {
  @Input() data: any;
  form: FormGroup;
  confidence = 0;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{7}-\d$/)]],
      dateOfBirth: [''],
      issueDate: [''],
      expiryDate: ['']
    });
  }

  ngOnChanges() {
    if (this.data) {
      this.confidence = this.data.confidence || 0;
      this.form.patchValue(this.data);
    }
  }

  onSubmit() {
    alert('Data Confirmed: ' + JSON.stringify(this.form.value));
  }
}
