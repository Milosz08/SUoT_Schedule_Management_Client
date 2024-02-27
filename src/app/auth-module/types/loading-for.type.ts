/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type ResetPasswordLoader =
  | 'send_token'
  | 'validate_token'
  | 'changing_password'
  | 'none';
