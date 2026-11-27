import { CANONICAL_BASE } from '../config/site';

export const PERSON_ID = `${CANONICAL_BASE}/author#person`;

/** ProfilePage for /author, pointing at the Person defined in the sitewide graph. */
export function authorProfilePage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${CANONICAL_BASE}/author`,
    mainEntity: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Rituraj Verma',
      url: `${CANONICAL_BASE}/author`,
      image: `${CANONICAL_BASE}/dad.jpeg`,
    },
  };
}

/** BreadcrumbList from ordered [name, absolute URL] pairs. */
export function breadcrumbList(items: Array<[string, string]>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item })),
  };
}
