import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Shell, PageHeader } from "@/components/shell";
import { FamilyDialog } from "@/components/people-forms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConference } from "@/lib/store";
import { teacherById } from "@/lib/lookups";

export const Route = createFileRoute("/families")({ component: FamiliesPage });

function FamiliesPage() {
  const families = useConference((s) => s.families);
  const teachers = useConference((s) => s.teachers);
  const schedule = useConference((s) => s.schedule);
  const removeFamily = useConference((s) => s.removeFamily);

  return (
    <Shell>
      <PageHeader
        eyebrow="Roster"
        title="Families"
        description="Each family lists the teachers they need. Convene clusters those visits so the evening does not stall."
        actions={
          <FamilyDialog
            trigger={
              <Button>
                <Plus className="size-4" />
                Add family
              </Button>
            }
          />
        }
      />

      {families.length === 0 ? (
        <div className="rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]">
          <p className="font-display text-xl font-semibold">No families yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Add families and the teachers they need to see. Homeroom plus specialists is the usual mix.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {families.map((family) => {
            const it = schedule?.itineraries.find((i) => i.familyId === family.id);
            return (
              <li
                key={family.id}
                className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{family.familyName} family</p>
                    <p className="mt-0.5 text-sm text-muted">
                      {family.guardian ? `${family.guardian} · ` : ""}
                      {family.student}, Grade {family.grade}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <FamilyDialog
                      family={family}
                      trigger={
                        <Button variant="ghost" size="icon-sm" aria-label={`Edit ${family.familyName}`}>
                          <Pencil className="size-4" />
                        </Button>
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Remove ${family.familyName}`}
                      onClick={() => removeFamily(family.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {family.teacherIds.map((tid) => {
                    const t = teacherById(teachers, tid);
                    const missing = it?.unscheduledTeacherIds.includes(tid);
                    return (
                      <Badge key={tid} tone={missing ? "danger" : "ink"}>
                        {t?.name ?? "Unknown"}
                      </Badge>
                    );
                  })}
                </div>
                {it && it.meetings.length > 1 ? (
                  <p className="mt-3 text-xs text-muted">
                    Longest wait {it.maxGapMinutes} min
                    {it.violatesMaxGap ? " — over the cap" : ""}
                    {it.idleMinutes > 0 ? ` · ${it.idleMinutes} min idle overall` : " · back to back"}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </Shell>
  );
}
