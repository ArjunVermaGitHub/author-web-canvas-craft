import { Helmet } from 'react-helmet-async';

export const DEFAULT_SHARE_IMAGE = 'https://www.riturajverma.com/raghav-ebook-cover.jpg';

type SeoHeadProps = {
  title: string;
  description?: string;
  /** Absolute self-referencing URL; also used as og:url. */
  canonical?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
};

/** One place for per-page search and social tags so og:url always equals the canonical. */
export default function SeoHead({ title, description, canonical, image = DEFAULT_SHARE_IMAGE, noindex = false, jsonLd }: SeoHeadProps) {
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex && <meta name="robots" content="noindex" />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      {blocks.map((block, index) => <script key={index} type="application/ld+json">{JSON.stringify(block)}</script>)}
    </Helmet>
  );
}
