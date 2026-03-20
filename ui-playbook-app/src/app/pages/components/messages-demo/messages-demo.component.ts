import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { MessageService, ToastMessageOptions } from 'primeng/api';

@Component({
  selector: 'app-messages-demo',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, MessagesModule, MessageModule, ToastModule, DividerModule],
  providers: [MessageService],
  template: `
    <div class="demo-page">
      <h2 class="page-title">Messages & Notifications</h2>
      <p class="page-desc">PrimeNG Messages, inline Message, and Toast notification components.</p>

      <p-toast position="top-right"></p-toast>

      <p-card header="Inline Messages (p-messages)">
        <p-messages [(value)]="inlineMessages" [enableService]="false" [closable]="true"></p-messages>
        <div class="button-row" style="margin-top: 1rem">
          <p-button label="Add Success" severity="success" icon="pi pi-check" (onClick)="addMessage('success')"></p-button>
          <p-button label="Add Info" severity="info" icon="pi pi-info-circle" (onClick)="addMessage('info')"></p-button>
          <p-button label="Add Warning" severity="warn" icon="pi pi-exclamation-triangle" (onClick)="addMessage('warn')"></p-button>
          <p-button label="Add Error" severity="danger" icon="pi pi-times-circle" (onClick)="addMessage('error')"></p-button>
          <p-button label="Clear All" severity="secondary" icon="pi pi-trash" (onClick)="inlineMessages = []"></p-button>
        </div>
      </p-card>

      <p-divider></p-divider>

      <p-card header="Inline Message (p-message) - Single">
        <div class="message-list">
          <p-message severity="success" text="Your changes have been saved successfully."></p-message>
          <p-message severity="info" text="Your account will be updated in a few minutes."></p-message>
          <p-message severity="warn" text="Your subscription expires in 3 days."></p-message>
          <p-message severity="error" text="Failed to connect to the server. Please try again."></p-message>
        </div>
      </p-card>

      <p-divider></p-divider>

      <p-card header="Toast Notifications">
        <div class="button-row">
          <p-button label="Top Right" (onClick)="showToast('top-right')"></p-button>
          <p-button label="Bottom Left" severity="secondary" (onClick)="showToast('bottom-left')"></p-button>
          <p-button label="Sticky Toast" severity="info" (onClick)="showStickyToast()"></p-button>
          <p-button label="Multiple" severity="warn" (onClick)="showMultipleToasts()"></p-button>
        </div>
      </p-card>
    </div>
  `,
  styles: [`
    .demo-page { padding: 1rem; }
    .page-title { margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 600; }
    .page-desc { margin-bottom: 1.5rem; color: var(--p-text-muted-color, #6b7280); }
    .button-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .message-list { display: flex; flex-direction: column; gap: 0.75rem; }
    :host ::ng-deep .p-card { margin-bottom: 1rem; }
  `]
})
export class MessagesDemoComponent {
  inlineMessages: ToastMessageOptions[] = [
    { severity: 'info', summary: 'Info', detail: 'Welcome to the messages demo.' }
  ];

  constructor(private msgService: MessageService) {}

  addMessage(severity: string): void {
    const texts: Record<string, { summary: string; detail: string }> = {
      success: { summary: 'Success', detail: 'Operation completed successfully.' },
      info: { summary: 'Info', detail: 'Here is some information for you.' },
      warn: { summary: 'Warning', detail: 'Please pay attention to this warning.' },
      error: { summary: 'Error', detail: 'An error occurred. Please try again.' },
    };
    this.inlineMessages = [...this.inlineMessages, { severity, ...texts[severity] }];
  }

  showToast(position: string): void {
    this.msgService.add({ severity: 'info', summary: 'Toast', detail: `Toast at ${position}`, life: 3000 });
  }

  showStickyToast(): void {
    this.msgService.add({ severity: 'warn', summary: 'Sticky', detail: 'This toast stays until closed.', sticky: true });
  }

  showMultipleToasts(): void {
    this.msgService.addAll([
      { severity: 'success', summary: 'First', detail: 'First message', life: 3000 },
      { severity: 'info', summary: 'Second', detail: 'Second message', life: 3000 },
      { severity: 'warn', summary: 'Third', detail: 'Third message', life: 3000 },
    ]);
  }
}
