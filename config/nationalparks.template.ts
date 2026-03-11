import { TemplateInformations } from './templates';

export const NationalParksTemplate: TemplateInformations = {
  eventId: 1,
  eventName: 'Event Name',
  referenceImage: '/templates/national-parks/page.png',
  texts: [
    'Interesting fact: Daisetsuzan National Park is known for its beautiful alpine landscapes and hot springs',
    'A collection of world\'s national parks. From towering mountains to green forests and vast beaches, each park offers a set of unique landscapes and captivating activities. Go on a journey of discovery. Whether you\'re an avid hiker or simply love being surrounded by nature, there is something for everyone.',
  ],
  assets: [
    { path: '/templates/national-parks/globe.png' },
    { path: '/templates/national-parks/mountain.jpg' },
  ],
  showPreview: true,
  demoMode: true,
};
