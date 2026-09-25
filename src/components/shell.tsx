import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, LayoutGrid, Users, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConference } from "@/lib/store";
import { formatNightDateShort } from "@/lib/time";

const NAV = [
  { to: "/", label: "Night", icon: CalendarDays },
  { to: "/teachers", label: "Teachers", icon: GraduationCap },
  { to: "/families", label: "Families", icon: Users },
  { to: "/schedule", label: "Schedule", icon: LayoutGrid },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const settings = useConference((s) => s.settings);

  return (
    <div className="min-h-dvh">
      <header className="no-print border-b border-line/80 bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-baseline justify-between gap-4">
            <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ink">
              Convene
            </Link>
            <p className="hidden text-sm text-muted sm:block">
              {settings.schoolName || "Your school"}
              {settings.date ? ` · ${formatNightDateShort(settings.date)}` : ""}
            </p>
          </div>
          <nav className="grid grid-cols-4 gap-1 sm:flex sm:overflow-x-auto">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 min-w-0 items-center justify-center gap-1 rounded-md px-1.5 text-[11px] font-medium transition-colors duration-150 sm:min-w-11 sm:gap-2 sm:px-3 sm:text-sm",
                    active ? "bg-navy text-navy-fg" : "text-muted hover:bg-surface-2 hover:text-ink",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-1 text-xs font-medium tracking-[0.14em] text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {description ? <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
