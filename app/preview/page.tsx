"use client"

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEntryStore } from '../../hooks/useEntryStore';
import { injectCode, reference_image, showPreview } from '../../config/event';

import {Modal} from "../../components/modal/Modal";
import {Button} from "../../components/button/Button";
import styles from '../../styles/preview.module.scss';

export default function Page() {
  const { entry, updateIsSubmitted } = useEntryStore();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showReference, setShowReference] = useState(false);

  useEffect(() => {
    console.log(showPreview);
    if (showPreview) {
      const doc = iframeRef?.current?.contentDocument;
      doc?.open();
      doc?.write(injectCode + entry?.html || '');
      doc?.close();
    }
  }, [entry?.html]);

  return (
    <>
      <Modal show={showReference} setShow={setShowReference}>
        <img
          src={reference_image}
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
          style={{ backgroundImage: `url(${reference_image})` }}
        ></div>
      </div>
      {showPreview && (
        <iframe ref={iframeRef} className={styles.resultPreview} />
      )}
    </>
  );
}
