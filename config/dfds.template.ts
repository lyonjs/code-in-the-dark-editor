import { TemplateInformations } from './templates';

export const DFDSTemplate: TemplateInformations = {
  eventId: 1,
  eventName: 'Event Name',
  referenceImage: '/templates/dfds/page.png',
  instructions: `
--- The rules ---

1) No previews - of either results or assets!
2) Stay in this editor at all times
3) No measurement tools
4) Stop coding when the time's up
5) After the round is over, press "Finish"

Good luck and most important of all; have fun!

--- Assets ---

/templates/default/DFDS-logo-positive.png (2747×949) - DFDS logo
/templates/default/unroro-map.jpg (483×300) - map
/templates/default/col1-image.jpg (232×152) - column 1 image
/templates/default/col2-image.jpg (232×152) - column 2 image
/templates/default/col3-image.jpg (232×152) - column 3 image

Font: 'DFDS' is loaded
Light blue color: #58b9fe;
`,
  injectCode: `<link rel="stylesheet"  href="https://unpkg.com/@dfds-frontend/fonts@0.0.4/main/font.css"  />`,
  showPreview: true,
  demoMode: true,
};
