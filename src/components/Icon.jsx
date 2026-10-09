const paths = {
  arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
  diagonal: <path d="M6 18 18 6M6 6h12v12" />,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  heart: <path d="M20.5 4.8a5.4 5.4 0 0 0-7.6 0l-.9.9-.9-.9a5.4 5.4 0 0 0-7.6 7.6L12 21l8.5-8.6a5.4 5.4 0 0 0 0-7.6Z" />,
  bag: <><path d="M5 7h14l1 14H4L5 7Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></>,
  tag: <><path d="m3 3 8 .1L21 13l-8 8L3 11V3Z" /><circle cx="7.5" cy="7.5" r="1" /></>,
  ticket: <><path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4V5Z" /><path d="M15 5v3m0 3v2m0 3v3" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  copy: <><rect x="8" y="8" width="12" height="13" rx="1" /><path d="M16 8V3H3v13h5" /></>,
  sparkles: <><path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z" /><path d="m20 2 .6 1.4L22 4l-1.4.6L20 6l-.6-1.4L18 4l1.4-.6L20 2Z" /></>,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.3 7a8 8 0 0 1 13.2-1L20 9M4 15l1.5 3A8 8 0 0 0 19 17" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
};
export default function Icon({ name, size = 20, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}
