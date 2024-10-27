import { TemplateInformations } from '../../config/templates';

import { useFetchTemplates } from '../../hooks/useFetchTemplates';
import StartForm from './StartForm';

export default function CompetitionStartingForm({
  templates: newTemplates,
}: {
  templates: TemplateInformations[];
}) {
  const { templates = newTemplates } = useFetchTemplates();

  return <StartForm templates={templates} />;
}
