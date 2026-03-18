import {
  TemplateNameList,
  templatesDictionary,
} from '../config/templates';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Entry {
  id?: number;
  templateName?: TemplateNameList;
  fullName?: string;
  html?: string;
  submitted?: boolean;
}

interface EntryStore {
  hydrated: boolean;
  isSubmitted: boolean;
  isLoading: boolean;
  entry: Entry | null;
  updateId: (id: number) => void;
  updateFullName: (fullName: string) => void;
  updateTemplate: (reference: TemplateNameList) => void;
  updateHtml: (html: string) => void;
  updateIsSubmitted: (submitted: boolean) => void;
  updateIsLoading: (isLoading: boolean) => void;
  clear: () => void;
}

export const useEntryStore = create<EntryStore>()(
  persist(
    (set, _) => ({
      hydrated: false,
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
      updateTemplate: (templateName: TemplateNameList) => {
        set((state) => ({
          entry: {
            ...state.entry,
            templateName,
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
      version: 1,
      onRehydrateStorage: () => (state) => {
        state?.hydrated !== undefined && useEntryStore.setState({ hydrated: true });
      },
      partialize: (state) => ({
        isSubmitted: state.isSubmitted,
        entry: state.entry,
      }),
      migrate: (persisted: any) => {
        const state = persisted as EntryStore;
        if (state?.entry && 'template' in state.entry) {
          const { template, ...rest } = state.entry as any;
          const name = template?.eventName
            ? (Object.keys(templatesDictionary) as TemplateNameList[]).find(
                (k) => templatesDictionary[k].eventName === template.eventName
              )
            : undefined;
          state.entry = { ...rest, templateName: name };
        }
        return state;
      },
    }
  )
);
