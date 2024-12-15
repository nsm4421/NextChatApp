import { atom, useAtom } from "jotai";

const initial = atom(false);

export const useCreateGroupModal = () => {
  return useAtom(initial);
};
