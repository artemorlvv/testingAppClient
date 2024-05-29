import { create } from "zustand";

const useStore = create((set) => ({
  isAuth: false,
  role: "USER",
  login: "",
  fullName: "",
  setIsAuth: (val) => set({ isAuth: val }),
  setRole: (role) => set({ role }),
  setLogin: (login) => set({ login }),
  setFullName: (fullName) => set({ fullName }),
}));

export { useStore };
