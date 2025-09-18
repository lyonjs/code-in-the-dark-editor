import { list } from '@vercel/blob';

export default async function Page() {
  const response = await list();

  return (
    <>
      <ul>
        {response.blobs.map((blob) => (
          <li key={blob.pathname}><a  href={blob.downloadUrl}>
            {blob.pathname}
          </a></li>
        ))}
      </ul>

    </>
  );
}
