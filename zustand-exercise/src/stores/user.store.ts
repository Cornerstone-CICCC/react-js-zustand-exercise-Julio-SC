import { create } from 'zustand';

type User = {
  firstname: string;
  lastname: string;
  age: number;
  hobbies: string[];
};

type UserStore = {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (index: number) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  deleteUser: (index) =>
    set((state) => ({
      users: state.users.filter((_, i) => i !== index),
    })),
}));
