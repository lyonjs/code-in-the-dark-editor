import { TemplateInformations } from './templates';

export const MomaTemplate: TemplateInformations = {
  eventId: 1,
  eventName: 'Event Name',
  referenceImage: '/templates/moma/page.png',
  instructions: `
--- The rules ---
1) No previews - of either results or assets!
2) Stay in this editor at all times
3) No measurement tools
4) Stop coding when the time's up
5) After the round is over, press "Finish" and follow the prompt instructions to see your results

Good luck and most important of all; have fun!

--- Images ---

./templates/moma/logo.png (138x44)
./templates/moma/sculpture.png (1302x1256)

--- Colors ---

Red: #f52937
Grey: #d9d9d9

--- Texts ---

We are exited to announce our new exhibition at the museum, which showcases a diverse range of artwork from local and international artists.

From abstract to reality: the evolution of modern art // Trace the evolution of modern art through masterpieces that have redefined the

The art of empathy: exploring emotional connections in contemporary art // Experience the power of art to inspire

Migrant voices: artistic responses to global migration // Experience the voice of those affected by global migration through art. This
`,
  showPreview: true,
  demoMode: true,
};
