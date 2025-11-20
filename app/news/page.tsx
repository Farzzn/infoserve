// infoserve/app/news/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './page.module.css';

export default function NewsPage() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, 'news'),
        where('status', '==', 'PUBLISHED'),
        orderBy('publishedAt', 'desc')
      );
      const snap = await getDocs(q);
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.heroTitle}>News</h1>
      {items.length === 0 && <p className={styles.lead}>No news yet.</p>}

      <section className={styles.newsSection}>
        <ul className={styles.newsList}>
          {items.map(n => (
            <li key={n.id} className={styles.item}>
              <div className={styles.headlineRow}>
                <h3 className={styles.title}>{n.title}</h3>
                <div className={styles.meta}>
                  {n.publishedAt ? new Date(n.publishedAt.seconds * 1000).toLocaleDateString() : ''}
                </div>
              </div>

              <p className={styles.summary}>{n.summary}</p>

              <div className={styles.actions}>
                <Link href={`/news/${n.slug ?? n.id}`} className={styles.readMore}>
                  Read more
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
