import { DefaultTemplate } from './default.template';
import { TenderTemplate } from "./tender.template";

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
  TENDER = 'TENDER',
}

export type TemplateNameList = keyof typeof TemplateName;

export const templatesDictionary: Record<
  TemplateNameList,
  TemplateInformations
> = {
  DEFAULT: DefaultTemplate,
  TENDER: TenderTemplate
};
