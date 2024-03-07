'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useEntryStore } from '../../hooks/useEntryStore';
import { showPreview } from '../../config/event';
import { Button } from '../../components/button/Button';

import styles from '../../styles/thanks.module.scss';

export default function Page() {
  const router = useRouter();
  const { updateIsSubmitted } = useEntryStore();

  return (
    <div className={styles.thanksRoot}>
      <h1>Thanks ! 🙏🏼</h1>
      <h3>Your code has been submitted! 🎊</h3>
      {showPreview ? (
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
