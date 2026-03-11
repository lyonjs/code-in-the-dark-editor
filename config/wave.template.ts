import { TemplateInformations } from './templates';

export const WaveTemplate: TemplateInformations = {
  eventId: 1,
  eventName: 'Event Name',
  referenceImage: '/templates/wave/page.png',
  texts: [
    'An effective, fast, and reliable way to make sense of raw transaction data received from banks, all in one single product.',
    'The choice of 150+ financial companies, banks and fintech unicorns.',
  ],
  assets: [
    { path: '/templates/wave/wave_logo.png' },
    { path: '/templates/wave/pie_picture.png' },
    { path: '/templates/wave/bar_picture.png' },
    { path: '/templates/wave/moneylion_logo.png' },
    { path: '/templates/wave/dave_logo.png' },
    { path: '/templates/wave/monzo_logo.png' },
    { path: '/templates/wave/vala_logo.png' },
    { path: '/templates/wave/digit_logo.png' },
    { path: '/templates/wave/sofi_logo.png' },
  ],
  colors: ['#efe8e0', '#003e42'],
  showPreview: true,
  demoMode: true,
};
