export type Roles = 'EMPLEADO' | 'ADMIN' | 'RRHH';

export interface User{
  id:number,
  id_persona: number,
  username:string;
  password: string;
  estado:number
}

export interface Estado{
  estado:number
}

export interface nwpass{
  password: string,
  id: string,
  message:string
}

export interface UserResponse{
  message: string;
  token: string;
  refreshToken: string;
  userId: number;
  username: string;
  role: Roles;
  subrol:number;
  id_persona: number;
  id_area:number;
}
