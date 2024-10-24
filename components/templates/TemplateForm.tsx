'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TemplateInformations } from '../../config/templates';
import { useEntryStore } from '../../hooks/useEntryStore';

import styles from '../../styles/register.module.scss';
import useSWR from 'swr';
import fetchTemplates from '../../actions/fetchTemplates';

export default function TemplateForm({
  templates: newTemplates,
}: {
  templates: TemplateInformations[];
}) {
  const { data: templates = newTemplates } = useSWR(
    'templates',
    async () => {
      return await fetchTemplates();
    },
    {
      refreshInterval: 2000,
    }
  );

  const router = useRouter();
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const { entry, updateFullName, updateId, updateIsLoading, updateTemplate } =
    useEntryStore();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { fullName: entry?.fullName, templateName: entry?.template },
  });
  useEffect(() => {
    if (entry?.id) {
      router.push('/editor');
    }
  }, [router, entry?.id]);

  const onSubmit = async (data: { [x: string]: any }) => {
    updateIsLoading(true);
    updateFullName(data.fullName);
    const selectedTemplate = templates.at(data.templateName);
    if (selectedTemplate) {
      updateTemplate(selectedTemplate);
    } else {
      throw new Error('No template found');
    }

    // TODO : Create user in DB

    updateId(0);
    updateIsLoading(false);

    router.push('/editor');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
        <h1>Welcome!</h1>
        <h3>Please state your name 👇🏼</h3>
        <input
          type='text'
          placeholder='Name'
          {...register('fullName', { required: true, max: 80, min: 5 })}
          className={formState.errors.fullName ? styles.isWizz : ''}
        />

        {templates.length === 0 ? (
          <>Please wait...</>
        ) : (
          <>
            <label htmlFor='templateSelect'>Select a template:</label>
            <select
              id='templateSelect'
              value={selectedTemplateIndex}
              {...register('templateName', {
                required: true,
                onChange: (e) => setSelectedTemplateIndex(e.target.value),
              })}
            >
              {templates.map((value, index) => (
                <option key={value.eventId} value={index}>
                  {value.eventName}
                </option>
              ))}
            </select>
            {templates[selectedTemplateIndex] && (
              <Image
                priority
                src={templates[selectedTemplateIndex].referenceImage}
                alt='Image template reference'
                width={200}
                height={200}
              />
            )}
            <input type='submit' className='button' />
          </>
        )}
      </form>
    </>
  );
}
