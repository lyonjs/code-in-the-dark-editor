'use client';

import React, { useState } from 'react';
import styles from './instructions.module.scss';
import type { TemplateInformations } from '../../config/templates';

function getImageSrc(path: string): string {
  return path.startsWith('./') ? path.slice(1) : path;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
      onClick={handleClick}
      title={copied ? 'Copied!' : `Copy ${value}`}
    >
      {copied ? '✓' : '⎘'}
    </button>
  );
}

export function InstructionsContent({
  template,
}: {
  template?: Pick<
    TemplateInformations,
    'texts' | 'assets' | 'colors' | 'font'
  > | null;
}) {
  const { texts, assets, colors, font } = template ?? {};

  return (
    <>
      {!!texts?.length && (
        <>
          <h2 className={styles.section}>Texts</h2>
          {texts.map((text, idx) => (
            <p key={idx} className={styles.paragraph}>{text}</p>
          ))}
        </>
      )}

      {!!assets?.length && (
        <>
          <h2 className={styles.section}>Assets</h2>
          <div className={styles.imagesPreview}>
            {assets.map((asset, idx) => {
              const src = getImageSrc(asset.path);
              return (
                <div key={idx} className={styles.imagePreview}>
                  <img
                    src={src}
                    alt=""
                    className={styles.imageThumb}
                    loading="lazy"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.style.display = 'none';
                      const next = e.currentTarget.nextElementSibling;
                      if (next) (next as HTMLElement).style.display = 'block';
                    }}
                  />
                  <span
                    className={styles.imagePlaceholder}
                    style={{ display: 'none' }}
                    aria-hidden
                  >
                    (image non chargée)
                  </span>
                  <div className={styles.imageFooter}>
                    <span className={styles.imagePath}>
                      {asset.path}
                      {asset.label ? ` — ${asset.label}` : ''}
                    </span>
                    <CopyButton value={asset.path} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {font && (
        <>
          <h2 className={styles.section}>Font</h2>
          <p className={styles.paragraph}>{font}</p>
        </>
      )}

      {!!colors?.length && (
        <>
          <h2 className={styles.section}>Colors</h2>
          <div className={styles.colorsPreview}>
            {colors.map((hex, idx) => (
              <div key={idx} className={styles.colorRow}>
                <span
                  className={styles.colorSwatch}
                  style={{ backgroundColor: hex }}
                  aria-hidden
                />
                <code className={styles.colorHex}>{hex}</code>
                <CopyButton value={hex} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
