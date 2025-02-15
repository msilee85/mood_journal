'use client';

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">
        Summary: {entry.analysis?.summary || null}
      </div>
      <div className="px-4 py-4">Mood: {entry.analysis?.mood || null}</div>
    </div>
  );
};

export default EntryCard;
