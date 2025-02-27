export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'INSPECTOR' | 'APPLICANT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {

  user: User | null;

  token: string | null;

  isLoading: boolean;

  login: (email: string, password: string) => Promise<User>;

  register: (name: string, email: string, password: string) => Promise<User>;

  logout: () => void;

  // getRolePath: (role: string) => string;

}
