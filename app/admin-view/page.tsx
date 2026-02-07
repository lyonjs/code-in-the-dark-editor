'use client';

import { useEffect, useState } from 'react';
import styles from './files.module.css';

interface Tree {
  [date: string]: {
    [name: string]: string[];
  };
}

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL || '';

export default function FilesPage() {
  const [tree, setTree] = useState<Tree>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      const res = await fetch('/save'); // route API
      const data = await res.json();
      setTree(data.tree || {});
      setLoading(false);
    }
    fetchFiles();
  }, []);

  if (loading) {
    return <div className={styles.center}>Loading…</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin view</h1>
      <div className={styles.list}>
        {Object.keys(tree).map((date) => (
          <details key={date} className={styles.details}>
            <summary className={styles.summary}>{date}</summary>
            <div className={styles.inner}>
              {Object.keys(tree[date]).map((name) => (
                <details key={name} className={styles.subdetails}>
                  <summary className={styles.subsummary}>{name}</summary>
                  <ul className={styles.ul}>
                    {tree[date][name].map((filename) => (
                      <li key={filename} className={styles.li}>
                        <a
                          href={`${BUCKET_URL}/${date}/${name}/${filename}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={styles.link}
                        >
                          {filename}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
