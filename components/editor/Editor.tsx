'use client';

import React, { useEffect, useRef } from 'react';
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
import './style.scss';

export interface EditorProps {
  onChange?: (newValue: string) => void;
  defaultValue?: string | null;
  className?: string;
  powerMode?: boolean;
  ultraMode?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export function Editor({
  onChange,
  defaultValue,
  className,
  powerMode = false,
  ultraMode = false,
  ref,
}: EditorProps) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const parent = ref?.current;
    if (!parent) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current?.(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: defaultValue || '',
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={`cm-editor-root${className ? ` ${className}` : ''}`}
      data-power-mode={powerMode}
      data-ultra-mode={ultraMode}
    />
  );
}
