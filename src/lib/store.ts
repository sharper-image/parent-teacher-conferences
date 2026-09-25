import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  buildSchedule,
  legalSlotsForMove,
  moveMeeting,
  scheduleStats,
} from "@/lib/scheduler";
import { makeSeedSchedule, seedFamilies, seedSettings, seedTeachers } from "@/lib/seed";
import { slotCount } from "@/lib/time";
import type { Family, NightSettings, ScheduleResult, Teacher } from "@/lib/types";
import { nid } from "@/lib/utils";

type ConferenceState = {
  settings: NightSettings;
  teachers: Teacher[];
  families: Family[];
  schedule: ScheduleResult | null;
  stale: boolean;
  selected: { familyId: string; teacherId: string; slotIndex: number } | null;
  setSettings: (patch: Partial<NightSettings>) => void;
  addTeacher: (input: Omit<Teacher, "id">) => void;
  updateTeacher: (id: string, patch: Partial<Omit<Teacher, "id">>) => void;
  removeTeacher: (id: string) => void;
  addFamily: (input: Omit<Family, "id">) => void;
  updateFamily: (id: string, patch: Partial<Omit<Family, "id">>) => void;
  removeFamily: (id: string) => void;
  generate: () => void;
  clearSchedule: () => void;
  selectMeeting: (
    sel: { familyId: string; teacherId: string; slotIndex: number } | null,
  ) => void;
  moveSelectedTo: (slotIndex: number) => boolean;
  legalSlots: () => number[];
  loadDemo: () => void;
  resetEmpty: () => void;
  stats: () => ReturnType<typeof scheduleStats> | null;
};

function withStale<T extends { stale: boolean; selected: unknown }>(
  set: (partial: Partial<T> | ((s: T) => Partial<T>)) => void,
  patch: Partial<T>,
) {
  set({ ...patch, stale: true, selected: null } as Partial<T>);
}

const emptyNight: NightSettings = {
  schoolName: "",
  title: "Parent-Teacher Conferences",
  date: "2026-10-22",
  startTime: "16:00",
  endTime: "19:00",
  slotMinutes: 15,
  maxGapMinutes: 30,
};

export const useConference = create<ConferenceState>()(
  persist(
    (set, get) => ({
      settings: seedSettings,
      teachers: seedTeachers,
      families: seedFamilies,
      schedule: makeSeedSchedule(),
      stale: false,
      selected: null,

      setSettings: (patch) =>
        withStale(set, { settings: { ...get().settings, ...patch } }),

      addTeacher: (input) =>
        withStale(set, {
          teachers: [...get().teachers, { ...input, id: nid("t") }],
        }),

      updateTeacher: (id, patch) =>
        withStale(set, {
          teachers: get().teachers.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        }),

      removeTeacher: (id) =>
        withStale(set, {
          teachers: get().teachers.filter((t) => t.id !== id),
          families: get().families.map((f) => ({
            ...f,
            teacherIds: f.teacherIds.filter((tid) => tid !== id),
          })),
        }),

      addFamily: (input) =>
        withStale(set, {
          families: [...get().families, { ...input, id: nid("f") }],
        }),

      updateFamily: (id, patch) =>
        withStale(set, {
          families: get().families.map((f) => (f.id === id ? { ...f, ...patch } : f)),
        }),

      removeFamily: (id) =>
        withStale(set, {
          families: get().families.filter((f) => f.id !== id),
        }),

      generate: () => {
        const { teachers, families, settings } = get();
        set({
          schedule: buildSchedule(teachers, families, settings),
          stale: false,
          selected: null,
        });
      },

      clearSchedule: () => set({ schedule: null, stale: true, selected: null }),

      selectMeeting: (selected) => set({ selected }),

      moveSelectedTo: (slotIndex) => {
        const { schedule, families, settings, selected } = get();
        if (!schedule || !selected) return false;
        const next = moveMeeting(
          schedule,
          families,
          settings,
          selected.familyId,
          selected.teacherId,
          selected.slotIndex,
          slotIndex,
        );
        if (!next) return false;
        set({
          schedule: next,
          selected: { ...selected, slotIndex },
          stale: false,
        });
        return true;
      },

      legalSlots: () => {
        const { schedule, settings, selected } = get();
        if (!schedule || !selected) return [];
        const n = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
        return legalSlotsForMove(
          schedule.meetings,
          selected.familyId,
          selected.teacherId,
          selected.slotIndex,
          n,
        );
      },

      loadDemo: () =>
        set({
          settings: seedSettings,
          teachers: seedTeachers,
          families: seedFamilies,
          schedule: makeSeedSchedule(),
          stale: false,
          selected: null,
        }),

      resetEmpty: () =>
        set({
          settings: emptyNight,
          teachers: [],
          families: [],
          schedule: null,
          stale: true,
          selected: null,
        }),

      stats: () => {
        const { schedule, families } = get();
        if (!schedule) return null;
        return scheduleStats(schedule, families);
      },
    }),
    {
      name: "convene-night-v1",
      partialize: (s) => ({
        settings: s.settings,
        teachers: s.teachers,
        families: s.families,
        schedule: s.schedule,
        stale: s.stale,
      }),
      skipHydration: true,
    },
  ),
);

let hydrateStarted = false;

export function rehydrateConference() {
  if (hydrateStarted) return;
  hydrateStarted = true;
  void useConference.persist.rehydrate();
}
