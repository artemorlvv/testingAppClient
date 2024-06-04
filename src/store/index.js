import { create } from "zustand";

const useStore = create((set) => ({
  isAuth: false,
  role: "USER",
  login: "",
  fullName: "",
  selectedOptions: {},
  clearSelectedOptions: () => set({ selectedOptions: {} }),
  setRadioSelectedOption: (question_id, option_id) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        [question_id]: option_id,
      },
    })),
  setCheckboxSelectedOption: (question_id, option_id) =>
    set((state) => {
      const currentOptions = state.selectedOptions[question_id] || [];
      const newOptions = currentOptions.includes(option_id)
        ? currentOptions.filter((id) => id !== option_id)
        : [...currentOptions, option_id];

      return {
        selectedOptions: {
          ...state.selectedOptions,
          [question_id]: newOptions,
        },
      };
    }),
  setIsAuth: (val) => set({ isAuth: val }),
  setRole: (role) => set({ role }),
  setLogin: (login) => set({ login }),
  setFullName: (fullName) => set({ fullName }),
}));

export { useStore };
