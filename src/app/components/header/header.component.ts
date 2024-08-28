import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';

import { TOAST_KEY } from '../../services/toast.service';
import { KeepAuthService } from '../../services/keep-auth.service';
import { AuthActions, AuthSelectors } from '../../store';

enum AccessLevels {
  Permanent = -1,
  Guest = 0,
  User = 1,
  Manager = 11,
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ToastModule,
    RouterModule,
    AsyncPipe,
    MenubarModule,
    TabMenuModule,
    RippleModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly toastKey = TOAST_KEY;

  isAuthenticated$: Observable<boolean>;

  isManager$: Observable<boolean>;

  accessLevel$: Observable<AccessLevels>;

  items: MenuItem[] | undefined;

  itemsAdmin: MenuItem[] | undefined;

  activeAdminItem: MenuItem | undefined;

  isMenuOpen = false;

  private isCurrentRouteAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );

  isAdminMenuActive$: Observable<boolean>;

  static readonly AccessLevel = AccessLevels;

  constructor(
    private keepAuth: KeepAuthService,
    private store: Store,
    private router: Router,
  ) {
    const token = this.keepAuth.restore();
    if (token) {
      store.dispatch(AuthActions.signInSuccess({ token }));
    }

    this.isAuthenticated$ = this.store.select(
      AuthSelectors.selectIsAuthenticated,
    );
    this.isManager$ = this.store.select(AuthSelectors.selectIsManager);

    this.accessLevel$ = this.isAuthenticated$.pipe(
      combineLatestWith(this.isManager$),
      map(([user, manager]) => {
        const num1 = user ? 1 : 0;
        const num2 = manager ? 10 : 0;
        return num1 + num2;
      }),
    );

    this.isAdminMenuActive$ = this.isCurrentRouteAdmin$.pipe(
      combineLatestWith(this.isManager$),
      map(([isAdminRoute, isManager]) => {
        return isAdminRoute && isManager;
      }),
    );

    router.events.forEach((e) => {
      if (e instanceof NavigationEnd) {
        this.isCurrentRouteAdmin$.next(router.url.startsWith('/admin'));
      }
    });
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-search',
        route: '/',
        routerLinkActiveOptions: { exact: true },
        accessLevel: AccessLevels.Permanent,
      },
      {
        label: 'Sign In',
        icon: 'pi pi-sign-in',
        route: '/signin',
        routerLinkActiveOptions: {},
        accessLevel: AccessLevels.Guest,
      },
      {
        label: 'Sign Up',
        icon: 'pi pi-user-plus',
        route: '/signup',
        routerLinkActiveOptions: {},
        accessLevel: AccessLevels.Guest,
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        route: '/profile',
        routerLinkActiveOptions: {},
        accessLevel: AccessLevels.User,
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        route: '/profile',
        routerLinkActiveOptions: {},
        accessLevel: AccessLevels.Manager,
      },
      {
        label: 'Orders',
        icon: 'pi pi-ticket',
        route: '/orders',
        routerLinkActiveOptions: {},
        accessLevel: AccessLevels.Manager,
      },
      {
        label: 'My Orders',
        icon: 'pi pi-shopping-cart',
        route: '/orders',
        routerLinkActiveOptions: {},
        accessLevel: AccessLevels.User,
      },
      {
        label: 'Admin',
        icon: 'pi pi-wrench',
        route: '/admin',
        routerLinkActiveOptions: {},
        accessLevel: AccessLevels.Manager,
      },
      {
        label: 'Test',
        icon: 'pi pi-cog',
        route: '/test',
        routerLinkActiveOptions: {},
        accessLevel: AccessLevels.Permanent,
      },
    ];

    this.itemsAdmin = [
      {
        label: 'Stations',
        icon: 'pi pi-map-marker',
        route: '/admin/stations',
      },
      {
        label: 'Carriages',
        icon: 'pi pi-objects-column',
        route: '/admin/carriages',
      },
      {
        label: 'Routes',
        icon: 'pi pi-map',
        route: '/admin/routes',
      },
    ];

    [this.activeAdminItem] = this.itemsAdmin;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
