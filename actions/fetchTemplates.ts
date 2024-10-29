'use server';
import { Client, Databases, Models, Query } from 'node-appwrite';
import { TemplateInformations } from '../config/templates';

const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID!;
const APPWRITE_DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
const APPWRITE_COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID!;
const APPWRITE_READ_TOKEN = process.env.APPWRITE_READ_TOKEN!;

const client = new Client()
  .setKey(APPWRITE_READ_TOKEN)
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export default async function fetchTemplates(): Promise<
  TemplateInformations[]
> {
  const promise = await databases.listDocuments<
    Models.Document & Omit<TemplateInformations, 'eventId'> & { show: boolean }
  >(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, [Query.equal('show', true)]);
  return promise.documents.map(
    ({
      eventName,
      referenceImage,
      instructions,
      showPreview,
      demoMode,
      injectCode,
      $id,
    }) => ({
      eventId: $id,
      eventName,
      referenceImage,
      instructions,
      showPreview,
      demoMode,
      injectCode,
    })
  );
}
