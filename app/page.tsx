import fetchTemplates from '../actions/fetchTemplates';
import TemplateForm from '../components/templates/TemplateForm';

export default async function Page() {
  const templates = await fetchTemplates();
  return <TemplateForm templates={templates}></TemplateForm>;
}
