import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/ThemeProvider';
import AppLayout from '@/components/Layout';
import type { Metadata } from 'next';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: { default: 'markers', template: '%s | markers' },
    description: 'A collection of useful tools',
    verification: {
        google: '5kEDEBa5sujnGomN2Fd4wuECVGq2pvHL7ECB-MTiBgU',
    },
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as 'ja' | 'en')) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
                />
            </head>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider>
                        <AppLayout>{children}</AppLayout>
                    </ThemeProvider>
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    );
}
