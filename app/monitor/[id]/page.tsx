'use client';
import { applyPatch } from 'fast-myers-diff';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import styles from '../../../styles/preview.module.scss';

const REFRESH_INTERVAL_POLLING_IN_MILLISECONDS = 500;

export default function Monitor({ params }: { params: { id: string } }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [_iframeDocument, setIframeDocument] = useState(
    iframeRef?.current?.contentDocument
  );
  const { data } = useSWR(
    `/api/monitor/${params.id}`,
    async (uri) => {
      const res = await fetch(uri);
      return await res.text();
    },
    {
      refreshInterval: REFRESH_INTERVAL_POLLING_IN_MILLISECONDS,
      dedupingInterval: REFRESH_INTERVAL_POLLING_IN_MILLISECONDS,
    }
  );

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
