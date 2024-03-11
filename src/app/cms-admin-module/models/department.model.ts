/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type DepartmentData = {
  id: number;
  isRemovable: boolean;
  name: string;
  alias: string;
};

export type AddUpdateDepartment = {
  name: string;
  alias: string;
};
