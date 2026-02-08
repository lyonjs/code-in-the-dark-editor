import Image from 'next/image';
import { RegistrationForm } from '../components/registration-form/RegistrationForm';
import { FadeIn } from '../components/landing/FadeIn';
import {
  HeroAnimation,
  HeroStagger,
} from '../components/landing/HeroAnimation';
import styles from '../styles/landing.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code in the Dark — Front-end Competition Without Preview',
  description:
    'Code in the Dark is a front-end competition where developers reproduce a webpage from a reference image without any preview. Register now and test your skills!',
  openGraph: {
    title: 'Code in the Dark — Front-end Competition Without Preview',
    description:
      'A front-end coding competition where you build a webpage without seeing the result. No devtools, no live reload — just your skills.',
    images: ['/gallery/event-photo-3.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code in the Dark',
    description:
      'A front-end coding competition where you build a webpage without seeing the result.',
    images: ['/gallery/event-photo-3.jpg'],
  },
  keywords: [
    'Code in the Dark',
    'front-end competition',
    'coding challenge',
    'HTML CSS',
    'LyonJS',
    'live coding',
  ],
};

export default function Page() {
  return (
    <div className={styles.landing}>
      {/* ── 1. Hero ──────────────────────────────────── */}
      <section className={styles.hero} aria-label='Hero'>
        <HeroAnimation>
          <Image
            src='/codeinthedark.png'
            alt='Code in the Dark logo'
            width={200}
            height={200}
            className={styles.heroLogo}
            priority
          />
        </HeroAnimation>
        <HeroStagger index={0}>
          <h1 className={styles.heroTitle}>Code in the Dark</h1>
        </HeroStagger>
        <HeroStagger index={1}>
          <p className={styles.heroTagline}>
            A front-end competition where you code a webpage from a reference
            image — without any preview. No devtools, no live reload, just your
            skills and instinct.
          </p>
        </HeroStagger>
        <HeroStagger index={2}>
          <a href='#register' className={styles.heroCta} role='button'>
            Register Now
          </a>
        </HeroStagger>
      </section>

      <main>
        {/* ── 2. What is Code in the Dark? ─────────────── */}
        <section
          className={styles.section}
          id='about'
          aria-labelledby='about-title'
        >
          <FadeIn>
            <h2 className={styles.sectionTitle} id='about-title'>
              What is Code in the Dark?
            </h2>
          </FadeIn>
          <div className={styles.highlights}>
            {[
              {
                icon: '\u{1F648}',
                title: 'No Preview',
                text: 'You write HTML & CSS without ever seeing the result until the end.',
              },
              {
                icon: '\u{23F1}\uFE0F',
                title: '20 Minutes',
                text: 'You have exactly 20 minutes to reproduce the reference image as closely as possible.',
              },
              {
                icon: '\u{1F5F3}\uFE0F',
                title: 'Audience Votes',
                text: 'At the end, the audience votes for the best result. The crowd decides the winner!',
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.15}>
                <article className={styles.highlightCard}>
                  <span className={styles.highlightIcon} aria-hidden='true'>
                    {card.icon}
                  </span>
                  <strong>{card.title}</strong>
                  <p>{card.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── 3. Gallery ───────────────────────────────── */}
        <section
          className={styles.section}
          id='gallery'
          aria-labelledby='gallery-title'
        >
          <FadeIn>
            <h2 className={styles.sectionTitle} id='gallery-title'>
              Event Gallery
            </h2>
          </FadeIn>
          <div className={styles.gallery} role='list'>
            {[1, 2, 4, 5].map((n, i) => (
              <FadeIn key={n} delay={i * 0.1}>
                <div className={styles.galleryItem} role='listitem'>
                  <Image
                    src={`/gallery/event-photo-${n}.jpg`}
                    alt={`Code in the Dark event photo ${n}`}
                    width={400}
                    height={200}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── 4. Video ─────────────────────────────────── */}
        <section
          className={styles.section}
          id='video'
          aria-labelledby='video-title'
        >
          <FadeIn>
            <h2 className={styles.sectionTitle} id='video-title'>
              See it in Action
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className={styles.videoWrapper}>
              <iframe
                src='https://www.youtube.com/embed/4sDZ8nArSqM'
                title='Code in the Dark competition — live event video'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                loading='lazy'
              />
            </div>
          </FadeIn>
        </section>

        {/* ── 5. Rules ─────────────────────────────────── */}
        <section
          className={styles.section}
          id='rules'
          aria-labelledby='rules-title'
        >
          <FadeIn>
            <h2 className={styles.sectionTitle} id='rules-title'>
              Rules of the Game
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <ol className={styles.rules}>
              <li>
                Each competitor receives a <strong>reference image</strong> of a
                webpage to reproduce.
              </li>
              <li>
                You have <strong>20 minutes</strong> to write HTML &amp; CSS
                from scratch.
              </li>
              <li>
                <strong>No preview</strong> is allowed — you cannot see the
                result of your code until the end.
              </li>
              <li>
                <strong>No devtools</strong>, no external resources, no
                copy-pasting from outside the editor.
              </li>
              <li>
                When time is up, all results are displayed on a big screen and
                the <strong>audience votes</strong> for their favourite.
              </li>
              <li>
                The competitor with the <strong>most votes wins</strong> the
                round!
              </li>
            </ol>
          </FadeIn>
        </section>

        {/* ── 6. Registration ──────────────────────────── */}
        <section
          className={styles.registerSection}
          id='register'
          aria-labelledby='register-title'
        >
          <FadeIn>
            <h2 className={styles.sectionTitle} id='register-title'>
              Register
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <RegistrationForm />
          </FadeIn>
        </section>
      </main>

      {/* ── 7. Footer ────────────────────────────────── */}
      <footer className={styles.footer}>
        <Image
          src='/lyonjs-logo.svg'
          alt='LyonJS logo'
          width={120}
          height={36}
          className={styles.footerLogo}
        />
        <p className={styles.footerText}>
          Maintained by LyonJS — Open-source project
        </p>
      </footer>
    </div>
  );
}
