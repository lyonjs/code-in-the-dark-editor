import { DFDSTemplate } from './dfds.template';
import { TenderTemplate } from './tender.template';
import { FestivalTemplate } from './festival.template';
import { LyonJSTemplate } from './lyonjs.template';
import { DocsInBoxTemplate } from './docsinbox.template';
import { DontBoardMeTemplate } from './dontboardme.template';
import { LaGrowthMachineTemplate } from './lagrowthmachine.template';
import { MellemTemplate } from './mellem.template';
import { MomaTemplate } from './moma.template';
import { MomatuTemplate } from './momatu.template';
import { NationalParksTemplate } from './nationalparks.template';
import { SupernaTemplate } from './superna.template';
import { TheTurbineTemplate } from './theturbine.template';
import { WaveTemplate } from './wave.template';

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
  LYONJS = 'LYONJS',
  DOCSINBOX = 'DOCSINBOX',
  DONTBOARDME = 'DONTBOARDME',
  LAGROWTHMACHINE = 'LAGROWTHMACHINE',
  MELLEM = 'MELLEM',
  MOMA = 'MOMA',
  MOMATU = 'MOMATU',
  NATIONALPARKS = 'NATIONALPARKS',
  SUPERNA = 'SUPERNA',
  THETURBINE = 'THETURBINE',
  WAVE = 'WAVE'
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
  DOCSINBOX: DocsInBoxTemplate,
  DONTBOARDME: DontBoardMeTemplate,
  LAGROWTHMACHINE: LaGrowthMachineTemplate,
  MELLEM: MellemTemplate,
  MOMA: MomaTemplate,
  MOMATU: MomatuTemplate,
  NATIONALPARKS: NationalParksTemplate,
  SUPERNA: SupernaTemplate,
  THETURBINE: TheTurbineTemplate,
  WAVE: WaveTemplate,
};
