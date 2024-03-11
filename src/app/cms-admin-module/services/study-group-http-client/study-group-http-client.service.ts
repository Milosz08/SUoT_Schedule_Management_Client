/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AddUpdateStudyGroupRequest,
  AddUpdateStudyGroupResponse,
  StudyGroupData,
} from '~/cms-admin-module/models/study-group.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class StudyGroupHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getStudyGroups$(params: Params): Observable<Pagination<StudyGroupData>> {
    return this._httpClient.get<Pagination<StudyGroupData>>(
      `${this._apiUrl}/api/v1/studygroup/all/pageable`,
      { params }
    );
  }

  createNewStudyGroup$(
    req: AddUpdateStudyGroupRequest
  ): Observable<AddUpdateStudyGroupResponse> {
    return this._httpClient.post<AddUpdateStudyGroupResponse>(
      `${this._apiUrl}/api/v1/studygroup`,
      req
    );
  }
}
