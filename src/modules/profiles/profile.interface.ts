export interface IuserProfile {
  name: string;
  email: string;
  password: string;
  age?: number | null;
  is_acitve?: boolean | null;
}