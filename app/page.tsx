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
  const [isTrainningSession, setIsTrainningSession] = useState<boolean>(false);
  const { entry, updateFullName, updateId, updateIsLoading, updateTemplate } =
    useEntryStore();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { fullName: entry?.fullName, templateName: '' },
  });

  const onSubmit = async (data: { [x: string]: any }) => {
    updateIsLoading(true);
    updateFullName(data.fullName);
    updateTemplate(isTrainningSession ? selectedTemplate : data.templateName );

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
        <div className={styles.trainingToggle}>
          <input
            id='toggle-template-select'
            type='checkbox'
            checked={isTrainningSession}
            onChange={(e) => setIsTrainningSession(e.target.checked)}
          />
          <label htmlFor='toggle-template-select'>Check for training session</label>
        </div>

        {isTrainningSession ? (
          <>
            <h3>Select a template</h3>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value as TemplateName)}
            >
              {Object.keys(templatesDictionary).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <Image
              priority
              src={templatesDictionary[selectedTemplate].referenceImage}
              alt='Image template reference'
              width={200}
              height={200}
            />
          </>
        ) : (
          <>
            <h3>Please set session code</h3>
            <input
              type='text'
              placeholder='Session Password'
              {...register('templateName', { required: !isTrainningSession, max: 80 })}
              className={formState.errors.fullName ? styles.isWizz : ''}
              required={!isTrainningSession}
            />
          </>
        )}
        <input type='submit' className='button' />
      </form>
    </>
  );
}
