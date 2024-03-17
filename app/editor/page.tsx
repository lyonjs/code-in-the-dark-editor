'use client';

import React from 'react';
import type { NextPage } from 'next';
import { EditorView } from '../../components/editor/EditorView';
import { Counter } from '../../components/counter/Counter';

const EditorPage: NextPage = () => {
  return (
    <>
      <Counter />
      <EditorView />
    </>
  );
};

export default EditorPage;
