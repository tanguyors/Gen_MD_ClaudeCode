import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LocaleProvider } from '@/lib/i18n';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = 'https://gen-md-claude-code.vercel.app';

export const metadata: Metadata = {
  title: 'ClaudeMD Generator — Build CLAUDE.md Files for AI Coding Agents',
  description:
    'Generate high-quality CLAUDE.md files from a guided questionnaire. Give your AI coding agents the context they need — stack, rules, architecture, and commands — in one structured file.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  keywords: [
    'CLAUDE.md',
    'ClaudeMD',
    'AI coding agent',
    'Claude',
    'Cursor',
    'Copilot',
    'developer tools',
    'code generation',
    'project context',
    'structured instructions',
  ],
  openGraph: {
    type: 'website',
    siteName: 'ClaudeMD Generator',
    title: 'ClaudeMD Generator — Build CLAUDE.md Files for AI Coding Agents',
    description:
      'Turn your project context into structured, actionable instructions for AI coding agents. 27-section guided questionnaire with optional GPT-4o enhancement.',
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClaudeMD Generator — Build CLAUDE.md Files for AI Coding Agents',
    description:
      'Turn your project context into structured, actionable instructions for AI coding agents. 27-section guided questionnaire with optional GPT-4o enhancement.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'ClaudeMD Generator',
                url: SITE_URL,
                description:
                  'Generate high-quality CLAUDE.md files from a guided questionnaire for AI coding agents.',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                creator: {
                  '@type': 'Organization',
                  name: 'ClaudeMD Generator',
                  url: SITE_URL,
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is a CLAUDE.md file?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'A CLAUDE.md is a structured markdown file placed at the root of your project. AI coding agents like Claude, Cursor, and Copilot read it before working to understand your stack, conventions, architecture, and rules.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Do I need technical knowledge to use ClaudeMD Generator?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Not at all. The questionnaire guides you step by step with smart defaults and contextual options. For technical sections, you can use the "Let Claude Decide" button to let the AI agent figure it out.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is my project data safe?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. All answers are stored locally in your browser (localStorage). There is no database, no user accounts, and no server-side persistence.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is ClaudeMD Generator free?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Completely free. The core generation works 100% locally. GPT-4o enhancement is optional and uses your own OpenAI key.',
                    },
                  },
                ],
              },
            ]),
          }}
        />
        <LocaleProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </LocaleProvider>
      </body>
    </html>
  );
}
