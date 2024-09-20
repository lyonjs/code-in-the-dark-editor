import { calcPatch } from 'fast-myers-diff';
import { useEffect, useState } from 'react';

interface UsePingArguments {
  html: string;
  previousHtml: string;
}

export default function useCalcPatchesHtml({
  previousHtml,
  html = '',
}: UsePingArguments) {
  const [a, setA] = useState([[0, 0, '']]);
  useEffect(() => {
    if (previousHtml === html) {
      return;
    }
    setA([...calcPatch(previousHtml ?? '', html)]);
  }, [html, previousHtml]);

  return { a };
}
