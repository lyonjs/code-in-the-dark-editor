import { DefaultTemplate } from './default.template';

export interface TemplateInformations {
  eventId: number;
  eventName: string;
  referenceImage: string;
  instructions: string;
  injectCode: string;
  showPreview: boolean;
  demoMode: boolean;
}

export enum TemplateName {
  DEFAULT = 'DEFAULT',
}

export type TemplateNameList = keyof typeof TemplateName;

export const templatesDictionary: Record<
  TemplateNameList,
  TemplateInformations
> = {
  DEFAULT: DefaultTemplate,
};
