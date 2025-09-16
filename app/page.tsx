'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEntryStore } from '../hooks/useEntryStore';
import React, { useEffect, useState } from 'react';
import { TemplateName, templatesDictionary } from "../config/templates";
import Image from 'next/image';

import styles from '../styles/register.module.scss';

export default function Page() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>(
    TemplateName.CITD
  );
  const { entry, updateFullName, updateId, updateIsLoading, updateTemplate } =
    useEntryStore();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { fullName: entry?.fullName, templateName: '' },
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
        <h1>Welcome to Code in the dark!</h1>
        <h3>Please state your name 👇🏼</h3>
        <input
          type='text'
          placeholder='Name'
          {...register('fullName', { required: true, max: 80, min: 5 })}
          className={formState.errors.fullName ? styles.isWizz : ''}
          required
        />
        <h3>Please set session code</h3>
        <input
          type='password'
          placeholder='Session Password'
          {...register('templateName', { required: true, max: 80 })}
          className={formState.errors.fullName ? styles.isWizz : ''}
          required
        />
        <input type='submit' className='button' />
      </form>
    </>
  );
}
