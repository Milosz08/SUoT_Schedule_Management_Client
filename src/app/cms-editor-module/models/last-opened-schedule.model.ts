/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type LastOpenedSchedule = {
  id: number;
  name: string;
  deptId: number;
  specId: number;
  groupId: number;
};

export type LastOpenedScheduleReqDto = {
  deptId: string | number;
  specId: string | number;
  groupId: string | number;
};

export type LastOpenedScheduleResDto = {
  deptId: string;
  specId: string;
  groupId: string;
};
