import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    CardModule, InputTextModule, SelectModule, DatePickerModule,
    CheckboxModule, RadioButtonModule, ToggleSwitchModule, SliderModule,
    RatingModule, InputNumberModule, ButtonModule, DividerModule, FloatLabelModule
  ],
  template: `
    <div class="demo-page">
      <h2 class="page-title">Form Components</h2>
      <p class="page-desc">PrimeNG form input components for building rich forms.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-grid">

          <p-card header="Text Inputs">
            <div class="field">
              <p-floatlabel>
                <input pInputText id="fullname" formControlName="fullName" />
                <label for="fullname">Full Name</label>
              </p-floatlabel>
            </div>
            <div class="field">
              <p-floatlabel>
                <input pInputText id="email" type="email" formControlName="email" />
                <label for="email">Email Address</label>
              </p-floatlabel>
            </div>
            <div class="field">
              <p-floatlabel>
                <p-inputnumber inputId="price" formControlName="price" mode="currency" currency="USD" />
                <label for="price">Price</label>
              </p-floatlabel>
            </div>
          </p-card>

          <p-card header="Select & Date">
            <div class="field">
              <p-floatlabel>
                <p-select id="role" [options]="roles" formControlName="role" placeholder="Select Role" styleClass="w-full" />
                <label for="role">Role</label>
              </p-floatlabel>
            </div>
            <div class="field">
              <p-floatlabel>
                <p-datepicker inputId="dob" formControlName="birthDate" dateFormat="mm/dd/yy" styleClass="w-full" />
                <label for="dob">Date of Birth</label>
              </p-floatlabel>
            </div>
          </p-card>

          <p-card header="Toggles & Checks">
            <div class="field field-row">
              <p-checkbox formControlName="agreeTerms" [binary]="true" inputId="terms" />
              <label for="terms">I agree to the Terms</label>
            </div>
            <div class="field">
              <label class="field-label">Notification Preference</label>
              <div class="radio-group">
                <div class="radio-item">
                  <p-radiobutton formControlName="notifications" value="email" inputId="email-notif" />
                  <label for="email-notif">Email</label>
                </div>
                <div class="radio-item">
                  <p-radiobutton formControlName="notifications" value="sms" inputId="sms-notif" />
                  <label for="sms-notif">SMS</label>
                </div>
                <div class="radio-item">
                  <p-radiobutton formControlName="notifications" value="none" inputId="none-notif" />
                  <label for="none-notif">None</label>
                </div>
              </div>
            </div>
            <div class="field field-row">
              <p-toggleswitch formControlName="darkMode" inputId="darkmode" />
              <label for="darkmode">Dark Mode</label>
            </div>
          </p-card>

          <p-card header="Slider & Rating">
            <div class="field">
              <label class="field-label">Satisfaction: {{ form.get('satisfaction')?.value }}</label>
              <p-slider formControlName="satisfaction" [min]="0" [max]="100" styleClass="w-full"></p-slider>
            </div>
            <div class="field">
              <label class="field-label">Rating</label>
              <p-rating formControlName="rating"></p-rating>
            </div>
          </p-card>

        </div>

        <div class="form-actions">
          <p-button label="Submit" type="submit" icon="pi pi-check"></p-button>
          <p-button label="Reset" type="button" severity="secondary" icon="pi pi-refresh" (onClick)="form.reset()"></p-button>
        </div>

        @if (submitted) {
          <p-card header="Form Values" styleClass="mt-4">
            <pre class="code-snippet">{{ form.value | json }}</pre>
          </p-card>
        }
      </form>
    </div>
  `,
  styles: [`
    .demo-page { padding: 1rem; }
    .page-title { margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 600; }
    .page-desc { margin-bottom: 1.5rem; color: var(--p-text-muted-color, #6b7280); }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
    .field { margin-bottom: 1.5rem; }
    .field-row { display: flex; align-items: center; gap: 0.5rem; }
    .field-label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
    .radio-group { display: flex; gap: 1.5rem; margin-top: 0.5rem; }
    .radio-item { display: flex; align-items: center; gap: 0.5rem; }
    .form-actions { display: flex; gap: 0.75rem; margin-top: 1rem; }
    .code-snippet { background: var(--p-surface-100, #f3f4f6); border-radius: 6px; padding: 1rem; font-size: 0.8rem; overflow-x: auto; }
    .mt-4 { margin-top: 1.5rem; }
    :host ::ng-deep .w-full { width: 100%; }
  `]
})
export class FormDemoComponent {
  submitted = false;

  roles = ['Admin', 'Developer', 'Designer', 'Manager', 'QA', 'DevOps'];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: [''],
      email: [''],
      price: [0],
      role: [null],
      birthDate: [null],
      agreeTerms: [false],
      notifications: ['email'],
      darkMode: [false],
      satisfaction: [50],
      rating: [3],
    });
  }

  onSubmit(): void {
    this.submitted = true;
  }
}
