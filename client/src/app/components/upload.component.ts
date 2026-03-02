import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-upload',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="card p-4 mb-4">
      <h3>Upload Identity Document</h3>
      <div class="mb-3">
        <input class="form-control" type="file" (change)="onFileSelected($event)" accept=".jpg,.png,.jpeg">
      </div>
      <button class="btn btn-primary" [disabled]="!selectedFile || isLoading" (click)="onUpload()">
        {{ isLoading ? 'Processing...' : 'Extract Data' }}
      </button>
      <div *ngIf="error" class="alert alert-danger mt-2">{{ error }}</div>
    </div>
  `
})
export class UploadComponent {
    selectedFile: File | null = null;
    isLoading = false;
    error = '';

    @Output() dataExtracted = new EventEmitter<any>();

    constructor(private apiService: ApiService) { }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        this.error = '';
    }

    onUpload() {
        if (!this.selectedFile) return;

        this.isLoading = true;
        this.apiService.extractData(this.selectedFile).subscribe({
            next: (res) => {
                this.isLoading = false;
                if (res.success) {
                    this.dataExtracted.emit(res.data);
                }
            },
            error: (err) => {
                this.isLoading = false;
                this.error = 'Failed to process document. Please try again.';
                console.error(err);
            }
        });
    }
}
