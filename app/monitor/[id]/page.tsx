'use client';
import { useEffect, useRef, useState } from 'react';
import { applyPatch } from 'fast-myers-diff';

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
        try {
          const diffs = JSON.parse(text) as [[number, number, string]][];
          let html = '';
          for (const diff of diffs) {
            html = reconstructDiffs({
              diff: diff,
              originalHtml: html,
            });
          }
          setData(html);
        } catch (e) {
          console.error('Error parsing diffs', e, text);
        } finally {
          const result_1 = await reader.read();
          return pump(result_1);
        }
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

function reconstructDiffs({
  diff,
  originalHtml,
}: {
  originalHtml: string;
  diff: [[number, number, string]];
}) {
  const appliedPatches = applyPatch(originalHtml, diff);
  const patches = [...appliedPatches];
  return patches.join('');
}
