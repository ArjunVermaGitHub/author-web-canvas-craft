interface Props { title: string; tagline: string; intro?: string }
export default function PageHeader({ title, tagline, intro }: Props) {
  return <section className="page-header-band"><div className="site-container">
    <p className="eyebrow mb-5">{tagline}</p>
    <h1 className="page-title">{title}</h1>
    {intro && <p className="mt-5 text-lg text-secondary">{intro}</p>}
  </div></section>;
}
