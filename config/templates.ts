import { OnceUponACodeTemplate } from './onceUponACode.template';
import { TheDarkChapterOneTemplate } from './theDarkChapterOne.template';

export interface TemplateInformations {
  eventId: number;
  eventName: string;
  private?: boolean;
  referenceImage: string;
  instructions: string;
  injectCode?: string;
  showPreview: boolean;
  demoMode: boolean;
}

export enum TemplateName {
  ONCE_UPON_A_CODE = 'ONCE_UPON_A_CODE',
  DARK_CHAPTER = 'DARK_CHAPTER',
}

export type TemplateNameList = keyof typeof TemplateName;

export const templatesDictionary: Record<
  TemplateNameList,
  TemplateInformations
> = {
  ONCE_UPON_A_CODE: OnceUponACodeTemplate,
  DARK_CHAPTER: TheDarkChapterOneTemplate,
};
