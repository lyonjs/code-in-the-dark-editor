import { TemplateInformations } from './templates';

export const HeroTemplate: TemplateInformations = {
  eventId: 1,
  private: true,
  eventName: 'Hero',
  referenceImage: '/templates/hero/page.png',
  assets: [
    { path: '/templates/hero/background.png' },
  ],
  texts: ['Ver de terre et trahisons, mais qui va s’asseoir sur le trône intergalactique ? Lisan-al-Gaib...'],
  colors: ['#0C0404', '#FD4D26'],
  font: 'Arial',
  showPreview: true,
  demoMode: true,
};
