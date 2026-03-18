'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useEntryStore } from '../../hooks/useEntryStore';
import { templatesDictionary } from '../../config/templates';
import { Button } from '../../components/button/Button';

import styles from '../../styles/thanks.module.scss';

export default function Page() {
  const router = useRouter();
  const { entry, updateIsSubmitted } = useEntryStore();
  const template = entry?.templateName
    ? templatesDictionary[entry.templateName]
    : undefined;

  return (
    <div className={styles.thanksRoot}>
      <h1>Thanks ! 🙏🏼</h1>
      <h3>Your code has been submitted! 🎊</h3>
      {template?.showPreview ? (
        <Button onClick={() => router.push('/preview')} className=''>
          See result 🔎
        </Button>
      ) : null}
      <div
        onClick={() => {
          updateIsSubmitted(false);
          router.push('/editor');
        }}
      >
        &nbsp;
      </div>
    </div>
  );
}
