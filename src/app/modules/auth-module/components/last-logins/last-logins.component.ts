/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: last-logins.component.ts
 * Last modified | Ostatnia modyfikacja: 21/04/2022, 22:59
 * Project name | Nazwa Projektu: angular-po-schedule-management-client
 *
 * Klient | Client: <https://github.com/Milosz08/Angular_PO_Schedule_Management_Client>
 * Serwer | Server: <https://github.com/Milosz08/ASP.NET_PO_Schedule_Management_Server>
 *
 * Client for the ASP.NET Core application to manage schedule for sample university. Written with the Angular Framework
 * for generating dynamic web applications. Project for the teaching course "Objected Oriented Programming".
 *
 * Klient dla aplikacji ASP.NET Core służącej do zarządzania planem zajęć uczelni. Napisany przy użyciu frameworka
 * Angular do generowania dynamicznych aplikacji webowych. Projekt wykonany na zajęcia "Programowanie
 * Obiektowe".
 */

import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { getAllSavedAccounts } from '../../../../ngrx-store/session-ngrx-store/session.selectors';
import { InitialSessionStateTypes } from '../../../../ngrx-store/session-ngrx-store/session.initial';
import { RememberAccountModel } from '../../../../ngrx-store/session-ngrx-store/ngrx-models/remember-account.model';

import {
    removeAllSavedAccounts, removeSingleSavedAccount, userSetAutoFilledEmail
} from '../../../../ngrx-store/session-ngrx-store/session.actions';
import { UserIdentityModel } from '../../../../ngrx-store/session-ngrx-store/ngrx-models/user-identity.model';

/**
 *
 */

@Component({
    selector: 'app-last-logins',
    templateUrl: './last-logins.component.html',
    styleUrls: [ './last-logins.component.scss' ]
})
export class LastLoginsComponent {

    public _getAllSavedAccounts$: Observable<Array<RememberAccountModel>> = this._store.select(getAllSavedAccounts);

    public constructor(
        private _store: Store<InitialSessionStateTypes>,
    ) {
    };

    public handleRemoveAllSavedAccounts(): void {
        this._getAllSavedAccounts$.subscribe(savedAccounts => {
            if (savedAccounts.length > 0) {
                this._store.dispatch(removeAllSavedAccounts());
            }
        }).unsubscribe();
    };

    public handleRemoveSelectedSavedAccount(userId: string): void {
        this._store.dispatch(removeSingleSavedAccount({ userId }));
    };

    public handleAutoFilledLoginFormElement(emailValue: string): void {
        this._store.dispatch(userSetAutoFilledEmail({ emailValue }));
    };

    public createUserIdentity(nameAndSurname: string): string {
        const [ name, surname ] = nameAndSurname.split(' ');
        return name.charAt(0) + surname.charAt(0);
    };

    public createUserRoleSingleLetter(role: UserIdentityModel): { letter: string, class: string } {
        switch(role) {
            case 'ADMINISTRATOR':   return { letter: 'a', class: 'role-dot--administrator' };
            case 'EDITOR':          return { letter: 'e', class: 'role-dot--editor' };
            case 'TEACHER':         return { letter: 't', class: 'role-dot--teacher' };
            default:                return { letter: 's', class: 'role-dot--student' };
        }
    };

    public createUserInfoOnHover(user: RememberAccountModel): string {
        return `Użytkownik: ${user.nameWithSurname}\nAdres email: ${user.email}`;
    };
}