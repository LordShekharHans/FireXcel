export interface LoginResponse {
  message: string;
  token: string;
  user: {
    userId: number;
    name: string;
    email: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
  };
  role: {
    roleId: number;
    roleName: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface RegisterResponse {
  message: string;
  token: string;
  newUser: {
    userId: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    updatedAt: string;
    createdAt: string;
  };
  userRole: {
    roleId: number;
    roleName: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  role?: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const ROLE_IDS = {
  SUPERADMIN: 1,
  ADMIN: 2,
  INSPECTOR: 3,
  APPLICANT: 4,
} as const;