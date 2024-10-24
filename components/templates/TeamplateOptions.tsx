import useTemplates from '../../hooks/useTemplates';

export default function TemplatesList(): React.ReactNode {
  const { templates } = useTemplates();
  return (
    <>
      {templates.map(({ name, value }) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
    </>
  );
}
