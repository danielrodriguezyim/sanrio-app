import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiPlus, FiX, FiTrash2, FiEdit2, FiExternalLink, FiRss } from 'react-icons/fi';

import useNews from '../../hooks/use-news';
import type { NewsItem, NewsItemPayload } from '../../types/news';
import './News.css';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

type ModalMode = { type: 'create' } | { type: 'edit'; item: NewsItem };

interface NewsModalProps {
  mode: ModalMode;
  onClose: () => void;
  onCreate: (payload: NewsItemPayload) => Promise<void>;
  onEdit:   (id: string, payload: NewsItemPayload) => Promise<void>;
}

const NewsModal = ({ mode, onClose, onCreate, onEdit }: NewsModalProps) => {
  const isEdit    = mode.type === 'edit';
  const defaults  = isEdit ? mode.item : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsItemPayload>({ defaultValues: defaults });

  const onSubmit = async (data: NewsItemPayload) => {
    if (isEdit) {
      await onEdit(mode.item.id, data);
    } else {
      await onCreate(data);
    }
    onClose();
  };

  return (
    <div
      className="news-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
    >
      <div className="news-modal">
        <div className="news-modal__header">
          <h3 id="news-modal-title" className="news-modal__title">
            {isEdit ? <FiEdit2 size={18} aria-hidden="true" /> : <FiRss size={18} aria-hidden="true" />}
            {isEdit ? 'Edit Update' : 'New Update'}
          </h3>
          <button className="news-modal__close" onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
        </div>

        <form className="news-modal__form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-field">
            <label htmlFor="nm-title">Title *</label>
            <input
              id="nm-title"
              {...register('title', { required: 'Required' })}
              placeholder="Spring collection is here!"
            />
            {errors.title && <span className="form-error">{errors.title.message}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="nm-description">Description *</label>
            <textarea
              id="nm-description"
              rows={3}
              {...register('description', { required: 'Required' })}
              placeholder="Discover our brand-new line of…"
            />
            {errors.description && <span className="form-error">{errors.description.message}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="nm-url">Link URL *</label>
            <input
              id="nm-url"
              type="url"
              {...register('url', {
                required: 'Required',
                pattern: { value: /^https?:\/\/.+/, message: 'Must be a valid URL' },
              })}
              placeholder="https://…"
            />
            {errors.url && <span className="form-error">{errors.url.message}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="nm-author">Author *</label>
            <input
              id="nm-author"
              {...register('author', { required: 'Required' })}
              placeholder="Sanrio Team"
            />
            {errors.author && <span className="form-error">{errors.author.message}</span>}
          </div>

          <div className="news-modal__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              {isSubmitting
                ? (isEdit ? 'Saving…' : 'Publishing…')
                : (isEdit ? 'Save Changes' : 'Publish Update')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const News = () => {
  const { newsItems, isLoading, hasError, create, edit, remove } = useNews();

  const [modalMode, setModalMode] = useState<ModalMode | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openCreate = () => setModalMode({ type: 'create' });
  useEffect(() => {
    if (isLoading || newsItems.length === 0) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    let attempts = 0;
    const interval = setInterval(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearInterval(interval);
      }
      if (++attempts > 30) clearInterval(interval); /* give up after 3s */
    }, 100);
    return () => clearInterval(interval);
  }, [isLoading, newsItems]);
  const openEdit   = (item: NewsItem) => setModalMode({ type: 'edit', item });
  const closeModal = () => setModalMode(null);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Remove "${title}"?`)) return;
    setDeletingId(id);
    try {
      await remove(id);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  const renderContent = () => {
    if (isLoading) return <NewsSkeleton />;

    if (hasError) return (
      <div className="news__empty">
        <span aria-hidden="true">⚠️</span>
        <p>Something went wrong loading updates. Please try again later.</p>
      </div>
    );

    if (newsItems.length === 0) return (
      <div className="news__empty">
        <span aria-hidden="true">📰</span>
        <p>No updates yet — add the first one!</p>
      </div>
    );

    return (
      <motion.ul
        className="news__list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="News and updates feed"
      >
        {newsItems.map(item => (
          <motion.li
            key={item.id}
            id={item.id}
            variants={cardVariants}
            className={`news__item${deletingId === item.id ? ' news__item--deleting' : ''}`}
          >
            <div className="news__item-header">
              <div className="news__item-meta">
                <span className="news__item-author">{item.author}</span>
                <time className="news__item-date" dateTime={item.pubDate}>
                  {formatDate(item.pubDate)}
                </time>
              </div>

              <div className="news__item-actions">
                <button
                  className="news__item-action-btn news__item-action-btn--edit"
                  onClick={() => openEdit(item)}
                  aria-label={`Edit "${item.title}"`}
                  title="Edit update"
                >
                  <FiEdit2 size={14} />
                </button>
                <button
                  className="news__item-action-btn news__item-action-btn--delete"
                  onClick={() => handleDelete(item.id, item.title)}
                  disabled={deletingId === item.id}
                  aria-label={`Delete "${item.title}"`}
                  title="Delete update"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>

            <h3 className="news__item-title">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news__item-link"
              >
                {item.title}
                <FiExternalLink size={14} className="news__item-link-icon" aria-hidden="true" />
              </a>
            </h3>

            <p className="news__item-description">{item.description}</p>

            <div className="news__item-footer">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news__item-read-more"
              >
                Read more →
              </a>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    );
  };

  return (
    <div className="news">

      <section className="news__hero">
        <div className="container news__hero-inner">
          <motion.div
            className="news__rss-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FiRss size={13} aria-hidden="true" />
            RSS Feed
          </motion.div>

          <motion.h1
            className="news__hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            News &amp; Updates
          </motion.h1>

          <motion.p
            className="news__hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            The latest from the Sanrio world — new arrivals, events, and everything kawaii. ✦
          </motion.p>
        </div>

        <div className="news__hero-shapes" aria-hidden="true">
          <span>✦</span><span>★</span><span>♡</span><span>✿</span>
        </div>
      </section>

      <section className="news__controls section--sm">
        <div className="container news__controls-inner">
          <p className="news__count" aria-live="polite">
            {isLoading ? '' : `${newsItems.length} update${newsItems.length !== 1 ? 's' : ''}`}
          </p>
          <div className="news__actions">
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--sm news__rss-link"
              aria-label="Subscribe via RSS"
            >
              <FiRss size={14} aria-hidden="true" />
              Subscribe RSS
            </a>
            <button
              className="btn btn--primary btn--sm"
              onClick={openCreate}
            >
              <FiPlus size={15} aria-hidden="true" />
              Add Update
            </button>
          </div>
        </div>
      </section>

      <section className="news__feed section--sm">
        <div className="container">
          {renderContent()}
        </div>
      </section>

      {modalMode && (
        <NewsModal
          mode={modalMode}
          onClose={closeModal}
          onCreate={create}
          onEdit={edit}
        />
      )}
    </div>
  );
};

const NewsSkeleton = () => (
  <ul className="news__list" aria-label="Loading updates">
    {Array.from({ length: 4 }).map((_, i) => (
      <li key={i} className="news__skeleton" aria-hidden="true">
        <div className="news__skeleton-line news__skeleton-line--meta" />
        <div className="news__skeleton-line news__skeleton-line--title" />
        <div className="news__skeleton-line" />
        <div className="news__skeleton-line news__skeleton-line--short" />
      </li>
    ))}
  </ul>
);

export default News;
