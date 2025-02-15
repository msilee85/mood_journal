import Editor from '@/components/Editor';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async (id) => {
  const user = await getUserByClerkID();

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

const EntryPage = async ({ params }) => {
  // console.log('PARAMS', params);
  const { id } = await params;
  const entry = await getEntry(id);

  console.log('ENTRY', entry);

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
