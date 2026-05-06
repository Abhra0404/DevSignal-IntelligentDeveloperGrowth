const REPO_BASE = 'https://github.com/tarunyaio/DevSignal-IntelligentDeveloperGrowth';

export interface FooterLink {
  label: string;
  href: string;
  /** true = internal route (uses react-router), false = external (opens new tab) */
  internal: boolean;
  italic?: boolean;
}

export const footerLinks: FooterLink[] = [
  {
    label: 'License',
    href: `${REPO_BASE}?tab=License-1-ov-file`,
    internal: false,
  },
  {
    label: 'Contributing',
    href: `${REPO_BASE}/blob/main/CONTRIBUTING.md`,
    internal: false,
    italic: true,
  },
  {
    label: 'GitHub',
    href: REPO_BASE,
    internal: false,
  },
];
