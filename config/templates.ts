import {ModeTemplate} from "./mode.template";
import {CityTemplate} from "./city.template";
import {CitdTemplate} from "./citd.template";

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
  MODE= 'MODE',
  CITY = 'CITY',
  CITD = 'CITD',
}

export type TemplateNameList = keyof typeof TemplateName;

export const templatesDictionary: Record<
  TemplateNameList,
  TemplateInformations
> = {
  MODE: ModeTemplate,
  CITY: CityTemplate,
  CITD: CitdTemplate
};
