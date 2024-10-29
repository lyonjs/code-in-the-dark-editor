'use client';
import StartForm from '../../components/forms/StartForm';
import { useFetchTemplates } from '../../hooks/useFetchTemplates';

export default function Page() {
  const { templates = [] } = useFetchTemplates();
  return <StartForm templates={templates}></StartForm>;
}
