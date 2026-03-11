'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useDebounceCallback, useInterval } from 'usehooks-ts';
import { useEntryStore } from '../../hooks/useEntryStore';
import { useEditorModeStore } from '../../hooks/useEditorModeStore';

import styles from '../../styles/editor.module.scss';
import instructionsStyles from '../instructions/instructions.module.scss';
import { useRouter } from 'next/navigation';
import { Modal } from '../modal/Modal';
import { InstructionsContent } from '../instructions/InstructionsContent';
import { Streak } from '../streak/Streak';
import { Button } from '../button/Button';
import { Editor } from './Editor';

const STREAK_TIMEOUT = 10 * 1000;

const POWER_MODE_ACTIVATION_THRESHOLD = 200;
const ULTRA_MODE_ACTIVATION_THRESHOLD = 500;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export const EditorView = () => {
  const router = useRouter();
  const { entry, updateHtml, isSubmitted, updateIsSubmitted, updateIsLoading } =
    useEntryStore();
  const { setPowerMode: setStorePowerMode, setUltraMode: setStoreUltraMode, reset: resetStoreMode } = useEditorModeStore();
  const [streak, setStreak] = useState(0);
  const [powerMode, setPowerMode] = useState(false);
  const [ultraMode, setUltraMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const shouldWeSaveResult = entry?.template?.private;

  const resetStreak = useCallback(() => {
    setStreak(0);
    setPowerMode(false);
    setUltraMode(false);
    resetStoreMode();
  }, [resetStoreMode]);

  const debouncedSearchTermChanged = useDebounceCallback(
    resetStreak,
    STREAK_TIMEOUT
  );

  const onChange = useCallback(
    (newValue: string) => {
      setStreak(streak + 1);
      if (streak === POWER_MODE_ACTIVATION_THRESHOLD) {
        setPowerMode(true);
        setStorePowerMode(true);
      }
      if (streak === ULTRA_MODE_ACTIVATION_THRESHOLD) {
        setUltraMode(true);
        setStoreUltraMode(true);
      }
      debouncedSearchTermChanged();
      updateHtml(newValue);
    },
    [streak, debouncedSearchTermChanged, updateHtml]
  );

  useInterval(async () => {
    if (shouldWeSaveResult) {
      try {
        await fetch(`/save?fullName=${entry?.fullName}`, {
          method: 'POST',
          body: entry?.html,
        });
      } catch (error) {
        console.error(`Failed to upload file: ${error}`);
      }
    }
  }, 120000);

  useEffect(() => {
    if (isSubmitted) router.push('/thanks');
  }, [isSubmitted, router]);

  const finishHandler = useCallback(async () => {
    updateIsLoading(true);
    if (shouldWeSaveResult) {
      try {
        await fetch(`/save?fullName=${entry?.fullName}&end=true`, {
          method: 'POST',
          body: entry?.html,
        });
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

    const threshold = ultraMode
      ? ULTRA_MODE_ACTIVATION_THRESHOLD
      : POWER_MODE_ACTIVATION_THRESHOLD;
    const intensity =
      (ultraMode ? 2 : 1) +
      2 *
      Math.random() *
      Math.floor((streak - threshold) / 100);
    const marginLeftRight = intensity * (Math.random() > 0.5 ? -1 : 1);
    const marginTopBottom = intensity * (Math.random() > 0.5 ? -1 : 1);
    const editor = document.querySelector('#ace-editor') as HTMLElement;
    editor.style.margin = `${marginTopBottom}px ${marginLeftRight}px`;
    setTimeout(() => (editor.style.margin = ''), 75);
  };

  return (
    <div
      className={`${styles.editorView} ${powerMode && styles.powerModeOuter} ${ultraMode && styles.ultraModeOuter}`}
      onKeyDown={powerModeShakeOnKeyDown}
    >
      <Modal show={showInstructions} setShow={setShowInstructions}>
        <div className={instructionsStyles.instructions}>
          <h2 className={instructionsStyles.section}>The rules</h2>
          <ol className={instructionsStyles.list}>
            <li>No previews - of either results or assets!</li>
            <li>Stay in this editor at all times</li>
            <li>No measurement tools</li>
            <li>Stop coding when the time&apos;s up</li>
            <li>After the round is over, press &quot;Finish&quot;</li>
          </ol>
          <p className={instructionsStyles.paragraph}>
            Good luck and most important of all : have fun ! 🥳
          </p>
          <h2 className={instructionsStyles.section}>Reminder</h2>
          <p className={instructionsStyles.paragraph}>
            ⚠️ Remember to resize images if necessary
          </p>
          <p className={instructionsStyles.paragraph}>
            ⚠️ Beware of file extensions !
          </p>
          <p className={instructionsStyles.paragraph}>
            ⚠️ All images have straight borders, no radius !
          </p>
          <InstructionsContent template={entry?.template} />
        </div>
      </Modal>
      <Modal show={showReference} setShow={setShowReference}>
        {entry?.template?.referenceImage ? (
          <img
            src={entry.template.referenceImage}
            className={styles.referenceImage}
            alt='Reference image'
          />
        ) : null}
      </Modal>
      <Streak streak={streak} powerMode={powerMode} ultraMode={ultraMode} />
      <div
        className={
          ultraMode
            ? styles.backgroundUltraMode
            : powerMode
              ? styles.backgroundPowerMode
              : styles.background
        }
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
