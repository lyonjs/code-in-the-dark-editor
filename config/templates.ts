import { TheDarkChapterTemplate } from './theDarkChapter.template';

export interface TemplateInformations {
  eventId: number;
  eventName: string;
  referenceImage: string;
  instructions: string;
  injectCode?: string;
  showPreview: boolean;
  demoMode: boolean;
}

export enum TemplateName {
  THE_DARK_CHAPTER = 'THE_DARK_CHAPTER',
}

export type TemplateNameList = keyof typeof TemplateName;

export const templatesDictionary: Record<
  TemplateNameList,
  TemplateInformations
> = {
  THE_DARK_CHAPTER: TheDarkChapterTemplate,
};
