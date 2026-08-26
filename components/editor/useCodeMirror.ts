'use client';

import { useCallback, useRef } from 'react';
import type { RefCallback } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, drawSelection } from '@codemirror/view';
import { indentUnit, indentOnInput } from '@codemirror/language';
import {
  defaultKeymap,
  indentWithTab,
  history,
  historyKeymap,
} from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { cssClassHighlightExtension } from './highlight';

export interface UseCodeMirrorProps {
  latestValue?: string;
  onChange?: (newValue: string) => void;
}

export interface UseCodeMirrorResult {
  editorRef: RefCallback<HTMLDivElement>;
  shakeEditor: (offsetX: number, offsetY: number, durationMs: number) => void;
}

export function useCodeMirror({
  latestValue,
  onChange,
}: UseCodeMirrorProps): UseCodeMirrorResult {
  const editorElement = useRef<HTMLDivElement | null>(null);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const latestValueRef = useRef(latestValue);
  latestValueRef.current = latestValue;

  const editorRef = useCallback<RefCallback<HTMLDivElement>>(
    (parent: HTMLDivElement) => {
      editorElement.current = parent;
      const updateListener = EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current?.(update.state.doc.toString());
        }
      });

      const state = EditorState.create({
        doc: latestValueRef.current || '',
        extensions: [
          lineNumbers(),
          drawSelection(),
          history(),
          indentUnit.of('  '),
          indentOnInput(),
          html({ autoCloseTags: true }),
          closeBrackets(),
          cssClassHighlightExtension,
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...historyKeymap,
            indentWithTab,
          ]),
          updateListener,
          EditorView.contentAttributes.of({ 'aria-label': 'Code editor' }),
        ],
      });

      const view = new EditorView({ state, parent });

      return () => {
        view.destroy();
        editorElement.current = null;
      };
    },
    []
  );

  const shakeEditor = useCallback(
    (offsetX: number, offsetY: number, durationMs: number) => {
      const element = editorElement.current;
      if (!element) return;

      element.style.margin = `${offsetY}px ${offsetX}px`;

      setTimeout(() => {
        if (editorElement.current) editorElement.current.style.margin = '';
      }, durationMs);
    },
    []
  );

  return { editorRef, shakeEditor };
}
