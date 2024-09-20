let html = '';

export async function POST(request: Request) {
  const res = (await request.json()) as [[number, number, string]];
  html = reconstructDiffs({
    diff: res,
    originalHtml: html,
  });
  console.log('html', html);
  return new Response(JSON.stringify({ text: 'Hello' }));
}

import { applyPatch } from 'fast-myers-diff';
function reconstructDiffs({
  diff,
  originalHtml,
}: {
  originalHtml: string;
  diff: [[number, number, string]];
}) {
  const patches = [...applyPatch(originalHtml, diff)];
  return patches.join('');
}
