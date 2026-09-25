import type { Family, Teacher } from "@/lib/types";
import { familyChipIndex } from "@/lib/time";
import { cn } from "@/lib/utils";

export function teacherById(teachers: Teacher[], id: string): Teacher | undefined {
  return teachers.find((t) => t.id === id);
}

export function familyById(families: Family[], id: string): Family | undefined {
  return families.find((f) => f.id === id);
}

export function familyLabel(family: Family): string {
  return `${family.familyName} family`;
}

export function studentLine(family: Family): string {
  return `${family.student}, Grade ${family.grade}`;
}

const CHIP_BG = [
  "bg-chip-0",
  "bg-chip-1",
  "bg-chip-2",
  "bg-chip-3",
  "bg-chip-4",
  "bg-chip-5",
  "bg-chip-6",
  "bg-chip-7",
] as const;

export function familyChipClass(id: string, extra?: string): string {
  return cn(CHIP_BG[familyChipIndex(id)], "text-navy-fg", extra);
}
