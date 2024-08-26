import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export const TOAST_KEY = 'app';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
      key: TOAST_KEY,
    });
  }

  info(detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail,
      key: TOAST_KEY,
    });
  }

  warn(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail,
      key: TOAST_KEY,
    });
  }

  error(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
      key: TOAST_KEY,
    });
  }
}
