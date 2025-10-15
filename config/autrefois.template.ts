import { TemplateInformations } from './templates';

export const AutrefoisTemplate: TemplateInformations = {
    eventId: 1,
    private: true,
    eventName: 'DevFest Nantes 2025',
    referenceImage: '/templates/autrefois/autrefois.jpg',
    instructions: `
--- The rules ---

1) No previews - of either results or assets!
2) Stay in this editor at all times
3) No measurement tools
4) Stop coding when the time's up
5) After the round is over, press "Finish"

Good luck and most important of all : have fun ! 🥳

--- Assets ---

⚠️ Remember to resize images with CSS if necessary 

Background: ./templates/autrefois/background.jpeg

Castle: ./templates/autrefois/castle.svg

SVG Book Open for Logo: 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>

--- Font ---

'Helvetica' is loaded

--- Colors ---

yellow: #ffb900;
orange: #f54a00;
border: #fe9a00; with opacity 30%
background: #2f0d68; with opacity 60%
pill: #ad46ff; with opacity 20%
pill-border: #c27aff; with opacity 30%
description: #fef3c6;
"collection": #e17100;
`,
    showPreview: true,
    demoMode: true,
};