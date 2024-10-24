import { TemplateName } from '../config/templates';

interface UseTemplateList {
  templates: {
    name: string;
    value: TemplateName;
  }[];
}

export default function useTemplates(): UseTemplateList {
  return {
    templates: Object.entries(TemplateName).map(([template, value]) => ({
      name: template,
      value,
    })),
  };
}
