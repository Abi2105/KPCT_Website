import { useEffect } from 'react';

/** Keeps the per-page <title> values the original static pages had. */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
