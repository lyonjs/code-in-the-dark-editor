let html = '';

export async function POST(request: Request) {
  const res = (await request.json()) as [[number, number, string]];
  html = reconstructDiffs({
    diff: res,
    originalHtml: html,
  });
  return new Response();
}

export async function GET() {
  return new Response(`${html}`, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
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
