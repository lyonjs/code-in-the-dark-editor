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
  const [iframeDocument, setIframeDocument] = useState(iframeRef?.current?.contentDocument);
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
    if (entry?.template?.showPreview && entry?.html) {
      const doc = iframeRef?.current?.contentDocument;
      doc?.open();
      doc?.write(entry.template.injectCode || '' + entry?.html);
      doc?.close();
      setIframeDocument(doc);
    }
  }, [entry?.html, entry?.template?.injectCode, entry?.template?.showPreview]);

  return (
    <>
      <Modal show={showReference} setShow={setShowReference}>
        <img
          src={entry?.template?.referenceImage}
          className={styles.referenceImage}
          alt="Image de référence"
        />
      </Modal>
      {showButton ? (
        <div className={styles.backButton}>
          <Button
            onClick={() => {
              updateIsSubmitted(false);
              router.push('/editor');
            }}
            className={''}
          >
            Retour à l&apos;IDE
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem('root');
              clear();
              updateIsSubmitted(false);
              router.push('/');
            }}
            className={''}
          >
            Reset l&apos;éditeur
          </Button>
        </div>
      ) : null}
      <div className={styles.editorViewReference}>
        Reference
        <div
          onClick={() => setShowReference(true)}
          className={styles.editorViewReferenceImage}
          style={{ backgroundImage: `url(${entry?.template?.referenceImage})` }}
        />
      </div>
      {entry?.template?.showPreview && (
        <iframe ref={iframeRef} className={styles.resultPreview} />
      )}
    </>
  );
}
