import { atom } from 'recoil';
import { PlaceProps } from '@/components/map/SearchPlace';

export const currentLatState = atom<number>({
  key: 'currentLatState',
  default: 0,
});

export const currentLngState = atom<number>({
  key: 'currentLngState',
  default: 0,
});

export const keywordInputState = atom<string>({
  key: 'keyworkdInputState',
  default: '',
});

export const placeState = atom<PlaceProps[]>({
  key: 'placeState',
  default: [],
});

export const currentPageState = atom<number>({
  key: 'currentPageState',
  default: 1,
});
