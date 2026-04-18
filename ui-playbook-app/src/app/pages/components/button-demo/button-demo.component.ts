import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, DividerModule],
  template: `
    <div class="demo-page">
      <h2 class="page-title">Button Component</h2>
      <p class="page-desc">PrimeNG Button component with various styles, severities and states.</p>

      <p-card header="Variants">
        <div class="button-row">
          <p-button label="Filled"></p-button>
          <p-button label="Outlined" [outlined]="true"></p-button>
          <p-button label="Text" [text]="true"></p-button>
          <p-button label="Raised" [raised]="true"></p-button>
          <p-button label="Rounded" [rounded]="true"></p-button>
        </div>
        <pre class="code-snippet">{{ variantsCode }}</pre>
      </p-card>

      <p-divider></p-divider>

      <p-card header="Severities">
        <div class="button-row">
          <p-button label="Primary"></p-button>
          <p-button label="Secondary" severity="secondary"></p-button>
          <p-button label="Success" severity="success"></p-button>
          <p-button label="Info" severity="info"></p-button>
          <p-button label="Warning" severity="warn"></p-button>
          <p-button label="Danger" severity="danger"></p-button>
        </div>
        <pre class="code-snippet">{{ severitiesCode }}</pre>
      </p-card>

      <p-divider></p-divider>

      <p-card header="With Icons">
        <div class="button-row">
          <p-button label="Search" icon="pi pi-search"></p-button>
          <p-button label="Save" icon="pi pi-save" iconPos="right"></p-button>
          <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [text]="true"></p-button>
          <p-button icon="pi pi-plus" [rounded]="true"></p-button>
        </div>
        <pre class="code-snippet">{{ iconsCode }}</pre>
      </p-card>

      <p-divider></p-divider>

      <p-card header="Loading State">
        <div class="button-row">
          <p-button label="Loading..." [loading]="true"></p-button>
          <p-button label="Submit" [loading]="isLoading" (onClick)="simulateLoad()"></p-button>
        </div>
        <pre class="code-snippet">{{ loadingCode }}</pre>
      </p-card>

      <p-divider></p-divider>

      <p-card header="Button Group">
        <div class="p-buttonset">
          <p-button label="Save" icon="pi pi-check"></p-button>
          <p-button label="Delete" icon="pi pi-trash"></p-button>
          <p-button label="Cancel" icon="pi pi-times"></p-button>
        </div>
        <pre class="code-snippet">{{ groupCode }}</pre>
      </p-card>

      <p-divider></p-divider>

      <p-card header="Outlined Severities">
        <div class="button-row">
          <p-button label="Primary" [outlined]="true"></p-button>
          <p-button label="Secondary" severity="secondary" [outlined]="true"></p-button>
          <p-button label="Success" severity="success" [outlined]="true"></p-button>
          <p-button label="Info" severity="info" [outlined]="true"></p-button>
          <p-button label="Warning" severity="warn" [outlined]="true"></p-button>
          <p-button label="Danger" severity="danger" [outlined]="true"></p-button>
        </div>
      </p-card>
    </div>
  `,
  styles: [`
    .demo-page { padding: 1rem; }
    .page-title { margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 600; }
    .page-desc { margin-bottom: 1.5rem; color: var(--p-text-muted-color, #6b7280); }
    .button-row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 1rem; }
    .code-snippet { background: var(--p-surface-100, #f3f4f6); border-radius: 6px; padding: 1rem; font-size: 0.8rem; overflow-x: auto; white-space: pre-wrap; }
    :host ::ng-deep .p-card { margin-bottom: 1rem; }
  `]
})
export class ButtonDemoComponent {
  isLoading = false;

  variantsCode = `<p-button label="Filled"></p-button>
<p-button label="Outlined" [outlined]="true"></p-button>
<p-button label="Text" [text]="true"></p-button>
<p-button label="Raised" [raised]="true"></p-button>
<p-button label="Rounded" [rounded]="true"></p-button>`;

  severitiesCode = `<p-button label="Primary"></p-button>
<p-button label="Secondary" severity="secondary"></p-button>
<p-button label="Success" severity="success"></p-button>
<p-button label="Info" severity="info"></p-button>
<p-button label="Warning" severity="warn"></p-button>
<p-button label="Danger" severity="danger"></p-button>`;

  iconsCode = `<p-button label="Search" icon="pi pi-search"></p-button>
<p-button label="Save" icon="pi pi-save" iconPos="right"></p-button>
<p-button icon="pi pi-trash" severity="danger" [rounded]="true" [text]="true"></p-button>`;

  loadingCode = `<p-button label="Loading..." [loading]="true"></p-button>
<p-button label="Submit" [loading]="isLoading" (onClick)="simulateLoad()"></p-button>`;

  groupCode = `<div class="p-buttonset">
  <p-button label="Save" icon="pi pi-check"></p-button>
  <p-button label="Delete" icon="pi pi-trash"></p-button>
  <p-button label="Cancel" icon="pi pi-times"></p-button>
</div>`;

  simulateLoad(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 2000);
  }
}
