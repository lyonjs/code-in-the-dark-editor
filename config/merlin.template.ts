import { TemplateInformations } from './templates';

export const MerlinTemplate: TemplateInformations = {
    eventId: 1,
    private: true,
    eventName: 'DevFest Nantes 2025',
    referenceImage: '/templates/merlin/merlin.jpg',
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

Background: ./templates/merlin/background.jpeg

Merlin: ./templates/merlin/merlin.svg

SVG Sparkles for Logo: 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>

--- Font ---

'Helvetica' is loaded

--- Colors ---
Background principal - #0f0b1f - opacity: 1
Bleu foncé - #1e3a8a - opacity: 0.70 (gradient) / 0.20 (badge) / 0.05 (glow)
Bleu marine - #1e40af - opacity: 1
Bleu royal - #1d4ed8 - opacity: 1
Cyan principal - #22d3ee - opacity: 0.80 (text) / 0.60 (stats)
Cyan clair - #67e8f9 - opacity: 0.70 (sous-titre) / 0.50 (border) / 0.30 (border stats) / 0.10 (hover/glow)
Violet magique - #a78bfa - opacity: 0.50 (gradient)
Bleu dégradé - #2563eb - opacity: 1
Indigo profond - #312e81 - opacity: 0.70 (gradient)
`,
    showPreview: true,
    demoMode: true,
};
