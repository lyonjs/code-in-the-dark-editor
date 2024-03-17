import createStore from 'zustand';
import persist from '../lib/persist';
import {
  TemplateInformations,
  TemplateNameList,
  templatesDictionary,
} from '../config/templates';

interface Entry {
  id?: number;
  template?: TemplateInformations;
  fullName?: string;
  html?: string;
  submitted?: boolean;
}

interface EntrytStore {
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

export const useEntryStore = createStore<EntrytStore>(
  persist(
    {
      key: 'entry',
      denylist: ['isLoading'],
    },
    (set) => ({
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
        console.log(templateName);
        console.log(templatesDictionary[templateName]);
        set((state) => ({
          entry: {
            ...state.entry,
            template: templatesDictionary[templateName],
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
    })
  )
);
