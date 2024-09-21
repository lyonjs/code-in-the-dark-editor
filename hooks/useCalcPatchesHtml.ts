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
  const [a, setA] = useState<[number, number, string][]>([]);
  useEffect(() => {
    if (previousHtml === html) {
      return;
    }
    const patches = [...calcPatch(previousHtml ?? '', html)];
    setA(patches);
  }, [html, previousHtml]);

  return { a };
}
