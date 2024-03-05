import { atom } from 'recoil';

export const categoryState = atom<string>({
  key: 'categoryState',
  default: '',
});

export const resultState = atom<string>({
  key: 'reulstState',
  default: '',
});
