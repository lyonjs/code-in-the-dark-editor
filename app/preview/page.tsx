'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEntryStore } from '../../hooks/useEntryStore';
import { templatesDictionary } from '../../config/templates';

import { Modal } from '../../components/modal/Modal';
import { Button } from '../../components/button/Button';
import styles from '../../styles/preview.module.scss';

export default function Page() {
  const { entry, updateIsSubmitted, clear } = useEntryStore();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [snapshot] = useState(() => (entry ? { ...entry } : null));
  const template = snapshot?.templateName
    ? templatesDictionary[snapshot.templateName]
    : undefined;
  const [showReference, setShowReference] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleKeyDown = useRef((event: KeyboardEvent) => {
    if (event.key === 'b') {
      setShowButton((prev) => !prev);
    }
  }).current;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (template?.showPreview && snapshot?.html) {
      const doc = iframeRef?.current?.contentDocument;
      doc?.open();
      doc?.write((template.injectCode || '') + snapshot.html);
      doc?.close();

      doc?.addEventListener('keydown', handleKeyDown);

      updateIsSubmitted(false);
    }
  }, [snapshot, template, handleKeyDown, updateIsSubmitted]);

  return (
    <>
      <Modal show={showReference} setShow={setShowReference}>
        <img
          src={template?.referenceImage}
          className={styles.referenceImage}
          alt='Reference image'
        />
      </Modal>
      {showButton ? (
        <div className={styles.backButton}>
          <Button
            onClick={() => {
              router.push('/editor');
            }}
            className={''}
          >
            Back to editor
          </Button>
          <Button
            onClick={() => {
              clear();
              router.push('/');
            }}
            className={''}
          >
            Reset editor
          </Button>
        </div>
      ) : null}
      <div className={styles.editorViewReference}>
        Reference
        <div
          onClick={() => setShowReference(true)}
          className={styles.editorViewReferenceImage}
          style={{
            backgroundImage: `url(${template?.referenceImage})`,
          }}
        />
      </div>
      {template?.showPreview && (
        <iframe ref={iframeRef} className={styles.resultPreview} />
      )}
    </>
  );
}
