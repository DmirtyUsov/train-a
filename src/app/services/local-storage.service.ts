import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageId: string = 'GE2024';

  private makeStorageKey(key: string): string {
    return `${this.storageId}_${key}`;
  }

  setItem(key: string, value: string): void {
    const storageKey = this.makeStorageKey(key);
    localStorage.setItem(storageKey, value);
  }

  getItem(key: string): string | null {
    const storageKey = this.makeStorageKey(key);
    return localStorage.getItem(storageKey);
  }

  removeItem(key: string): void {
    const storageKey = this.makeStorageKey(key);
    localStorage.removeItem(storageKey);
  }
}
