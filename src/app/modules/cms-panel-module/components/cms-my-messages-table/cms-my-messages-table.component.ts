/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-my-messages-table.component.ts
 * Last modified | Ostatnia modyfikacja: 06/06/2022, 05:56
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BasicDataSortBy } from '../../types/basic-data-sort-by.types';
import { ApiConfigurerHelper } from '../../../../utils/api-configurer.helper';
import { CmsPaginationDataModel, CmsSingleUserMessageDataModel } from '../../models/cms-pagination-data.model';

import * as NgrxAction_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.actions';
import * as NgrxSelector_NAV from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';
import { ListNavigationsReducerType } from '../../ngrx-store/list-navigations-ngrx-store/list-navigations.selectors';
import { PaginationNavSender } from '../../ngrx-store/list-navigations-ngrx-store/ngrx-models/pagination-nav-sender.model';

import { CmsGetTablesConnectorService } from '../../services/cms-get-tables-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie tabeli wiadomości konkretnego użytkownika.
 */

@Component({
    selector: 'app-cms-my-messages-table',
    templateUrl: './cms-my-messages-table.component.html',
    styleUrls: [],
    providers: [ CmsGetTablesConnectorService ],
})
export class CmsMyMessagesTableComponent implements OnInit, OnDestroy {

    public _myMessagesPagination?: CmsPaginationDataModel<CmsSingleUserMessageDataModel>;
    public _myMessagesSortBy: typeof BasicDataSortBy = BasicDataSortBy;

    public _deleteMyMessages: Array<number> = new Array<number>();
    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<ListNavigationsReducerType>,
        public _endpoints: ApiConfigurerHelper,
        private _serviceGET: CmsGetTablesConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store.dispatch(NgrxAction_NAV.__insertBaseListNavigations());
        this._store.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            takeUntil(this._unsubscribe),
            select(NgrxSelector_NAV.sel_combinedNavData)
        ).subscribe(data => {
            if (data.pageSize !== 1) {
                this._serviceGET
                    .getAllUserMessagesBaseClaims(new PaginationNavSender(data))
                    .pipe(takeUntil(this._unsubscribe))
                    .subscribe(filteredPagination => this._myMessagesPagination = filteredPagination);
            }
        });
    };

    public emitDeleteArrayValues(deletedValues: Array<number>): void {
        this._deleteMyMessages = deletedValues;
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };
}