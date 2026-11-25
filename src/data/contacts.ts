export interface Contact {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const contacts: Contact[] = [
  { label: 'Email',    value: 'illiamoor.work@gmail.com', href: 'mailto:illiamoor.work@gmail.com' },
  { label: 'Telegram', value: '@illiamoore',              href: 'https://t.me/illiamoore', external: true },
  { label: 'LinkedIn', value: 'illia-nanarov',            href: 'https://www.linkedin.com/in/illia-nanarov-3b233b441/', external: true },
  { label: 'GitHub',   value: 'IllyaMoore',               href: 'https://github.com/IllyaMoore', external: true },
];
