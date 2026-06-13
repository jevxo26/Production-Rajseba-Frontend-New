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
        const rawRoleName = typeof action.payload.role === 'object' ? (action.payload.role as any).name : action.payload.role;
        const roleString = typeof rawRoleName === 'string' ? rawRoleName.toLowerCase().replace(/\s+/g, '') : "client";
        state.role = roleString as UserRole;
        if (typeof window !== "undefined") {
          localStorage.setItem("rajseba_user_role", roleString);
          const date = new Date();
          date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
          const expires = "; expires=" + date.toUTCString();
          document.cookie = `rajseba_user_role=${roleString}${expires}; path=/; SameSite=Lax`;
        }
      } else {
        state.role = "client";
        if (typeof window !== "undefined") {
          localStorage.setItem("rajseba_user_role", "client");
          const date = new Date();
          date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
          const expires = "; expires=" + date.toUTCString();
          document.cookie = `rajseba_user_role=client${expires}; path=/; SameSite=Lax`;
        }
      }
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("rajseba_user_role", action.payload);
        const date = new Date();
        date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
        const expires = "; expires=" + date.toUTCString();
        document.cookie = `rajseba_user_role=${action.payload}${expires}; path=/; SameSite=Lax`;
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
        localStorage.removeItem("token");
        localStorage.removeItem("rajseba_access_token");
        localStorage.removeItem("rajseba_refresh_token");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "rajseba_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "rajseba_refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "rajseba_user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.href = "/";
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
