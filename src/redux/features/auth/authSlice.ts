import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = "superadmin" | "agent" | "vendor" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phoneNumber?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  role: typeof window !== "undefined" ? (localStorage.getItem("rajseba_user_role") as UserRole) || null : null,
  isAuthenticated: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (action.payload.role) {
        const roleString = typeof action.payload.role === 'object' ? (action.payload.role as any).name : action.payload.role;
        state.role = roleString as UserRole;
        if (typeof window !== "undefined") {
          localStorage.setItem("rajseba_user_role", roleString);
        }
      } else {
        state.role = "client";
        if (typeof window !== "undefined") {
          localStorage.setItem("rajseba_user_role", "client");
        }
      }
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("rajseba_user_role", action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("rajseba_user_role");
      }
    },
  },
});

export const { setUser, setRole, setLoading, logout } = authSlice.actions;

export default authSlice.reducer;

export const getRoleName = (r: UserRole | null): string => {
  switch (r) {
    case "superadmin":
      return "Super Admin";
    case "agent":
      return "Agent";
    case "vendor":
      return "Vendor";
    case "client":
      return "Client";
    default:
      return "User";
  }
};
