import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserProfile, UserRole } from '../models/user.models';
import { LocalStorageService } from './local-storage.service';

interface UserData extends UserProfile {
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private itemKey = 'authUser';

  private isLogged$$ = new BehaviorSubject<boolean>(false);

  isLogged$ = this.isLogged$$.asObservable();

  private isManager$$ = new BehaviorSubject<boolean>(false);

  isManager$ = this.isManager$$.asObservable();

  private token$ = new BehaviorSubject<string>('No token');

  userToken$ = this.token$.asObservable();

  private profile$ = new BehaviorSubject<UserProfile | null>(null);

  userProfile$ = this.profile$.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const restoredUser = this.restoreUser();
    if (restoredUser) {
      this.setUser(restoredUser);
    }
  }

  login(profile: UserProfile, token: string) {
    const userData: UserData = { ...profile, token };
    this.saveUser(userData);
    this.setUser(userData);
  }

  logout(): void {
    this.setUser(null);
    this.localStorageService.removeItem(this.itemKey);
  }

  private setUser(userData: UserData | null) {
    this.isLogged$$.next(!userData === null);
    this.isManager$$.next(
      userData ? userData.role === UserRole.Manager : false,
    );
    this.token$.next(userData ? userData.token : 'No token');
    this.profile$.next(userData);
  }

  private saveUser(currentUser: UserData): void {
    const data = JSON.stringify(currentUser);
    this.localStorageService.setItem(this.itemKey, data);
  }

  private restoreUser(): UserData | null {
    const text = this.localStorageService.getItem(this.itemKey);
    return text ? JSON.parse(text) : null;
  }
}
