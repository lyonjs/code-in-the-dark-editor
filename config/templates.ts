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
import { ModeTemplate } from './mode.template';
import { CityTemplate } from './city.template';
import { CitdTemplate } from './citd.template';
import { TheDarkChapterOneTemplate } from './theDarkChapterOne.template';
import { TheDarkChapterTwoTemplate } from './theDarkChapterTwo.template';
import { TheDarkChapterThreeTemplate } from './theDarkChapterThree.template';

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
  WAVE = 'WAVE',
  MODE = 'MODE',
  CITY = 'CITY',
  CITD = 'CITD',
  THE_DARK_CHAPTER_ONE = 'THE_DARK_CHAPTER_ONE',
  THE_DARK_CHAPTER_TWO = 'THE_DARK_CHAPTER_TWO',
  THE_DARK_CHAPTER_THREE = 'THE_DARK_CHAPTER_THREE',
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
  MODE: ModeTemplate,
  CITY: CityTemplate,
  CITD: CitdTemplate,
  THE_DARK_CHAPTER_ONE: TheDarkChapterOneTemplate,
  THE_DARK_CHAPTER_TWO: TheDarkChapterTwoTemplate,
  THE_DARK_CHAPTER_THREE: TheDarkChapterThreeTemplate,
};
