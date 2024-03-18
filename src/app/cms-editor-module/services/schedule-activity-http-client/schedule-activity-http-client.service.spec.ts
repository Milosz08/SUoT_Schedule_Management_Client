/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { CmsEditorModule } from '~/cms-editor-module/cms-editor.module';
import { ScheduleActivityHttpClientService } from './schedule-activity-http-client.service';

describe('ScheduleActivityHttpClientService', () => {
  let service: ScheduleActivityHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CmsEditorModule],
      providers: [ScheduleActivityHttpClientService],
    });
    service = TestBed.inject(ScheduleActivityHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
