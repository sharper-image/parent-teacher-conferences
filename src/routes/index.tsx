import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock3,
  Users,
  GraduationCap,
  CalendarRange,
  AlertTriangle,
  Check,
} from "lucide-react";
import { Shell, PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useConference } from "@/lib/store";
import { formatMinutes, formatNightDate, minutesFromHm, slotCount } from "@/lib/time";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: NightPage });

function NightPage() {
  const settings = useConference((s) => s.settings);
  const setSettings = useConference((s) => s.setSettings);
  const teachers = useConference((s) => s.teachers);
  const families = useConference((s) => s.families);
  const schedule = useConference((s) => s.schedule);
  const stale = useConference((s) => s.stale);
  const generate = useConference((s) => s.generate);
  const loadDemo = useConference((s) => s.loadDemo);
  const resetEmpty = useConference((s) => s.resetEmpty);
  const stats = useConference((s) => s.stats)();
  const slots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
  const requested = families.reduce((n, f) => n + f.teacherIds.length, 0);

  return (
    <Shell>
      <PageHeader
        eyebrow="Conference night"
        title={settings.title || "Parent-teacher conferences"}
        description="Convene places every meeting so a teacher is never in two rooms at once, and each family’s evening stays compact — no more than 30 minutes between visits unless the roster makes that impossible."
        actions={
          <>
            <Button onClick={generate}>
              {schedule && !stale ? "Rebuild schedule" : "Build schedule"}
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/schedule">
                Open board
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </>
        }
      />

      <section className="rounded-xl bg-surface px-5 py-6 shadow-[var(--shadow-border)] sm:px-7 sm:py-8">
        <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
          {settings.schoolName || "Unnamed school"}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {settings.date ? formatNightDate(settings.date) : "Pick a date"}
        </h2>
        <p className="mt-2 text-muted">
          {formatMinutes(minutesFromHm(settings.startTime))} –{" "}
          {formatMinutes(minutesFromHm(settings.endTime))}
          <span className="mx-2 text-line">·</span>
          {settings.slotMinutes}-minute meetings
          <span className="mx-2 text-line">·</span>
          {slots} slots
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {stale ? (
            <Badge tone="warn">Roster changed — rebuild to refresh</Badge>
          ) : schedule ? (
            <Badge tone="ok">
              <Check className="size-3" />
              Schedule ready
            </Badge>
          ) : (
            <Badge>No schedule yet</Badge>
          )}
          {stats?.withGap ? (
            <Badge tone="warn">{stats.withGap} families over the wait cap</Badge>
          ) : schedule ? (
            <Badge tone="ok">All waits within {settings.maxGapMinutes} min</Badge>
          ) : null}
          {stats?.withMissing ? (
            <Badge tone="danger">{stats.withMissing} families missing a teacher</Badge>
          ) : null}
        </div>
      </section>

      <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat
          icon={Users}
          label="Families"
          value={String(families.length)}
          hint={`${requested} meetings requested`}
        />
        <Stat
          icon={GraduationCap}
          label="Teachers"
          value={String(teachers.length)}
          hint="One family at a time"
        />
        <Stat
          icon={CalendarRange}
          label="Placed"
          value={stats ? `${stats.placed}/${stats.requested}` : "—"}
          hint={stats?.teacherConflict ? "Teacher conflict" : "No double-books"}
          warn={Boolean(stats?.teacherConflict)}
        />
        <Stat
          icon={Clock3}
          label="Longest wait"
          value={stats ? `${Math.round(stats.maxIdle)} min` : "—"}
          hint={
            stats
              ? `Average ${Math.round(stats.avgIdle)} min between visits`
              : `Cap is ${settings.maxGapMinutes} min`
          }
          warn={Boolean(stats && stats.maxIdle > settings.maxGapMinutes)}
        />
      </dl>

      {schedule && (stats?.withGap || stats?.withMissing) ? (
        <IssueList />
      ) : null}

      <section className="mt-8 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <h2 className="font-display text-xl font-semibold tracking-tight">Night setup</h2>
        <p className="mt-1 mb-5 text-sm text-muted">
          Times, slot length, and the wait cap. Changing these marks the schedule out of date.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="School" htmlFor="school-name">
            <Input
              id="school-name"
              value={settings.schoolName}
              onChange={(e) => setSettings({ schoolName: e.target.value })}
              placeholder="Maplewood Elementary"
            />
          </Field>
          <Field label="Event name" htmlFor="event-title">
            <Input
              id="event-title"
              value={settings.title}
              onChange={(e) => setSettings({ title: e.target.value })}
              placeholder="Fall Conferences"
            />
          </Field>
          <Field label="Date" htmlFor="event-date">
            <Input
              id="event-date"
              type="date"
              value={settings.date}
              onChange={(e) => setSettings({ date: e.target.value })}
            />
          </Field>
          <Field label="Start" htmlFor="start-time">
            <Input
              id="start-time"
              type="time"
              value={settings.startTime}
              onChange={(e) => setSettings({ startTime: e.target.value })}
            />
          </Field>
          <Field label="End" htmlFor="end-time">
            <Input
              id="end-time"
              type="time"
              value={settings.endTime}
              onChange={(e) => setSettings({ endTime: e.target.value })}
            />
          </Field>
          <Field label="Meeting length" htmlFor="slot-minutes">
            <NativeSelect
              id="slot-minutes"
              value={String(settings.slotMinutes)}
              onChange={(e) => setSettings({ slotMinutes: Number(e.target.value) })}
            >
              {[10, 15, 20, 30].map((n) => (
                <option key={n} value={n}>
                  {n} minutes
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Max wait between meetings" htmlFor="max-gap">
            <NativeSelect
              id="max-gap"
              value={String(settings.maxGapMinutes)}
              onChange={(e) => setSettings({ maxGapMinutes: Number(e.target.value) })}
            >
              {[15, 30, 45, 60].map((n) => (
                <option key={n} value={n}>
                  {n} minutes
                </option>
              ))}
            </NativeSelect>
          </Field>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="secondary" type="button" onClick={loadDemo}>
            Load Maplewood demo
          </Button>
          <Button variant="ghost" type="button" onClick={resetEmpty}>
            Start empty
          </Button>
        </div>
      </section>
    </Shell>
  );
}

function IssueList() {
  const schedule = useConference((s) => s.schedule);
  const families = useConference((s) => s.families);
  const teachers = useConference((s) => s.teachers);
  const settings = useConference((s) => s.settings);
  if (!schedule) return null;
  const issues = schedule.itineraries.filter(
    (it) => it.violatesMaxGap || it.unscheduledTeacherIds.length > 0,
  );
  if (issues.length === 0) return null;
  return (
    <section className="mt-5 rounded-xl bg-warn-soft/60 p-5">
      <div className="flex items-center gap-2 text-warn">
        <AlertTriangle className="size-4" />
        <h2 className="text-sm font-semibold">Needs a look</h2>
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {issues.map((it) => {
          const family = families.find((f) => f.id === it.familyId);
          if (!family) return null;
          const bits: string[] = [];
          if (it.violatesMaxGap) {
            bits.push(`longest wait ${it.maxGapMinutes} min (cap ${settings.maxGapMinutes})`);
          }
          if (it.unscheduledTeacherIds.length) {
            const names = it.unscheduledTeacherIds
              .map((id) => teachers.find((t) => t.id === id)?.name ?? "Unknown")
              .join(", ");
            bits.push(`could not place ${names}`);
          }
          return (
            <li key={it.familyId} className="text-ink">
              <span className="font-medium">{family.familyName} family</span>
              <span className="text-muted"> — {bits.join("; ")}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
  warn,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  hint: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
      <div className="flex items-center gap-2 text-muted">
        <Icon className="size-4" />
        <dt className="text-xs font-medium tracking-wide uppercase">{label}</dt>
      </div>
      <dd className={cn("mt-2 font-display text-3xl font-semibold tabular-nums", warn && "text-warn")}>
        {value}
      </dd>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
