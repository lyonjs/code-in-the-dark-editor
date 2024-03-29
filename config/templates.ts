import { DFDSTemplate } from './dfds.template';
import { TenderTemplate } from './tender.template';
import { FestivalTemplate } from './festival.template';
import { LyonJSTemplate } from './lyonjs.template';

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
  DFDS = 'DFDS',
  TENDER = 'TENDER',
  FESTIVAL = 'FESTIVAL',
  LYONJS = 'LYONJS'
}

export type TemplateNameList = keyof typeof TemplateName;

export const templatesDictionary: Record<
  TemplateNameList,
  TemplateInformations
> = {
  DFDS: DFDSTemplate,
  TENDER: TenderTemplate,
  FESTIVAL: FestivalTemplate,
  LYONJS: LyonJSTemplate,
};
