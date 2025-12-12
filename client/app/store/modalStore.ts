import { create } from 'zustand';

import { ModalKey, ModalState } from '../types/store';

const initialState = {
  modals: { authModal: false, createSubModal: false },
};

export const useModalStore = create<ModalState>((set, get) => ({
  ...initialState,

  open: (key: ModalKey) =>
    set((prev) => ({ ...prev, modals: { ...prev.modals, [key]: true } })),

  close: (key: ModalKey) =>
    set((prev) => ({ ...prev, modals: { ...prev.modals, [key]: false } })),

  toggle: (key: ModalKey) =>
    set((prev) => ({
      ...prev,
      modals: { ...prev.modals, [key]: !get().modals[key] },
    })),
}));
