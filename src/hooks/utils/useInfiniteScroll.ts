import { useEffect, useRef } from 'react';

type useInfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
};

export default function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isLoading,
}: useInfiniteScrollProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      }
    );

    const target = targetRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [fetchNextPage, hasNextPage, isLoading]);

  return targetRef;
}
