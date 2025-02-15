'use client';

import Link from 'next/link';
import EntryCard from './EntryCard';
import { deleteEntry } from '@/utils/api';

const Entry = ({ entry }) => {
  return (
    <div key={entry.id}>
      <button onClick={() => deleteEntry(entry.id)}>Delete</button>
      <Link href={`/journal/${entry.id}`} key={entry.id}>
        <EntryCard entry={entry} />
      </Link>
    </div>
  );
};

export default Entry;
