import { Helmet, HelmetProvider } from 'react-helmet-async'

export function SEO({ title, description, canonical }: { title: string; description?: string; canonical?: string }) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  )
}

export { HelmetProvider }
