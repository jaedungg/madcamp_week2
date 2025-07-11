'use client';

import { useParams, useSearchParams } from 'next/navigation';

export default function ComicPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id ?? 'unknown';
  const step = searchParams ? searchParams.get('step') : null;

  return (
    <div>
      <h1>Comic ID: {id}</h1>
      <p>Step: {step}</p>
    </div>
  );
}
