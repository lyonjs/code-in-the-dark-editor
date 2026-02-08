import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Code in the Dark — Front-end Competition Without Preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #3a9364',
            borderRadius: '20px',
            padding: '60px 80px',
            width: '100%',
            height: '100%',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              color: '#3a9364',
              textAlign: 'center',
              margin: '0 0 24px 0',
              fontFamily: 'monospace',
              textShadow: '0 0 30px rgba(58, 147, 100, 0.5)',
            }}
          >
            Code in the Dark
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: '#ccc',
              textAlign: 'center',
              margin: '0 0 40px 0',
              maxWidth: '800px',
              lineHeight: 1.5,
              fontFamily: 'monospace',
            }}
          >
            A front-end competition where you code without preview.
            No devtools. No live reload. Just your skills.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              fontSize: '22px',
              fontFamily: 'monospace',
            }}
          >
            <span style={{ color: '#3a9364' }}>{'🙈 No Preview'}</span>
            <span style={{ color: '#3a9364' }}>{'⏱️ 20 Minutes'}</span>
            <span style={{ color: '#3a9364' }}>{'🗳️ Audience Votes'}</span>
          </div>
          <p
            style={{
              fontSize: '18px',
              color: '#666',
              margin: '40px 0 0 0',
              fontFamily: 'monospace',
            }}
          >
            Powered by LyonJS
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
