import { TemplateInformations } from './templates';

export const DFDSTemplate: TemplateInformations = {
  eventId: 1,
  eventName: 'Event Name',
  referenceImage: '/templates/dfds/page.png',
  assets: [
    { path: '/templates/dfds/DFDS-logo-positive.png', label: 'DFDS logo' },
    { path: '/templates/dfds/unroro-map.jpg', label: 'map' },
    { path: '/templates/dfds/col1-image.jpg', label: 'column 1 image' },
    { path: '/templates/dfds/col2-image.jpg', label: 'column 2 image' },
    { path: '/templates/dfds/col3-image.jpg', label: 'column 3 image' },
  ],
  colors: ['#58b9fe'],
  font: "'DFDS' is loaded",
  showPreview: true,
  demoMode: true,
};
