import { TemplateInformations } from './templates';

export const MomaTemplate: TemplateInformations = {
  eventId: 1,
  eventName: 'Event Name',
  referenceImage: '/templates/moma/page.png',
  texts: [
    'We are exited to announce our new exhibition at the museum, which showcases a diverse range of artwork from local and international artists.',
    'From abstract to reality: the evolution of modern art // Trace the evolution of modern art through masterpieces that have redefined the',
    'The art of empathy: exploring emotional connections in contemporary art // Experience the power of art to inspire',
    'Migrant voices: artistic responses to global migration // Experience the voice of those affected by global migration through art. This',
  ],
  assets: [
    { path: '/templates/moma/logo.png' },
    { path: '/templates/moma/sculpture.png' },
  ],
  colors: ['#f52937', '#d9d9d9'],
  showPreview: true,
  demoMode: true,
};
