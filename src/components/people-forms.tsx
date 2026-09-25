import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input, NativeSelect } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConference } from "@/lib/store";
import type { Family, Teacher } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TeacherDialog({
  teacher,
  trigger,
}: {
  teacher?: Teacher;
  trigger: React.ReactNode;
}) {
  const addTeacher = useConference((s) => s.addTeacher);
  const updateTeacher = useConference((s) => s.updateTeacher);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(teacher?.name ?? "");
  const [role, setRole] = useState(teacher?.role ?? "");
  const [room, setRoom] = useState(teacher?.room ?? "");

  const onOpen = (next: boolean) => {
    setOpen(next);
    if (next) {
      setName(teacher?.name ?? "");
      setRole(teacher?.role ?? "");
      setRoom(teacher?.room ?? "");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        title={teacher ? "Edit teacher" : "Add teacher"}
        description="Name, subject or grade, and room — used on itineraries."
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const payload = { name: name.trim(), role: role.trim(), room: room.trim() };
            if (!payload.name) return;
            if (teacher) updateTeacher(teacher.id, payload);
            else addTeacher(payload);
            setOpen(false);
          }}
        >
          <Field label="Name" htmlFor="teacher-name">
            <Input
              id="teacher-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Avery Chen"
            />
          </Field>
          <Field label="Role / subject" htmlFor="teacher-role">
            <Input
              id="teacher-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Grade 2 Homeroom"
            />
          </Field>
          <Field label="Room" htmlFor="teacher-room">
            <Input
              id="teacher-room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Room 12"
            />
          </Field>
          <Button type="submit" className="mt-1 w-full sm:w-auto sm:self-end">
            {teacher ? "Save" : "Add teacher"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function FamilyDialog({
  family,
  trigger,
}: {
  family?: Family;
  trigger: React.ReactNode;
}) {
  const teachers = useConference((s) => s.teachers);
  const addFamily = useConference((s) => s.addFamily);
  const updateFamily = useConference((s) => s.updateFamily);
  const [open, setOpen] = useState(false);
  const [familyName, setFamilyName] = useState(family?.familyName ?? "");
  const [guardian, setGuardian] = useState(family?.guardian ?? "");
  const [student, setStudent] = useState(family?.student ?? "");
  const [grade, setGrade] = useState(family?.grade ?? "2");
  const [teacherIds, setTeacherIds] = useState<string[]>(family?.teacherIds ?? []);

  const onOpen = (next: boolean) => {
    setOpen(next);
    if (next) {
      setFamilyName(family?.familyName ?? "");
      setGuardian(family?.guardian ?? "");
      setStudent(family?.student ?? "");
      setGrade(family?.grade ?? "2");
      setTeacherIds(family?.teacherIds ?? []);
    }
  };

  const toggleTeacher = (id: string) => {
    setTeacherIds((curr) => (curr.includes(id) ? curr.filter((t) => t !== id) : [...curr, id]));
  };

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        title={family ? "Edit family" : "Add family"}
        description="Choose every teacher this family needs to see. Convene will pack those meetings tightly."
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const payload = {
              familyName: familyName.trim(),
              guardian: guardian.trim(),
              student: student.trim(),
              grade,
              teacherIds,
            };
            if (!payload.familyName || !payload.student) return;
            if (family) updateFamily(family.id, payload);
            else addFamily(payload);
            setOpen(false);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Family name" htmlFor="family-name">
              <Input
                id="family-name"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                required
                placeholder="Ruiz"
              />
            </Field>
            <Field label="Guardian" htmlFor="family-guardian">
              <Input
                id="family-guardian"
                value={guardian}
                onChange={(e) => setGuardian(e.target.value)}
                placeholder="Alex Ruiz"
              />
            </Field>
            <Field label="Student" htmlFor="family-student">
              <Input
                id="family-student"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                required
                placeholder="Elena"
              />
            </Field>
            <Field label="Grade" htmlFor="family-grade">
              <NativeSelect id="family-grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
                {["K", "1", "2", "3", "4", "5", "6"].map((g) => (
                  <option key={g} value={g}>
                    {g === "K" ? "Kindergarten" : `Grade ${g}`}
                  </option>
                ))}
              </NativeSelect>
            </Field>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Teachers to see</p>
            {teachers.length === 0 ? (
              <p className="text-sm text-muted">Add teachers first, then come back to this list.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {teachers.map((t) => {
                  const on = teacherIds.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleTeacher(t.id)}
                      className={cn(
                        "h-11 rounded-full px-3 text-sm font-medium transition-colors duration-150",
                        on ? "bg-navy text-navy-fg" : "bg-surface-2 text-ink hover:bg-line",
                      )}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <Button type="submit" className="mt-1 w-full sm:w-auto sm:self-end">
            {family ? "Save" : "Add family"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
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
