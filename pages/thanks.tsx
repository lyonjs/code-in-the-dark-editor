import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useEntryStore } from '../hooks/useEntryStore';
import { showPreview } from '../config/event';
import { Button } from '../components/button';

import styles from '../styles/thanks.module.scss';

const Home: NextPage = () => {
  const router = useRouter();
  const { updateIsSubmitted } = useEntryStore();

  return (
    <div className={styles.thanksRoot}>
      <h1>Merci ! 🙏🏼</h1>
      <h3>Votre code a bien été submit ! 🎊</h3>
      {showPreview ? (
        <Button onClick={() => router.push('/preview')} className=''>
          Voir le résultat
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
};

export default Home;
