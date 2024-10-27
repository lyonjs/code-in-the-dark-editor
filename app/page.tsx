import StartForm from '../components/forms/StartForm';
import { TemplateInformations, templatesDictionary } from '../config/templates';

export default async function Page() {
  const templates: TemplateInformations[] = Object.entries(
    templatesDictionary
  ).map(([key, value]) => ({
    ...value,
    eventName: key,
  }));
  return <StartForm templates={templates}></StartForm>;
}
