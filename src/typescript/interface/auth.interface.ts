export interface UserProfile {
  $id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  image?: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: UserProfile | null;
  role: string | null;
}

export interface AuthFormData {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
}