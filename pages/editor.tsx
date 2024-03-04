import type { NextPage } from 'next';
import React, { useEffect, useState, useCallback } from 'react';
import { EditorProps } from '../components/editor';
import { Button } from '../components/button';
import { useDebouncedCallback } from 'use-debounce';
import { useEntryStore } from '../hooks/useEntryStore';

import { Streak } from '../components/streak';
import { Modal } from '../components/modal';
import { reference_image, instructions } from '../config/event';
import styles from '../styles/editor.module.scss';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Editor = dynamic<EditorProps>(
  () => import('../components/editor').then((mod) => mod.Editor) as any,
  { ssr: false, loading: () => <div>Loading...</div> }
);
const STREAK_TIMEOUT = 10 * 1000;

const POWER_MODE_ACTIVATION_THRESHOLD = 200;

const EditorView: NextPage = () => {
  const { entry, updateHtml, isSubmitted, updateIsSubmitted, updateIsLoading } =
    useEntryStore();
  const [streak, setStreak] = useState(0);
  const [powerMode, setPowerMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const router = useRouter();

  const debouncedSearchTermChanged = useDebouncedCallback(() => {
    setStreak(0);
    setPowerMode(false);
  }, STREAK_TIMEOUT);

  const onChange = useCallback(
    (newValue: string) => {
      setStreak(streak + 1);
      if (streak === POWER_MODE_ACTIVATION_THRESHOLD) {
        setPowerMode(true);
      }
      debouncedSearchTermChanged();
      updateHtml(newValue);
    },
    [streak, debouncedSearchTermChanged, updateHtml]
  );

  // useInterval(async () => {
  // TODO : Send code to Appwrite DB to display it
  // }, 15000);

  useEffect(() => {
    if (isSubmitted) router.push('/thanks');
  }, [isSubmitted, router]);

  const finishHandler = useCallback(async () => {
    updateIsLoading(true);

    // TODO : Push code in Appwrite DB to validat it

    updateIsSubmitted(true);
    updateIsLoading(false);
    router.push('/thanks');
  }, [updateIsLoading, updateIsSubmitted, router]);

  return (
    <div
      className={`${styles.editorView} ${powerMode && styles.powerModeOuter}`}
    >
      <Modal show={showInstructions} setShow={setShowInstructions}>
        <pre>{instructions}</pre>
      </Modal>
      <Modal show={showReference} setShow={setShowReference}>
        <img src={reference_image} className={styles.referenceImage}  alt="Image de référence"/>
      </Modal>
      <Streak streak={streak} powerMode={powerMode} />
      <div
        className={powerMode ? styles.backgroundPowerMode : styles.background}
      />

      <Editor
        onChange={onChange}
        className={styles.editor}
        defaultValue={entry?.html || ''}
      />

      <div className={styles.editorViewNametag}>{entry?.handle}</div>

      <div className={styles.editorViewControls}>
        <div className={styles.editorViewReference}>
          Reference
          <div
            onClick={() => setShowReference(true)}
            className={styles.editorViewReferenceImage}
            style={{ backgroundImage: `url(${reference_image})` }}
          ></div>
        </div>

        <div className={styles.editorViewButtons}>
          <Button
            onClick={() => setShowInstructions(true)}
            className={`${styles.editorViewButton} ${styles.editorViewButtonsInstructions}`}
          >
            Instructions
          </Button>
          <Button
            className={`${styles.editorViewButton} ${styles.editorViewButtonsFinish}`}
            onClick={finishHandler}
          >
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorView;
