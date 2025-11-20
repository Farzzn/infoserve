'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import styles from './admin.module.css';

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';

type NewsForm = {
  title: string;
  summary: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
};

export default function AdminPage() {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // auth form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // form
  const [form, setForm] = useState<NewsForm>({
    title: '',
    summary: '',
    content: '',
    status: 'DRAFT',
  });

  const [submitting, setSubmitting] = useState(false);
  const [myNews, setMyNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoadingAuth(false);
      if (u) {
        // check admins/{uid} existence
        const admRef = doc(db, 'admins', u.uid);
        const admSnap = await getDoc(admRef);
        setIsAdmin(admSnap.exists());
        if (admSnap.exists()) {
          loadMyNews(u.uid);
        } else {
          setMyNews([]);
        }
      } else {
        setIsAdmin(false);
        setMyNews([]);
      }
    });
    return () => unsub();
  }, []);

  async function loadMyNews(uid: string) {
    setLoadingNews(true);
    try {
      const q = query(
        collection(db, 'news'),
        where('authorId', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      setMyNews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('failed to load news', err);
    } finally {
      setLoadingNews(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      alert('Login failed. Check credentials.');
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  function slugify(s: string) {
    return s
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 200);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return alert('Login required');
    if (!isAdmin) return alert('User is not an admin in Firestore.');

    if (!form.title.trim()) return alert('Title required');

    setSubmitting(true);
    try {
      const slug = slugify(form.title);
      const docRef = await addDoc(collection(db, 'news'), {
        title: form.title.trim(),
        slug,
        summary: form.summary.trim() || null,
        content: form.content || '',
        status: form.status,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: form.status === 'PUBLISHED' ? serverTimestamp() : null,
      });

      alert(`Saved (id: ${docRef.id})`);
      setForm({
        title: '',
        summary: '',
        content: '',
        status: 'DRAFT',
      });
      // refresh list
      loadMyNews(user.uid);
    } catch (err) {
      console.error(err);
      alert('Failed to save. Check console.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingAuth) return <div>Checking auth...</div>;

if (!user) {
  return (
    <main className={styles.container}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Admin — Sign in</h1>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <input
            className={styles.input}
            placeholder="admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <input
            className={styles.input}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <button type="submit" className={styles.button}>
            Sign in
          </button>
        </form>

        <p className={styles.loginHint}>
          Use the admin account created in Firebase Auth.
        </p>
      </div>
    </main>
  );
}


return (
  <main className={styles.container}>
    {/* Top Bar */}
    <div className={styles.topBar}>
      <h1 className={styles.pageTitle}>Admin</h1>

      <div className={styles.userInfo}>
        <span>{user.email}</span>
        <button className={styles.buttonSecondary} onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>

    {!isAdmin && (
      <div className={styles.alert}>
        <strong>Access denied:</strong> your user is not in the `admins` collection.
      </div>
    )}

    {/* Create News */}
    <section>
      <h2 className={styles.sectionTitle}>Create / Publish News</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          className={styles.input}
          placeholder="Short summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />

        <textarea
          className={styles.textarea}
          placeholder="Full content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <select
          className={styles.select}
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as NewsForm['status'] })
          }
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
        </select>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className={styles.button} type="submit" disabled={submitting || !isAdmin}>
            {submitting ? 'Saving...' : 'Save'}
          </button>

          <button
            className={styles.buttonSecondary}
            type="button"
            onClick={() =>
              setForm({ title: '', summary: '', content: '', status: 'DRAFT' })
            }
          >
            Clear
          </button>
        </div>
      </form>
    </section>

    {/* Recent Items */}
    <section>
      <h2 className={styles.sectionTitle}>Your Recent Items</h2>

      {loadingNews ? (
        <div>Loading...</div>
      ) : myNews.length === 0 ? (
        <div>No items yet.</div>
      ) : (
        <ul className={styles.newsList}>
          {myNews.map((n) => (
            <li key={n.id} className={styles.newsItem}>
              <strong>{n.title}</strong>{' '}
              <small>({n.status})</small>
              <div>{n.summary}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  </main>
);
}