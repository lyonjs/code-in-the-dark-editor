'use client';
import { useEffect, useRef, useState } from 'react';

import styles from '../../../styles/preview.module.scss';

export default function Monitor({ params }: { params: { id: string } }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [_iframeDocument, setIframeDocument] = useState(
    iframeRef?.current?.contentDocument
  );
  const [data, setData] = useState('');
  const decoder = new TextDecoder();
  useEffect(() => {
    async function fetchReader() {
      const body = (await fetch(`/api/monitor/${params.id}`)).body;
      if (!body) {
        return;
      }
      const reader = body.getReader();
      reader.read().then(async function pump({ value }): Promise<string> {
        const text = decoder.decode(value);
        setData(text);
        const result_1 = await reader.read();
        return pump(result_1);
      });
    }
    fetchReader();
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    const doc = iframeRef?.current?.contentDocument;
    doc?.open();
    doc?.write(data);
    doc?.close();
    setIframeDocument(doc);
  }, [data]);

  return (
    <div>
      <iframe ref={iframeRef} className={styles.resultPreview} />
    </div>
  );
}
