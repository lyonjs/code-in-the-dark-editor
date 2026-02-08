# Code in the Dark - Editor

A modern, open-source editor for hosting [Code in the Dark](http://codeinthedark.com/) events, built with Next.js.

Code in the Dark is a front-end competition where contestants implement a webpage from a screenshot — without any preview, DevTools, or measurement tools. Once time runs out, the audience votes for the best result.

This project is a rewrite of the [original CoffeeScript editor](https://github.com/codeinthedark/codeinthedark.github.io) in Next.js, inspired by the [React rewrite by vLX42](https://github.com/vLX42/code-in-the-dark).

## Features

- **Registration** — Participants enter their name and join a session
- **Code editor** — Full-screen HTML/CSS editor with syntax highlighting (Ace)
- **Countdown timer** — Configurable time limit per round
- **Live preview** — Optional preview toggle per template
- **Reference image** — Accessible during the round for participants
- **Admin dashboard** — Browse and download all submissions
- **S3 storage** — Submissions are saved to any S3-compatible backend
- **Multiple templates** — Pre-configured templates with reference images and instructions
- **Training & competition modes** — Open practice or password-protected sessions

## Getting started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)
- An S3-compatible storage bucket (AWS, Scaleway, MinIO, etc.)

### Installation

```bash
pnpm install
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in your S3 credentials:

```
S3_ACCESS_KEY_ID=
S3_ACCESS_KEY=
S3_REGION=
S3_ENDPOINT=
S3_BUCKET_NAME=
NEXT_PUBLIC_BUCKET_URL=
```

### Configuration

Edit `config/templates.ts` to set up your event. Each template defines:

- `eventName` — Display name for the event
- `referenceImage` — Path to the target screenshot (place images in `public/templates/`)
- `instructions` — HTML instructions shown to participants
- `showPreview` — Whether participants can preview their result
- `private` — Whether the template requires a password to access
- `demoMode` — Enable for demonstration purposes

### Run

```bash
pnpm dev
```

## Hosting an event

1. **Prepare your templates** — Add reference images to `public/templates/` and configure them in `config/templates.ts`
2. **Deploy the app** — Any platform that supports Next.js (Vercel, Docker, etc.)
3. **Set up S3** — Configure your bucket and environment variables
4. **Share the URL** — Participants register at the root URL and enter the editor
5. **Use the admin view** — Access `/admin-view` to browse submissions after the round

For the best experience, have participants mirror their screen to an external monitor facing the audience.

## Credits

- [Code in the Dark](https://github.com/codeinthedark/codeinthedark.github.io) — The original competition concept and editor
- [vLX42/code-in-the-dark](https://github.com/vLX42/code-in-the-dark) — React rewrite that inspired this project
- [MHase/code-in-the-dark-uber-editor](https://github.com/MHase/code-in-the-dark-uber-editor) — CSS and rewrite ideas

## License

See [LICENSE](LICENSE) for details.
