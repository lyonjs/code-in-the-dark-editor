import { OnceUponACodeTemplate } from './onceUponACode.template';

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
  ONCE_UPON_A_CODE = 'ONCE_UPON_A_CODE',
}

export type TemplateNameList = keyof typeof TemplateName;

export const templatesDictionary: Record<
  TemplateNameList,
  TemplateInformations
> = {
  ONCE_UPON_A_CODE: OnceUponACodeTemplate,
};
