import Link from "next/link";
import { DATA } from "@/data/resume";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">Contact</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Open to internship opportunities, quant/fintech roles, and interesting
          conversations about markets and systems.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { name: "GitHub", url: DATA.contact.social.GitHub.url, Icon: Github, handle: "@tplaha01" },
          { name: "LinkedIn", url: DATA.contact.social.LinkedIn.url, Icon: Linkedin, handle: "taranplaha" },
          { name: "Email", url: `mailto:${DATA.contact.email}`, Icon: Mail, handle: DATA.contact.email },
        ].map(({ name, url, Icon, handle }) => (
          <Link
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-card hover:bg-accent/30 transition-all duration-200"
          >
            <Icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{name}</div>
              <div className="text-xs text-muted-foreground truncate">{handle}</div>
            </div>
            <ArrowUpRight className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}