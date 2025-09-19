'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEntryStore } from '../hooks/useEntryStore';
import React, { useEffect, useState } from 'react';
import { TemplateName, templatesDictionary } from '../config/templates';
import Image from 'next/image';

import styles from '../styles/register.module.scss';
import { Tabs } from 'radix-ui';
import slugify from 'slugify';

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
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: { [x: string]: any }) => {
    setError(null);
    if(!isTrainningSession) {
      const isValidTemplate = Object.keys(templatesDictionary).includes(data.templateName)
      if(!isValidTemplate) {
        return setError('Invalid template name');
      }
    }

    updateIsLoading(true);
    updateFullName(slugify(data.fullName, { lower: true, strict: true, trim: true }));
    updateTemplate(isTrainningSession ? selectedTemplate : data.templateName);
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
        <h3>Select a mode</h3>
        <Tabs.Root className={styles.tabsRoot} defaultValue='training' onValueChange={value => setIsTrainningSession(value === 'training')}>
          <Tabs.List
            className={styles.tabsList}
            aria-label='Manage your account'
          >
            <Tabs.Trigger className={styles.tabsTrigger} value='training'>
              <h3>Training Mode</h3>
            </Tabs.Trigger>
            <Tabs.Trigger className={styles.tabsTrigger} value='competition'>
              <h3>Competition Mode</h3>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className={styles.tabsContent} value='training'>
            <fieldset>
              <h3>Select a template</h3>
              <select
                value={selectedTemplate}
                onChange={(e) =>
                  setSelectedTemplate(e.target.value as TemplateName)
                }
              >
                {Object.keys(templatesDictionary)
                  .filter(
                    (name) =>
                      !templatesDictionary[
                        name as keyof typeof templatesDictionary
                      ].private
                  )
                  .map((name) => (
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
            </fieldset>
          </Tabs.Content>
          <Tabs.Content className={styles.tabsContent} value='competition'>
            <fieldset>
              <h3>Please set session code</h3>
              <input
                type='text'
                placeholder='Session Password'
                {...register('templateName', {
                  required: !isTrainningSession,
                  max: 80,
                })}
                className={formState.errors.fullName ? styles.isWizz : ''}
                required={isTrainningSession}
              />
              {error && <span className={styles.error}>{error}</span>}
            </fieldset>
          </Tabs.Content>
        </Tabs.Root>

        <input type='submit' className='button' />
      </form>
    </>
  );
}
