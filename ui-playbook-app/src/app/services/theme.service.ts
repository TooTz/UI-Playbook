import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import Lara from '@primeng/themes/lara';

export type ThemeName = 'Aura' | 'Material' | 'Lara';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PRESETS: Record<ThemeName, any> = { Aura, Material, Lara };

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentTheme$ = new BehaviorSubject<ThemeName>('Aura');
  readonly theme$ = this.currentTheme$.asObservable();

  get currentTheme(): ThemeName {
    return this.currentTheme$.value;
  }

  setTheme(name: ThemeName): void {
    usePreset(PRESETS[name]);
    this.currentTheme$.next(name);
  }
}

