export interface IJwtPayload {
  id: number;
  username: string;
  email: string;
  experiration?: Date;
}
