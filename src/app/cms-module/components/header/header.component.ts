/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';
import { DomService } from '~/cms-module/services/dom/dom.service';
import { IdentityService } from '~/shared-module/service/identity/identity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  loggedUserRole$ = this._identityService.loggedUserRole$;

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _domService: DomService
  ) {}

  handleToggleMenuVisibilitty(): void {
    this._domService.toggleMenuVisibility();
  }
}
