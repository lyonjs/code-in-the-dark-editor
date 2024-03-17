'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEntryStore } from '../hooks/useEntryStore';
import React, { useEffect, useState } from 'react';
import { TemplateName } from '../config/templates';
import Image from 'next/image';

import styles from '../styles/register.module.scss';

export default function Page() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>(
    TemplateName.DEFAULT
  );
  const { entry, updateFullName, updateId, updateIsLoading, updateTemplate } =
    useEntryStore();
  const { register, handleSubmit } = useForm({
    defaultValues: { fullName: entry?.fullName, templateName: entry?.template },
  });

  const onSubmit = async (data: { [x: string]: any }) => {
    updateIsLoading(true);
    updateFullName(data.fullName);
    updateTemplate(data.templateName);

    // TODO : Create user in DB

    updateId(0);
    updateIsLoading(false);

    router.push('/editor');
  };

  useEffect(() => {
    if (entry?.id) {
      router.push('/editor');
    }
  }, [router, entry?.id]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
        <h1>Welcome!</h1>
        <h3>Please state your name 👇🏼</h3>
        <input
          type='text'
          placeholder='Name'
          {...register('fullName', { required: true, max: 80, min: 5 })}
        />

        <label htmlFor='templateSelect'>Select a template:</label>
        <select
          id='templateSelect'
          value={selectedTemplate}
          {...register('templateName', {
            required: true,
            onChange: (e) => setSelectedTemplate(e.target.value),
          })}
        >
          {Object.keys(TemplateName).map((template) => (
            <option
              key={template}
              value={TemplateName[template as keyof typeof TemplateName]}
            >
              {template}
            </option>
          ))}
        </select>
        <Image
          src='/page.png'
          alt='Image template reference'
          width={200}
          height={200}
        />
        <input type='submit' className='button' />
      </form>
    </>
  );
}
