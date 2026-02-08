'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEntryStore } from '../../hooks/useEntryStore';

import { Modal } from '../../components/modal/Modal';
import { Button } from '../../components/button/Button';
import styles from '../../styles/preview.module.scss';

export default function Page() {
  const { entry, updateIsSubmitted, clear } = useEntryStore();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [snapshot] = useState(() => (entry ? { ...entry } : null));
  const [iframeDocument, setIframeDocument] = useState(
    iframeRef?.current?.contentDocument
  );
  const [showReference, setShowReference] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'b') {
        setShowButton(!showButton);
      }
    };

    iframeDocument?.addEventListener('keydown', handleKeyDown);

    return () => {
      iframeDocument?.removeEventListener('keydown', handleKeyDown);
    };
  }, [iframeDocument, showButton]);

  useEffect(() => {
    if (snapshot?.template?.showPreview && snapshot?.html) {
      const doc = iframeRef?.current?.contentDocument;
      doc?.open();
      doc?.write(snapshot.template.injectCode || '' + snapshot?.html);
      doc?.close();
      setIframeDocument(doc);

      clear();
      updateIsSubmitted(false);
    }
  }, [snapshot, clear, updateIsSubmitted]);

  return (
    <>
      <Modal show={showReference} setShow={setShowReference}>
        <img
          src={snapshot?.template?.referenceImage}
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
            backgroundImage: `url(${snapshot?.template?.referenceImage})`,
          }}
        />
      </div>
      {snapshot?.template?.showPreview && (
        <iframe ref={iframeRef} className={styles.resultPreview} />
      )}
    </>
  );
}
