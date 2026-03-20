import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ThemeService, ThemeName } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, SelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UI Playbook';

  themes: { label: string; value: ThemeName }[] = [
    { label: 'Aura', value: 'Aura' },
    { label: 'Material', value: 'Material' },
    { label: 'Lara', value: 'Lara' },
  ];

  selectedTheme: ThemeName = 'Aura';

  constructor(private themeService: ThemeService) {}

  onThemeChange(theme: ThemeName): void {
    this.themeService.setTheme(theme);
  }
}

