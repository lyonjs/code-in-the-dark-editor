import { TemplateInformations } from './templates';

export const CatalogTemplate: TemplateInformations = {
  eventId: 1,
  private: true,
  eventName: 'Catalog',
  referenceImage: '/templates/catalog/page.png',
  assets: [
    { path: '/templates/catalog/dents_de_la_mer.jpeg' },
    { path: '/templates/catalog/dents_de_la_mer_affiche.jpeg' },
    { path: '/templates/catalog/forrest_gump.jpeg' },
    { path: '/templates/catalog/forrest_gump_affiche.jpeg' },
    { path: '/templates/catalog/grande_vadrouille.jpeg' },
    { path: '/templates/catalog/grande_vadrouille_affiche.jpeg' },
  ],
  colors: ['#FFFFFF', '#FD4D26', '#000000'],
  showPreview: true,
  demoMode: true,
};
