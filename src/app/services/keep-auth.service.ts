import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class KeepAuthService {
  private itemKey = 'auth';

  constructor(private localStorageService: LocalStorageService) {}

  save(token: string): void {
    this.localStorageService.setItem(this.itemKey, token);
  }

  restore(): string | null {
    return this.localStorageService.getItem(this.itemKey);
  }

  remove(): void {
    this.localStorageService.removeItem(this.itemKey);
  }
}
