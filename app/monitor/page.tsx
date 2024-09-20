'use client';
import { useEffect, useRef, useState } from 'react';

import styles from '../../styles/preview.module.scss';

const REFRESH_MONITOR_RATE = 200;

export default function Monitor() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [_iframeDocument, setIframeDocument] = useState(
    iframeRef?.current?.contentDocument
  );

  async function fetchData() {
    const res = await fetch('/api/reconstruct');
    const text = await res.text();
    const doc = iframeRef?.current?.contentDocument;
    doc?.open();
    doc?.write(text);
    doc?.close();
    setIframeDocument(doc);
  }
  useEffect(() => {
    setInterval(fetchData, REFRESH_MONITOR_RATE);
  }, []);
  return (
    <div>
      Monitor
      <iframe ref={iframeRef} className={styles.resultPreview} />
    </div>
  );
}
