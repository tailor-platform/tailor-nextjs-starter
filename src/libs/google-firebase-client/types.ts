export type ErrorResponse = {
  error: string;
};

export type Session = {
  user_id: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type UserInfo = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
};