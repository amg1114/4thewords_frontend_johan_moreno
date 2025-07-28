import type { User, UserLogin, UserRegister } from '@models/user.interface';
import { createContext } from 'react';

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  logIn: (data: UserLogin) => Promise<void>;
  register: (data: UserRegister) => Promise<void>;
  logOut: () => void;
};
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
