import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { request } from 'http';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const PATCH = async (request, { params }) => {
  const { content } = await request.json();
  const { id } = await params;
  console.log('PARAMS', params);
  const user = await getUserByClerkID();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updatedEntry.content);
  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  });

  revalidatePath(`/journal/${id}`);

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } });
};

export const DELETE = async (request, { params }) => {
  const user = await getUserByClerkID();
  const { id } = await params;

  const deleted = await prisma.journalEntry.delete({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
  });

  revalidatePath('/journal');

  return NextResponse.json({ data: deleted });
};
