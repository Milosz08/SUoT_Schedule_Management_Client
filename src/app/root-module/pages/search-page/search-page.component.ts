/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchQueryRes } from '~/root-module/models/search-query.model';
import { SearchService } from '~/root-module/services/search/search.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  providers: [SearchService],
})
export class SearchPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  searchParamsForm: FormGroup;
  foundElements: SearchQueryRes[] = [];

  isFetching$ = this._searchService.isFetching$;

  constructor(private readonly _searchService: SearchService) {
    super();
    this.searchParamsForm = new FormGroup({
      searchQuery: new FormControl(''),
      ifGroupsActive: new FormControl(true),
      ifTeachersActive: new FormControl(true),
      ifRoomsActive: new FormControl(true),
    });
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._searchService.searchScheduleData$(this.searchParamsForm)
    ).subscribe(elements => {
      this.foundElements = elements;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleCheckedCheckboxParamsQuery(
    isChecked: boolean,
    controlName: string
  ): void {
    this.searchParamsForm.get(controlName)?.patchValue(!isChecked);
  }
}
