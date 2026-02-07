import { NextResponse } from 'next/server';
import { Temporal } from 'temporal-polyfill';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';

const {
  S3_REGION,
  S3_ACCESS_KEY,
  S3_ACCESS_KEY_ID,
  S3_ENDPOINT,
  S3_BUCKET_NAME,
} = process.env;

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const fullName = searchParams.get('fullName')!;
  const end = !!searchParams.get('end')!;
  const date = Temporal.Now.plainDateISO();
  const formattedDate = date.toString();

  const fileName = `${formattedDate}/${fullName}/${end ? 'END' : Date.now()}.html`;

  const s3Client = new S3Client({
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID!,
      secretAccessKey: S3_ACCESS_KEY!,
    },
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    forcePathStyle: true,
  });

  const arrayBuffer = await request.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const params = {
    Bucket: S3_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: 'text/html; charset=utf-8',
    ContentLength: buffer.length,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return NextResponse.json({ message: 'Success', fileName });
  } catch (err) {
    console.error('Error upload S3', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function GET() {
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID!,
      secretAccessKey: S3_ACCESS_KEY!,
    },
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    forcePathStyle: true,
  });

  try {
    const data = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: S3_BUCKET_NAME!,
      })
    );

    const files = data.Contents || [];
    const tree: Record<string, Record<string, string[]>> = {};

    files.forEach((file) => {
      if (!file.Key) return;
      // On split /DATE/NOM/FICHIER
      const parts = file.Key.split('/');
      if (parts.length < 3) return; // sécurité
      const date = parts[0];
      const name = parts[1];
      const filename = parts.slice(2).join('/'); // ex END.html ou sous-dossiers

      if (!tree[date]) tree[date] = {};
      if (!tree[date][name]) tree[date][name] = [];
      tree[date][name].push(filename);
    });

    return NextResponse.json({ tree });
  } catch (err) {
    console.error('Erreur listage bucket', err);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
}
