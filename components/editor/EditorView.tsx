'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useEntryStore } from '../../hooks/useEntryStore';

import styles from '../../styles/editor.module.scss';
import { useRouter } from 'next/navigation';
import { Modal } from '../modal/Modal';
import { Streak } from '../streak/Streak';
import { Button } from '../button/Button';
import { Editor } from './Editor';
import useInterval from '../../hooks/useInterval';

const STREAK_TIMEOUT = 10 * 1000;

const POWER_MODE_ACTIVATION_THRESHOLD = 200;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export const EditorView = () => {
  const router = useRouter();
  const { entry, updateHtml, isSubmitted, updateIsSubmitted, updateIsLoading } =
    useEntryStore();
  const [streak, setStreak] = useState(0);
  const [powerMode, setPowerMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showReference, setShowReference] = useState(false);

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

  useInterval(async () => {
    if(entry?.template?.private) {
      try {
        await fetch(`/save?filename=${entry?.fullName}`, { method: 'POST', body: entry?.html });
      } catch (error) {
        console.error(`Failed to upload file: ${error}`);
      }
    }
  }, 15000);

  useEffect(() => {
    if (isSubmitted) router.push('/thanks');
  }, [isSubmitted, router]);

  const finishHandler = useCallback(async () => {
    updateIsLoading(true);
    if(entry?.template?.private) {
      try {
        await fetch(
          `/save?filename=${entry?.template}/${entry?.fullName}-END`,
          { method: 'POST', body: entry?.html }
        );
      } catch (error) {
        console.error(`Failed to upload file: ${error}`);
      }
    }
    updateIsSubmitted(true);
    updateIsLoading(false);
    router.push('/thanks');
  }, [updateIsLoading, updateIsSubmitted, router, entry]);

  const powerModeShakeOnKeyDown = () => {
    if (!powerMode) {
      return;
    }

    const intensity = 1 + 2 * Math.random() * Math.floor(
      (streak - POWER_MODE_ACTIVATION_THRESHOLD) / 100,
    );
    const marginLeftRight = intensity * (Math.random() > 0.5 ? -1 : 1);
    const marginTopBottom = intensity * (Math.random() > 0.5 ? -1 : 1);
    const editor = document.querySelector('#ace-editor') as HTMLElement;
    editor.style.margin = `${marginTopBottom}px ${marginLeftRight}px`;
    setTimeout(() => editor.style.margin = '', 75);
  };

  return (
    <div
      className={`${styles.editorView} ${powerMode && styles.powerModeOuter}`}
      onKeyDown={powerModeShakeOnKeyDown}
    >
      <Modal show={showInstructions} setShow={setShowInstructions}>
        <pre>{entry?.template?.instructions}</pre>
      </Modal>
      <Modal show={showReference} setShow={setShowReference}>
        {entry?.template?.referenceImage ? (
          <img
            src={entry.template.referenceImage}
            className={styles.referenceImage}
            alt='Image de référence'
          />
        ) : null}
      </Modal>
      <Streak streak={streak} powerMode={powerMode} />
      <div
        className={powerMode ? styles.backgroundPowerMode : styles.background}
      />

      <Suspense fallback={<Loading />}>
        <Editor
          onChange={onChange}
          className={styles.editor}
          defaultValue={entry?.html || ''}
        />
      </Suspense>

      <div className={styles.editorViewNametag}>{entry?.fullName || ''}</div>

      <div className={styles.editorViewControls}>
        <div className={styles.editorViewReference}>
          Reference
          <div
            onClick={() => setShowReference(true)}
            className={styles.editorViewReferenceImage}
            style={{
              backgroundImage: `url(${entry?.template?.referenceImage})`,
            }}
          />
        </div>

        <div className={styles.editorViewButtons}>
          <Button
            onClick={() => setShowInstructions(true)}
            className={`${styles.editorViewButton} ${styles.editorViewButtonsInstructions}`}
          >
            Instructions 📖
          </Button>
          <Button
            className={`${styles.editorViewButton} ${styles.editorViewButtonsFinish}`}
            onClick={finishHandler}
          >
            Finish 🏁
          </Button>
        </div>
      </div>
    </div>
  );
};
