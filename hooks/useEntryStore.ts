import {
  TemplateInformations,
  TemplateNameList,
  templatesDictionary,
} from '../config/templates';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Entry {
  id?: number;
  template?: TemplateInformations;
  fullName?: string;
  html?: string;
  submitted?: boolean;
}

interface EntryStore {
  isSubmitted: boolean;
  isLoading: boolean;
  entry: Entry | null;
  updateId: (id: number) => void;
  updateFullName: (fullName: string) => void;
  updateTemplate: (template: TemplateInformations) => void;
  updateHtml: (html: string) => void;
  updateIsSubmitted: (submitted: boolean) => void;
  updateIsLoading: (isLoading: boolean) => void;
  clear: () => void;
}

export const useEntryStore = create<EntryStore>()(
  persist(
    (set, _) => ({
      isSubmitted: false,
      isLoading: false,
      entry: null,
      updateId: (id) => {
        set((state) => ({
          entry: {
            ...state.entry,
            id: id,
          },
        }));
      },
      updateFullName: (fullName: string) => {
        set((state) => ({
          entry: {
            ...state.entry,
            fullName: fullName,
          },
        }));
      },
      updateTemplate: (template: TemplateInformations) => {
        set((state) => ({
          entry: {
            ...state.entry,
            template: template,
          },
        }));
      },
      updateHtml: (html: string) => {
        set((state) => ({
          entry: {
            ...state.entry,
            html: html,
          },
        }));
      },
      updateIsLoading: (value: boolean) => {
        set((_) => ({
          isLoading: value,
        }));
      },
      updateIsSubmitted: (value: boolean) => {
        set((_) => ({
          isSubmitted: value,
        }));
      },
      clear: () => {
        set((_) => ({
          entry: null,
        }));
      },
    }),
    {
      name: 'entry',
      skipHydration: true,
    }
  )
);
