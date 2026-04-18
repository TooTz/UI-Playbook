import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabsModule } from 'primeng/tabs';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, MenuModule, TieredMenuModule, BreadcrumbModule, TabsModule, StepperModule, ButtonModule, DividerModule],
  template: `
    <div class="demo-page">
      <h2 class="page-title">Menu Components</h2>
      <p class="page-desc">PrimeNG navigation and menu components.</p>

      <div class="demo-grid">
        <p-card header="Menu">
          <p-menu [model]="menuItems"></p-menu>
        </p-card>

        <p-card header="TieredMenu">
          <p-tieredmenu [model]="tieredItems"></p-tieredmenu>
        </p-card>
      </div>

      <p-divider></p-divider>

      <p-card header="Breadcrumb">
        <p-breadcrumb [model]="breadcrumbItems" [home]="homeItem"></p-breadcrumb>
      </p-card>

      <p-divider></p-divider>

      <p-card header="Tabs (TabMenu style)">
        <p-tabs value="0">
          <p-tablist>
            <p-tab value="0">
              <span class="pi pi-home" style="margin-right:0.5rem"></span> Home
            </p-tab>
            <p-tab value="1">
              <span class="pi pi-calendar" style="margin-right:0.5rem"></span> Calendar
            </p-tab>
            <p-tab value="2">
              <span class="pi pi-cog" style="margin-right:0.5rem"></span> Settings
            </p-tab>
            <p-tab value="3">
              <span class="pi pi-users" style="margin-right:0.5rem"></span> Team
            </p-tab>
          </p-tablist>
          <p-tabpanels>
            <p-tabpanel value="0"><p>Home panel content</p></p-tabpanel>
            <p-tabpanel value="1"><p>Calendar panel content</p></p-tabpanel>
            <p-tabpanel value="2"><p>Settings panel content</p></p-tabpanel>
            <p-tabpanel value="3"><p>Team panel content</p></p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      </p-card>

      <p-divider></p-divider>

      <p-card header="Stepper">
        <p-stepper [value]="1">
          <p-step-list>
            <p-step [value]="1">Personal Info</p-step>
            <p-step [value]="2">Account</p-step>
            <p-step [value]="3">Review</p-step>
          </p-step-list>
          <p-step-panels>
            <p-step-panel [value]="1">
              <ng-template #content let-activateCallback="activateCallback">
                <p>Fill in your personal information.</p>
                <p-button label="Next" (onClick)="activateCallback(2)"></p-button>
              </ng-template>
            </p-step-panel>
            <p-step-panel [value]="2">
              <ng-template #content let-activateCallback="activateCallback">
                <p>Create your account credentials.</p>
                <div style="display:flex;gap:0.5rem">
                  <p-button label="Back" severity="secondary" (onClick)="activateCallback(1)"></p-button>
                  <p-button label="Next" (onClick)="activateCallback(3)"></p-button>
                </div>
              </ng-template>
            </p-step-panel>
            <p-step-panel [value]="3">
              <ng-template #content let-activateCallback="activateCallback">
                <p>Review and submit your information.</p>
                <div style="display:flex;gap:0.5rem">
                  <p-button label="Back" severity="secondary" (onClick)="activateCallback(2)"></p-button>
                  <p-button label="Submit" severity="success"></p-button>
                </div>
              </ng-template>
            </p-step-panel>
          </p-step-panels>
        </p-stepper>
      </p-card>
    </div>
  `,
  styles: [`
    .demo-page { padding: 1rem; }
    .page-title { margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 600; }
    .page-desc { margin-bottom: 1.5rem; color: var(--p-text-muted-color, #6b7280); }
    .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
    :host ::ng-deep .p-card { margin-bottom: 1rem; }
  `]
})
export class MenuDemoComponent implements OnInit {
  menuItems: MenuItem[] = [];
  tieredItems: MenuItem[] = [];
  breadcrumbItems: MenuItem[] = [];
  homeItem: MenuItem = { icon: 'pi pi-home', routerLink: '/dashboard' };

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Profile', icon: 'pi pi-user' },
      { label: 'Settings', icon: 'pi pi-cog' },
      { separator: true },
      { label: 'Logout', icon: 'pi pi-sign-out' }
    ];

    this.tieredItems = [
      { label: 'File', icon: 'pi pi-file', items: [
        { label: 'New', icon: 'pi pi-plus' },
        { label: 'Open', icon: 'pi pi-folder-open' },
        { label: 'Recent', icon: 'pi pi-clock', items: [
          { label: 'document1.txt' },
          { label: 'document2.txt' },
        ]},
        { separator: true },
        { label: 'Save', icon: 'pi pi-save' },
      ]},
      { label: 'Edit', icon: 'pi pi-pencil', items: [
        { label: 'Cut', icon: 'pi pi-times' },
        { label: 'Copy', icon: 'pi pi-copy' },
        { label: 'Paste', icon: 'pi pi-clipboard' },
      ]},
      { label: 'View', icon: 'pi pi-eye' },
      { separator: true },
      { label: 'Quit', icon: 'pi pi-power-off' },
    ];

    this.breadcrumbItems = [
      { label: 'Components' },
      { label: 'Navigation' },
      { label: 'Menu', styleClass: 'active' }
    ];
  }
}
