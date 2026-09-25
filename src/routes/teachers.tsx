import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { Shell, PageHeader } from "@/components/shell";
import { TeacherDialog } from "@/components/people-forms";
import { Button } from "@/components/ui/button";
import { useConference } from "@/lib/store";

export const Route = createFileRoute("/teachers")({ component: TeachersPage });

function TeachersPage() {
  const teachers = useConference((s) => s.teachers);
  const families = useConference((s) => s.families);
  const removeTeacher = useConference((s) => s.removeTeacher);

  return (
    <Shell>
      <PageHeader
        eyebrow="Roster"
        title="Teachers"
        description="Each teacher can sit with only one family at a time. Demand is how many families asked to see them."
        actions={
          <TeacherDialog
            trigger={
              <Button>
                <Plus className="size-4" />
                Add teacher
              </Button>
            }
          />
        }
      />

      {teachers.length === 0 ? (
        <Empty
          title="No teachers yet"
          body="Add the staff who will hold conferences, or load the Maplewood demo from Night."
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {teachers.map((teacher) => {
            const demand = families.filter((f) => f.teacherIds.includes(teacher.id)).length;
            return (
              <li
                key={teacher.id}
                className="flex items-start justify-between gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
              >
                <div>
                  <p className="font-medium text-ink">{teacher.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{teacher.role || "Teacher"}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-subtle">
                    <MapPin className="size-3.5" />
                    {teacher.room || "Room TBD"}
                    <span className="text-line">·</span>
                    <span className="tabular-nums">
                      {demand} {demand === 1 ? "family" : "families"}
                    </span>
                  </p>
                </div>
                <div className="flex gap-1">
                  <TeacherDialog
                    teacher={teacher}
                    trigger={
                      <Button variant="ghost" size="icon-sm" aria-label={`Edit ${teacher.name}`}>
                        <Pencil className="size-4" />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove ${teacher.name}`}
                    onClick={() => removeTeacher(teacher.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Shell>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]">
      <p className="font-display text-xl font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
    </div>
  );
}
