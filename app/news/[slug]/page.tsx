/* app/news/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from '../page.module.css'; // reuse styles, adjust if needed

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);

      // try fetch by slug
      const q = query(collection(db, 'news'), where('slug', '==', slug));
      const snap = await getDocs(q);

      if (!snap.empty) {
        setItem({ id: snap.docs[0].id, ...snap.docs[0].data() });
        setLoading(false);
        return;
      }

      // fallback: check doc id (if someone used id instead of slug in link)
      try {
        const docRef = doc(db, 'news', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          setItem(null);
        }
      } catch (err) {
        console.error(err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!item) return (
    <main className={styles.container}>
      <p>Article not found.</p>
      <p><Link href="/news">← Back to news</Link></p>
    </main>
  );

  return (
    <main className={styles.container}>
      <p style={{ marginBottom: 6 }}>
        <Link href="/news">← Back to news</Link>
      </p>

      <h1 className={styles.heroTitle}>{item.title}</h1>

      <div style={{ color: '#64748b', marginBottom: 18 }}>
        {item.publishedAt ? new Date(item.publishedAt.seconds * 1000).toLocaleString() : ''}
        {item.authorId ? ` — by ${item.authorId}` : ''}
      </div>

      <article style={{ lineHeight: 1.7, color: '#111827', whiteSpace: 'pre-wrap' }}>
        {item.content}
      </article>
    </main>
  );
}
*/

// app/news/[slug]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  collection,
  query,
  where,
  getDocs,
  doc as firestoreDoc,
  getDoc as getDocByRef,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from '../page.module.css';

function isString(x: unknown): x is string {
  return typeof x === 'string';
}

export default function NewsDetailPage() {
  const params = useParams();
  // params.slug can be string | string[] | undefined — normalize to single string or undefined
  let rawSlug = params?.slug;
  let slug: string | undefined;
  if (Array.isArray(rawSlug)) {
    slug = rawSlug[0];
  } else if (isString(rawSlug)) {
    slug = rawSlug;
  } else {
    slug = undefined;
  }

  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setItem(null);
      return;
    }

    (async () => {
      setLoading(true);

      try {
        // Try fetching by slug (field)
        const q = query(collection(db, 'news'), where('slug', '==', slug));
        const snap = await getDocs(q);

        if (!snap.empty) {
          setItem({ id: snap.docs[0].id, ...snap.docs[0].data() });
          setLoading(false);
          return;
        }

        // Fallback: treat slug as a document id
        const docRef = firestoreDoc(db, 'news', slug);
        const docSnap = await getDocByRef(docRef);
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          setItem(null);
        }
      } catch (err) {
        console.error('Error loading news item:', err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!item) return (
    <main className={styles.container}>
      <p>Article not found.</p>
      <p><Link href="/news">← Back to news</Link></p>
    </main>
  );

  return (
    <main className={styles.container}>
      <p style={{ marginBottom: 6 }}>
        <Link href="/news">← Back to news</Link>
      </p>

      <h1 className={styles.heroTitle}>{item.title}</h1>

      <div style={{ color: '#64748b', marginBottom: 18 }}>
        {item.publishedAt ? new Date(item.publishedAt.seconds * 1000).toLocaleString() : ''}
        {item.authorId ? ` — by ${item.authorId}` : ''}
      </div>

      <article style={{ lineHeight: 1.7, color: '#111827', whiteSpace: 'pre-wrap' }}>
        {item.content}
      </article>
    </main>
  );
}
