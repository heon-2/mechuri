import { atom } from 'recoil';

export const currentLatState = atom<number>({
  key: 'currentLatState',
  default: 0,
});

export const currentLngState = atom<number>({
  key: 'currentLngState',
  default: 0,
});
