import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { htmlLanguage } from '@codemirror/lang-html';
import { cssLanguage } from '@codemirror/lang-css';
import { tags } from '@lezer/highlight';
import type { Extension } from '@codemirror/state';

const htmlHighlightStyle = HighlightStyle.define(
  [
    { tag: tags.tagName, class: 'cm-html-tag' },
    { tag: tags.attributeName, class: 'cm-html-attribute' },
    { tag: [tags.attributeValue, tags.string, tags.character], class: 'cm-html-value' },
    { tag: tags.comment, class: 'cm-html-comment' },
    { tag: [tags.angleBracket, tags.definitionOperator], class: 'cm-html-bracket' },
  ],
  { scope: htmlLanguage }
);

const cssHighlightStyle = HighlightStyle.define(
  [
    {
      tag: [
        tags.tagName,
        tags.className,
        tags.labelName,
      ],
      class: 'cm-css-selector',
    },
    {
      tag: [tags.atom, tags.number, tags.color, tags.string],
      class: 'cm-css-value',
    },
    { tag: tags.unit, class: 'cm-css-unit' },
    { tag: tags.comment, class: 'cm-css-comment' },
    { tag: tags.propertyName, class: 'cm-css-property' },
    {
      tag: [
        tags.punctuation,
        tags.separator,
        tags.paren,
        tags.squareBracket,
        tags.brace,
      ],
      class: 'cm-css-punctuation',
    },
  ],
  { scope: cssLanguage }
);

export const cssClassHighlightExtension: Extension = [
  syntaxHighlighting(htmlHighlightStyle),
  syntaxHighlighting(cssHighlightStyle),
];
