'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEntryStore } from '../../hooks/useEntryStore';

import { Modal } from '../../components/modal/Modal';
import { Button } from '../../components/button/Button';
import styles from '../../styles/preview.module.scss';

export default function Page() {
  const { entry, updateIsSubmitted } = useEntryStore();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showReference, setShowReference] = useState(false);

  useEffect(() => {
    if (entry?.template?.showPreview) {
      const doc = iframeRef?.current?.contentDocument;
      doc?.open();
      doc?.write(entry.template.injectCode + entry?.html || '');
      doc?.close();
    }
  }, [entry?.html, entry?.template?.injectCode, entry?.template?.showPreview]);

  return (
    <>
      <Modal show={showReference} setShow={setShowReference}>
        <img
          src={entry?.template?.referenceImage}
          className={styles.referenceImage}
          alt='Image de référence'
        />
      </Modal>
      <Button
        onClick={() => {
          updateIsSubmitted(false);
          router.push('/editor');
        }}
        className={styles.backButton}
      >
        Retour à l&apos;IDE
      </Button>
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
