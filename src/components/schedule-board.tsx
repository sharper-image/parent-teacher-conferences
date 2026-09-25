import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NativeSelect } from "@/components/ui/input";
import { useConference } from "@/lib/store";
import { familyById, familyChipClass, familyLabel, studentLine, teacherById } from "@/lib/lookups";
import { slotCount, slotLabel, slotRangeLabel } from "@/lib/time";
import { cn } from "@/lib/utils";
import type { Family, Meeting, Teacher } from "@/lib/types";

type Tab = "grid" | "families" | "teachers";

export function ScheduleBoard() {
  const [tab, setTab] = useState<Tab>("grid");
  const settings = useConference((s) => s.settings);
  const teachers = useConference((s) => s.teachers);
  const families = useConference((s) => s.families);
  const schedule = useConference((s) => s.schedule);
  const stale = useConference((s) => s.stale);
  const generate = useConference((s) => s.generate);
  const stats = useConference((s) => s.stats)();
  const nSlots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-lg bg-surface-2 p-1">
          {(
            [
              ["grid", "Board"],
              ["families", "Families"],
              ["teachers", "Teachers"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "h-10 min-w-11 flex-1 rounded-md px-3 text-sm font-medium transition-colors duration-150 sm:flex-none",
                tab === id ? "bg-navy text-navy-fg" : "text-muted hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={generate}>{schedule ? "Rebuild" : "Build schedule"}</Button>
          <Button variant="secondary" asChild>
            <Link to="/print">
              <Printer className="size-4" />
              Print night
            </Link>
          </Button>
        </div>
      </div>

      {stale ? (
        <p className="mb-4 rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn">
          Teachers, families, or times changed. Rebuild so the board matches the roster.
        </p>
      ) : null}

      {!schedule ? (
        <div className="rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]">
          <p className="font-display text-xl font-semibold">Nothing on the board yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Add teachers and families, then build. Convene will refuse double-books and keep each
            family’s gaps under {settings.maxGapMinutes} minutes whenever it can.
          </p>
        </div>
      ) : nSlots <= 0 ? (
        <p className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger">
          The start and end times do not leave any slots. Fix the night window.
        </p>
      ) : (
        <>
          {stats ? (
            <p className="mb-4 text-sm text-muted">
              <span className="tabular-nums font-medium text-ink">
                {stats.placed}/{stats.requested}
              </span>{" "}
              meetings placed
              <span className="mx-2 text-line">·</span>
              longest wait{" "}
              <span className="tabular-nums font-medium text-ink">{Math.round(stats.maxIdle)} min</span>
              {stats.withGap ? (
                <>
                  <span className="mx-2 text-line">·</span>
                  <span className="text-warn">{stats.withGap} over the cap</span>
                </>
              ) : null}
            </p>
          ) : null}
          {tab === "grid" ? (
            <Grid teachers={teachers} families={families} nSlots={nSlots} />
          ) : null}
          {tab === "families" ? <FamilyItineraries /> : null}
          {tab === "teachers" ? <TeacherSheets /> : null}
        </>
      )}
    </div>
  );
}

function Grid({
  teachers,
  families,
  nSlots,
}: {
  teachers: Teacher[];
  families: Family[];
  nSlots: number;
}) {
  const settings = useConference((s) => s.settings);
  const schedule = useConference((s) => s.schedule)!;
  const selected = useConference((s) => s.selected);
  const selectMeeting = useConference((s) => s.selectMeeting);
  const moveSelectedTo = useConference((s) => s.moveSelectedTo);
  const legalSlots = useConference((s) => s.legalSlots);
  const [mobileTeacher, setMobileTeacher] = useState(teachers[0]?.id ?? "");

  const byKey = useMemo(() => {
    const map = new Map<string, Meeting>();
    for (const m of schedule.meetings) map.set(`${m.teacherId}:${m.slotIndex}`, m);
    return map;
  }, [schedule.meetings]);

  const legal = selected ? legalSlots() : [];

  const renderColumn = (teacher: Teacher) => (
    <div key={teacher.id} className="min-w-0">
      <div className="mb-2 px-1">
        <p className="truncate text-sm font-medium">{teacher.name}</p>
        <p className="truncate text-xs text-muted">
          {teacher.role} · {teacher.room}
        </p>
      </div>
      <ol className="flex flex-col gap-1">
        {Array.from({ length: nSlots }, (_, slot) => {
          const meeting = byKey.get(`${teacher.id}:${slot}`);
          const family = meeting ? familyById(families, meeting.familyId) : undefined;
          const isSelected =
            selected &&
            meeting &&
            selected.familyId === meeting.familyId &&
            selected.teacherId === meeting.teacherId &&
            selected.slotIndex === meeting.slotIndex;
          const isLegal =
            selected && selected.teacherId === teacher.id && legal.includes(slot) && !meeting;
          return (
            <li key={slot}>
              <button
                type="button"
                disabled={!meeting && !isLegal}
                onClick={() => {
                  if (meeting) {
                    if (isSelected) selectMeeting(null);
                    else
                      selectMeeting({
                        familyId: meeting.familyId,
                        teacherId: meeting.teacherId,
                        slotIndex: meeting.slotIndex,
                      });
                    return;
                  }
                  if (isLegal) moveSelectedTo(slot);
                }}
                className={cn(
                  "flex min-h-11 w-full items-center rounded-sm px-2 text-left text-xs transition-colors duration-150",
                  meeting && family
                    ? familyChipClass(family.id, "hover:opacity-90")
                    : "bg-surface-2 text-subtle",
                  isSelected && "ring-2 ring-ink ring-offset-2 ring-offset-bg",
                  isLegal && "bg-ok-soft text-ok ring-1 ring-ok/30",
                  !meeting && !isLegal && "cursor-default",
                )}
              >
                <span className="mr-2 w-16 shrink-0 tabular-nums text-[11px] opacity-80">
                  {slotLabel(settings.startTime, settings.slotMinutes, slot)}
                </span>
                <span className="truncate">
                  {family ? family.familyName : isLegal ? "Move here" : "Open"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );

  return (
    <div>
      {selected ? (
        <p className="mb-3 rounded-lg bg-surface px-3 py-2 text-sm text-muted shadow-[var(--shadow-border)]">
          Moving{" "}
          <span className="font-medium text-ink">
            {familyById(families, selected.familyId)?.familyName} family
          </span>{" "}
          with {teacherById(teachers, selected.teacherId)?.name}. Tap a highlighted open slot in
          this column, or tap the meeting again to cancel.
        </p>
      ) : (
        <p className="mb-3 text-sm text-muted">
          Tap a meeting to move it. Open slots stay empty so a teacher is never double-booked.
        </p>
      )}

      <div className="md:hidden">
        <label htmlFor="mobile-teacher" className="mb-1.5 block text-sm font-medium">
          Teacher
        </label>
        <NativeSelect
          id="mobile-teacher"
          value={mobileTeacher || teachers[0]?.id}
          onChange={(e) => setMobileTeacher(e.target.value)}
          className="mb-3"
        >
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </NativeSelect>
        {teachers
          .filter((t) => t.id === (mobileTeacher || teachers[0]?.id))
          .map(renderColumn)}
      </div>

      <div className="hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-4">
        {teachers.map(renderColumn)}
      </div>
    </div>
  );
}

export function FamilyItineraries() {
  const families = useConference((s) => s.families);
  const teachers = useConference((s) => s.teachers);
  const schedule = useConference((s) => s.schedule);
  const settings = useConference((s) => s.settings);
  if (!schedule) return null;

  return (
    <ul className="grid gap-3 lg:grid-cols-2">
      {families.map((family) => {
        const it = schedule.itineraries.find((i) => i.familyId === family.id);
        const meetings = it?.meetings ?? [];
        return (
          <li key={family.id} className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium">{familyLabel(family)}</p>
                <p className="text-sm text-muted">{studentLine(family)}</p>
              </div>
              {it?.violatesMaxGap ? (
                <Badge tone="warn">{it.maxGapMinutes} min wait</Badge>
              ) : meetings.length > 1 ? (
                <Badge tone="ok">{it?.idleMinutes ? `${it.idleMinutes} min idle` : "Packed"}</Badge>
              ) : null}
            </div>
            <ol className="mt-3 flex flex-col">
              {meetings.length === 0 ? (
                <li className="text-sm text-muted">No meetings placed.</li>
              ) : (
                meetings.map((m, idx) => {
                  const teacher = teacherById(teachers, m.teacherId);
                  const next = meetings[idx + 1];
                  const gap = next
                    ? (next.slotIndex - m.slotIndex - 1) * settings.slotMinutes
                    : 0;
                  return (
                    <li key={`${m.teacherId}-${m.slotIndex}`}>
                      <div className="flex gap-3 text-sm">
                        <span className="w-28 shrink-0 tabular-nums text-muted">
                          {slotRangeLabel(settings.startTime, settings.slotMinutes, m.slotIndex)}
                        </span>
                        <span>
                          <span className="font-medium">{teacher?.name}</span>
                          <span className="text-muted"> · {teacher?.room}</span>
                        </span>
                      </div>
                      {next && gap > 0 ? (
                        <p
                          className={cn(
                            "my-1 ml-28 text-xs",
                            gap > settings.maxGapMinutes ? "text-warn" : "text-subtle",
                          )}
                        >
                          {gap} min between meetings
                          {gap > settings.maxGapMinutes ? " — over the cap" : ""}
                        </p>
                      ) : next ? (
                        <p className="my-1 ml-28 text-xs text-subtle">Walk to next room</p>
                      ) : null}
                    </li>
                  );
                })
              )}
            </ol>
            {it && it.unscheduledTeacherIds.length > 0 ? (
              <p className="mt-3 text-xs text-danger">
                Could not place{" "}
                {it.unscheduledTeacherIds
                  .map((id) => teacherById(teachers, id)?.name ?? "Unknown")
                  .join(", ")}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function TeacherSheets() {
  const teachers = useConference((s) => s.teachers);
  const families = useConference((s) => s.families);
  const schedule = useConference((s) => s.schedule);
  const settings = useConference((s) => s.settings);
  const nSlots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
  if (!schedule) return null;

  return (
    <ul className="grid gap-3 lg:grid-cols-2">
      {teachers.map((teacher) => {
        const meetings = schedule.meetings
          .filter((m) => m.teacherId === teacher.id)
          .sort((a, b) => a.slotIndex - b.slotIndex);
        const bySlot = new Map(meetings.map((m) => [m.slotIndex, m]));
        return (
          <li key={teacher.id} className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
            <p className="font-medium">{teacher.name}</p>
            <p className="text-sm text-muted">
              {teacher.role} · {teacher.room}
            </p>
            <ol className="mt-3 space-y-1">
              {Array.from({ length: nSlots }, (_, slot) => {
                const m = bySlot.get(slot);
                const family = m ? familyById(families, m.familyId) : undefined;
                return (
                  <li key={slot} className="flex gap-3 text-sm">
                    <span className="w-16 shrink-0 tabular-nums text-muted">
                      {slotLabel(settings.startTime, settings.slotMinutes, slot)}
                    </span>
                    {family ? (
                      <span>
                        <span className="font-medium">{family.familyName}</span>
                        <span className="text-muted"> · {studentLine(family)}</span>
                      </span>
                    ) : (
                      <span className="text-subtle">Open</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ul>
  );
}
