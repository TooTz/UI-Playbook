import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DialogModule, ConfirmDialogModule, ToastModule, DividerModule],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="demo-page">
      <h2 class="page-title">Dialog Components</h2>
      <p class="page-desc">PrimeNG Dialog, ConfirmDialog, and Toast overlays.</p>

      <p-toast></p-toast>
      <p-confirmdialog></p-confirmdialog>

      <p-card header="Basic Dialog">
        <div class="button-row">
          <p-button label="Open Dialog" icon="pi pi-external-link" (onClick)="showBasic = true"></p-button>
          <p-button label="Open Scrollable" icon="pi pi-external-link" severity="secondary" (onClick)="showScrollable = true"></p-button>
          <p-button label="Open Maximizable" icon="pi pi-external-link" severity="info" (onClick)="showMaximizable = true"></p-button>
        </div>
        <pre class="code-snippet">{{ basicDialogCode }}</pre>
      </p-card>

      <p-dialog header="Basic Dialog" [(visible)]="showBasic" [modal]="true" [style]="{ width: '450px' }">
        <p>This is a basic dialog. You can put any content here.</p>
        <ng-template pTemplate="footer">
          <p-button label="Close" icon="pi pi-times" [text]="true" (onClick)="showBasic = false"></p-button>
          <p-button label="Save" icon="pi pi-check" (onClick)="showBasic = false"></p-button>
        </ng-template>
      </p-dialog>

      <p-dialog header="Scrollable Dialog" [(visible)]="showScrollable" [modal]="true" [style]="{ width: '500px', height: '400px' }">
        <p *ngFor="let i of [1,2,3,4,5,6,7,8,9,10]">
          Scrollable content line {{ i }}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </p-dialog>

      <p-dialog header="Maximizable Dialog" [(visible)]="showMaximizable" [modal]="true" [maximizable]="true" [style]="{ width: '600px' }">
        <p>This dialog can be maximized using the button in the header.</p>
      </p-dialog>

      <p-divider></p-divider>

      <p-card header="Confirm Dialog">
        <div class="button-row">
          <p-button label="Confirm Delete" icon="pi pi-trash" severity="danger" (onClick)="confirmDelete()"></p-button>
          <p-button label="Confirm Save" icon="pi pi-save" severity="success" (onClick)="confirmSave()"></p-button>
        </div>
        <pre class="code-snippet">{{ confirmCode }}</pre>
      </p-card>

      <p-divider></p-divider>

      <p-card header="Toast Notifications">
        <div class="button-row">
          <p-button label="Success" icon="pi pi-check" severity="success" (onClick)="showToast('success')"></p-button>
          <p-button label="Info" icon="pi pi-info-circle" severity="info" (onClick)="showToast('info')"></p-button>
          <p-button label="Warning" icon="pi pi-exclamation-triangle" severity="warn" (onClick)="showToast('warn')"></p-button>
          <p-button label="Error" icon="pi pi-times-circle" severity="danger" (onClick)="showToast('error')"></p-button>
        </div>
        <pre class="code-snippet">{{ toastCode }}</pre>
      </p-card>
    </div>
  `,
  styles: [`
    .demo-page { padding: 1rem; }
    .page-title { margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 600; }
    .page-desc { margin-bottom: 1.5rem; color: var(--p-text-muted-color, #6b7280); }
    .button-row { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; }
    .code-snippet { background: var(--p-surface-100, #f3f4f6); border-radius: 6px; padding: 1rem; font-size: 0.8rem; overflow-x: auto; white-space: pre-wrap; }
    :host ::ng-deep .p-card { margin-bottom: 1rem; }
  `]
})
export class DialogDemoComponent {
  showBasic = false;
  showScrollable = false;
  showMaximizable = false;

  constructor(private confirmService: ConfirmationService, private msgService: MessageService) {}

  confirmDelete(): void {
    this.confirmService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.msgService.add({ severity: 'success', summary: 'Deleted', detail: 'Record deleted successfully' }),
      reject: () => this.msgService.add({ severity: 'info', summary: 'Cancelled', detail: 'Delete cancelled' })
    });
  }

  confirmSave(): void {
    this.confirmService.confirm({
      message: 'Do you want to save the changes?',
      header: 'Confirm Save',
      icon: 'pi pi-save',
      accept: () => this.msgService.add({ severity: 'success', summary: 'Saved', detail: 'Changes saved successfully' }),
    });
  }

  showToast(severity: string): void {
    const map: Record<string, { summary: string; detail: string }> = {
      success: { summary: 'Success', detail: 'Operation completed successfully!' },
      info: { summary: 'Information', detail: 'Here is some useful information.' },
      warn: { summary: 'Warning', detail: 'Please review this warning.' },
      error: { summary: 'Error', detail: 'An error has occurred.' },
    };
    const msg = map[severity];
    this.msgService.add({ severity, ...msg });
  }

  basicDialogCode = `<p-button label="Open" (onClick)="visible = true"></p-button>
<p-dialog header="Title" [(visible)]="visible" [modal]="true">
  <p>Dialog content here</p>
  <ng-template pTemplate="footer">
    <p-button label="Close" (onClick)="visible = false"></p-button>
  </ng-template>
</p-dialog>`;

  confirmCode = `confirmDelete() {
  this.confirmService.confirm({
    message: 'Are you sure?',
    header: 'Confirm',
    accept: () => { /* handle accept */ }
  });
}`;

  toastCode = `this.messageService.add({
  severity: 'success',
  summary: 'Success',
  detail: 'Operation completed!'
});`;
}
