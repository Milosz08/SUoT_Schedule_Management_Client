/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/app.module';
import { RootModule } from '~/root-module/root.module';
import { ScheduleNavigationService } from './schedule-navigation.service';

describe('ScheduleNavigationService', () => {
  let service: ScheduleNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RootModule],
      providers: [ScheduleNavigationService],
    });
    service = TestBed.inject(ScheduleNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
