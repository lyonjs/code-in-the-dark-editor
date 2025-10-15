import { TemplateInformations } from './templates';

export const DragonTemplate: TemplateInformations = {
    eventId: 1,
    private: true,
    eventName: 'DevFest Nantes 2025',
    referenceImage: '/templates/dragon/dragon.jpg',
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

Background: https://citd.gdgnantes.com/templates/dragon/background.jpeg

Dragon: https://citd.gdgnantes.com/templates/dragon/dragon.svg

SVG Book Open for Logo: 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame-icon lucide-flame"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>

--- Font ---

'Helvetica' is loaded

--- Colors ---
background mask: #441306 - opacity: 0.40
Rouge sombre - #7c2d12 - opacity: 0.60 (gradient)
Orange moyen - #c2410c - opacity: 0.40 (gradient)
Rouge principal - #ef4444 - opacity: 0.80 (text) / 0.60 (stats) / 0.50 (border) / 0.30 (border badge) / 0.20 (badge/border stats) / 0.10 (hover/glow) / 0.05 (glow)
Orange accent - #ea580c - opacity: 0.70 (sous-titre) / 0.05 (glow)
`,
    showPreview: true,
    demoMode: true,
};
