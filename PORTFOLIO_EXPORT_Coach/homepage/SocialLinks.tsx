import type { SocialLink } from "@/lib/types";

const paths: Record<string, string> = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm5.6-1.4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  tiktok:
    "M15 2h2.6a5.4 5.4 0 0 0 4.4 4.4V9a8 8 0 0 1-4.4-1.5v6.9a6.4 6.4 0 1 1-6.4-6.4c.3 0 .6 0 .9.1v2.7a3.7 3.7 0 1 0 2.9 3.6V2Z",
  whatsapp:
    "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.3A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1-1.4-1-2.7 0-1.3.6-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5-.3.3c-.1.1-.2.3 0 .6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.2.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l2 1c.2.1.4.2.4.3.1.2.1.6 0 1.2Z",
  email: "M2 5h20v14H2V5Zm2 2v.3l8 5 8-5V7H4Z",
  facebook: "M13 22v-8h3l.5-3.5H13V8.4c0-1 .3-1.7 1.7-1.7H17V3.6A22 22 0 0 0 14.6 3.5C12 3.5 10 5 10 8v2.5H7V14h3v8h3Z",
  youtube:
    "M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 1.5.5 7.8.5 7.8.5s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12ZM10 15V9l5 3-5 3Z",
};

const fallback = "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3.5A6.5 6.5 0 1 1 5.5 12 6.5 6.5 0 0 1 12 5.5Z";

export function SocialIcon({ platform, className = "size-5" }: { platform: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={paths[platform.toLowerCase()] ?? fallback} />
    </svg>
  );
}

export function SocialLinks({
  links,
  className = "",
  iconClass = "size-5",
}: {
  links: SocialLink[];
  className?: string;
  iconClass?: string;
}) {
  if (links.length === 0) return null;
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer me"
            className="block text-ink-soft transition-colors hover:text-iris"
          >
            <SocialIcon platform={link.platform} className={iconClass} />
            <span className="sr-only">{link.label || link.platform}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
