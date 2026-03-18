import { TemplateInformations } from './templates';

export const PlayerTemplate: TemplateInformations = {
  eventId: 1,
  private: true,
  eventName: 'Player',
  referenceImage: '/templates/player/page.png',
  assets: [
    { path: '/templates/player/background.png' },
  ],
  texts: ['Southampton, 10 avril 1912. Le paquebot le plus grand et le plus moderne du monde, réputé pour son insubmersibilité, le "Titanic", appareille pour son premier voyage. Quatre jours plus tard, il heurte un iceberg. A son bord, un artiste pauvre et une grande bourgeoise tombent amoureux.'],
  colors: ['#121212', '#FD4D26', '#FFFFFF', '#CDCDCD'],
  font: 'Arial',
  showPreview: true,
  demoMode: true,
};
