import type {
  Family,
  FamilyItinerary,
  Meeting,
  NightSettings,
  ScheduleResult,
  Teacher,
  Unscheduled,
} from "@/lib/types";
import { idleBetweenSlots, slotCount } from "@/lib/time";

type Occupancy = {
  teacher: Map<string, Set<number>>;
  family: Map<string, Set<number>>;
};

function emptyOcc(): Occupancy {
  return { teacher: new Map(), family: new Map() };
}

function take(occ: Occupancy, teacherId: string, familyId: string, slot: number) {
  let t = occ.teacher.get(teacherId);
  if (!t) {
    t = new Set();
    occ.teacher.set(teacherId, t);
  }
  let f = occ.family.get(familyId);
  if (!f) {
    f = new Set();
    occ.family.set(familyId, f);
  }
  t.add(slot);
  f.add(slot);
}

function teacherFree(occ: Occupancy, teacherId: string, slot: number): boolean {
  return !occ.teacher.get(teacherId)?.has(slot);
}

function familyFree(occ: Occupancy, familyId: string, slot: number): boolean {
  return !occ.family.get(familyId)?.has(slot);
}

function combinations(n: number, k: number): number[][] {
  const out: number[][] = [];
  if (k <= 0 || k > n) return out;
  const cur: number[] = [];
  const rec = (start: number) => {
    if (cur.length === k) {
      out.push(cur.slice());
      return;
    }
    const need = k - cur.length;
    for (let i = start; i <= n - need; i++) {
      cur.push(i);
      rec(i + 1);
      cur.pop();
    }
  };
  rec(0);
  return out;
}

function nCk(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
}

function comboGaps(slots: number[], slotMinutes: number): { idle: number; maxGap: number } {
  if (slots.length <= 1) return { idle: 0, maxGap: 0 };
  let idle = 0;
  let maxGap = 0;
  for (let i = 1; i < slots.length; i++) {
    const g = idleBetweenSlots(slots[i - 1]!, slots[i]!, slotMinutes);
    idle += g;
    if (g > maxGap) maxGap = g;
  }
  return { idle, maxGap };
}

function matchTeachersToSlots(
  teacherIds: string[],
  slots: number[],
  occ: Occupancy,
): Map<string, number> | null {
  const n = teacherIds.length;
  if (n !== slots.length) return null;
  const slotOf = new Array<number>(n).fill(-1);
  const teacherOfSlot = new Array<number>(slots.length).fill(-1);

  const dfs = (ti: number, seen: boolean[]): boolean => {
    for (let si = 0; si < slots.length; si++) {
      if (seen[si]) continue;
      const slot = slots[si]!;
      const tid = teacherIds[ti]!;
      if (!teacherFree(occ, tid, slot)) continue;
      seen[si] = true;
      if (teacherOfSlot[si] === -1 || dfs(teacherOfSlot[si]!, seen)) {
        teacherOfSlot[si] = ti;
        slotOf[ti] = si;
        return true;
      }
    }
    return false;
  };

  for (let ti = 0; ti < n; ti++) {
    const seen = Array.from({ length: slots.length }, () => false);
    if (!dfs(ti, seen)) return null;
  }

  const result = new Map<string, number>();
  for (let ti = 0; ti < n; ti++) {
    const si = slotOf[ti]!;
    result.set(teacherIds[ti]!, slots[si]!);
  }
  return result;
}

type Pack = { assignment: Map<string, number>; idle: number; maxGap: number; start: number };

function packTeachers(
  teacherIds: string[],
  nSlots: number,
  slotMinutes: number,
  maxGapMinutes: number,
  occ: Occupancy,
  allowGapViolation: boolean,
): Pack | null {
  const k = teacherIds.length;
  if (k === 0) return { assignment: new Map(), idle: 0, maxGap: 0, start: 0 };
  if (k > nSlots) return null;

  const combos = nCk(nSlots, k) <= 20000 ? combinations(nSlots, k) : null;
  const state: { best: Pack | null } = { best: null };

  const consider = (slots: number[]) => {
    const { idle, maxGap } = comboGaps(slots, slotMinutes);
    if (!allowGapViolation && maxGap > maxGapMinutes) return;
    const current = state.best;
    if (current) {
      if (!allowGapViolation) {
        if (idle > current.idle) return;
        if (idle === current.idle && slots[0]! >= current.start) return;
      } else {
        const bViol = current.maxGap > maxGapMinutes ? 1 : 0;
        const v = maxGap > maxGapMinutes ? 1 : 0;
        if (v > bViol) return;
        if (v === bViol && idle > current.idle) return;
        if (v === bViol && idle === current.idle && slots[0]! >= current.start) return;
      }
    }
    const assignment = matchTeachersToSlots(teacherIds, slots, occ);
    if (!assignment) return;
    state.best = { assignment, idle, maxGap, start: slots[0]! };
  };

  if (combos) {
    for (const slots of combos) consider(slots);
    return state.best;
  }

  const maxEmpty = Math.floor(maxGapMinutes / slotMinutes);
  const maxWin = allowGapViolation ? nSlots : Math.min(nSlots, k + Math.max(0, k - 1) * maxEmpty);
  for (let win = k; win <= maxWin; win++) {
    for (let start = 0; start + win <= nSlots; start++) {
      const windowSlots: number[] = [];
      for (let s = start; s < start + win; s++) windowSlots.push(s);
      const assignment = matchTeachersToSlots(
        teacherIds,
        windowSlots.length === k
          ? windowSlots
          : pickFreeSlots(teacherIds, windowSlots, occ, k),
        occ,
      );
      if (!assignment) continue;
      const slots = [...assignment.values()].sort((a, b) => a - b);
      consider(slots);
    }
    if (state.best && !allowGapViolation && state.best.idle === 0) return state.best;
  }
  return state.best;
}

function pickFreeSlots(
  teacherIds: string[],
  windowSlots: number[],
  occ: Occupancy,
  k: number,
): number[] {
  const usable = windowSlots.filter((s) =>
    teacherIds.some((tid) => teacherFree(occ, tid, s)),
  );
  if (usable.length <= k) return usable;
  return usable.slice(0, k);
}

function teacherDemand(families: Family[]): Map<string, number> {
  const d = new Map<string, number>();
  for (const f of families) {
    for (const tid of f.teacherIds) d.set(tid, (d.get(tid) ?? 0) + 1);
  }
  return d;
}

function uniqueIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

function packFamily(
  family: Family,
  nSlots: number,
  slotMinutes: number,
  maxGapMinutes: number,
  occ: Occupancy,
): { assignment: Map<string, number>; leftover: string[] } {
  const teachers = uniqueIds(family.teacherIds);
  if (teachers.length === 0) return { assignment: new Map(), leftover: [] };

  const tight = packTeachers(teachers, nSlots, slotMinutes, maxGapMinutes, occ, false);
  if (tight) return { assignment: tight.assignment, leftover: [] };

  const relaxed = packTeachers(teachers, nSlots, slotMinutes, maxGapMinutes, occ, true);
  if (relaxed) return { assignment: relaxed.assignment, leftover: [] };

  for (let keep = teachers.length - 1; keep >= 1; keep--) {
    let best: { assignment: Map<string, number>; leftover: string[]; idle: number; start: number } | null =
      null;
    const combos = combinations(teachers.length, keep);
    for (const idx of combos) {
      const subset = idx.map((i) => teachers[i]!);
      const leftover = teachers.filter((t) => !subset.includes(t));
      const packed = packTeachers(subset, nSlots, slotMinutes, maxGapMinutes, occ, false)
        ?? packTeachers(subset, nSlots, slotMinutes, maxGapMinutes, occ, true);
      if (!packed) continue;
      if (
        !best ||
        packed.idle < best.idle ||
        (packed.idle === best.idle && packed.start < best.start)
      ) {
        best = { assignment: packed.assignment, leftover, idle: packed.idle, start: packed.start };
      }
    }
    if (best) return best;
  }

  return { assignment: new Map(), leftover: teachers };
}

function repairUnscheduled(
  leftover: Unscheduled[],
  occ: Occupancy,
  nSlots: number,
  slotMinutes: number,
  maxGapMinutes: number,
): { placed: Meeting[]; still: Unscheduled[] } {
  const placed: Meeting[] = [];
  const still: Unscheduled[] = [];

  for (const item of leftover) {
    const familySlots = [...(occ.family.get(item.familyId) ?? [])].sort((a, b) => a - b);
    let bestSlot: number | null = null;
    let bestScore = Infinity;

    for (let s = 0; s < nSlots; s++) {
      if (!teacherFree(occ, item.teacherId, s)) continue;
      if (!familyFree(occ, item.familyId, s)) continue;
      const next = [...familySlots, s].sort((a, b) => a - b);
      const { idle, maxGap } = comboGaps(next, slotMinutes);
      const viol = maxGap > maxGapMinutes ? 1 : 0;
      const score = viol * 10000 + idle * 100 + s;
      if (score < bestScore) {
        bestScore = score;
        bestSlot = s;
      }
    }

    if (bestSlot == null) {
      still.push(item);
      continue;
    }
    take(occ, item.teacherId, item.familyId, bestSlot);
    placed.push({
      familyId: item.familyId,
      teacherId: item.teacherId,
      slotIndex: bestSlot,
    });
  }

  return { placed, still };
}

export function analyzeSchedule(
  families: Family[],
  meetings: Meeting[],
  unscheduled: Unscheduled[],
  settings: NightSettings,
): FamilyItinerary[] {
  return families.map((family) => {
    const famMeetings = meetings
      .filter((m) => m.familyId === family.id)
      .sort((a, b) => a.slotIndex - b.slotIndex);
    const slots = famMeetings.map((m) => m.slotIndex);
    const { idle, maxGap } = comboGaps(slots, settings.slotMinutes);
    const missing = uniqueIds(family.teacherIds).filter(
      (tid) => !famMeetings.some((m) => m.teacherId === tid),
    );
    const extra = unscheduled
      .filter((u) => u.familyId === family.id)
      .map((u) => u.teacherId);
    const unscheduledTeacherIds = uniqueIds([...missing, ...extra]);
    return {
      familyId: family.id,
      meetings: famMeetings,
      unscheduledTeacherIds,
      idleMinutes: idle,
      maxGapMinutes: maxGap,
      violatesMaxGap: maxGap > settings.maxGapMinutes,
      firstSlot: slots[0] ?? null,
      lastSlot: slots[slots.length - 1] ?? null,
    };
  });
}

export function buildSchedule(
  teachers: Teacher[],
  families: Family[],
  settings: NightSettings,
): ScheduleResult {
  const nSlots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
  const occ = emptyOcc();
  const meetings: Meeting[] = [];
  let leftover: Unscheduled[] = [];
  const teacherSet = new Set(teachers.map((t) => t.id));
  const demand = teacherDemand(families);

  const ordered = [...families].sort((a, b) => {
    const ka = uniqueIds(a.teacherIds).length;
    const kb = uniqueIds(b.teacherIds).length;
    if (kb !== ka) return kb - ka;
    const da = a.teacherIds.reduce((s, id) => s + (demand.get(id) ?? 0), 0);
    const db = b.teacherIds.reduce((s, id) => s + (demand.get(id) ?? 0), 0);
    return db - da;
  });

  for (const family of ordered) {
    const wanted = uniqueIds(family.teacherIds).filter((id) => teacherSet.has(id));
    for (const tid of uniqueIds(family.teacherIds)) {
      if (!teacherSet.has(tid)) {
        leftover.push({
          familyId: family.id,
          teacherId: tid,
          reason: "Teacher is not on the roster",
        });
      }
    }
    if (nSlots <= 0) {
      for (const tid of wanted) {
        leftover.push({
          familyId: family.id,
          teacherId: tid,
          reason: "Conference window has no time slots",
        });
      }
      continue;
    }
    const { assignment, leftover: dropped } = packFamily(
      { ...family, teacherIds: wanted },
      nSlots,
      settings.slotMinutes,
      settings.maxGapMinutes,
      occ,
    );
    for (const [teacherId, slotIndex] of assignment) {
      take(occ, teacherId, family.id, slotIndex);
      meetings.push({ familyId: family.id, teacherId, slotIndex });
    }
    for (const teacherId of dropped) {
      leftover.push({
        familyId: family.id,
        teacherId,
        reason: "No free slot that keeps this family and teacher free",
      });
    }
  }

  const repaired = repairUnscheduled(
    leftover,
    occ,
    nSlots,
    settings.slotMinutes,
    settings.maxGapMinutes,
  );
  meetings.push(...repaired.placed);
  leftover = repaired.still;

  return {
    meetings,
    unscheduled: leftover,
    itineraries: analyzeSchedule(families, meetings, leftover, settings),
    generatedAt: Date.now(),
  };
}

export function occupancyFromMeetings(meetings: Meeting[]): Occupancy {
  const occ = emptyOcc();
  for (const m of meetings) take(occ, m.teacherId, m.familyId, m.slotIndex);
  return occ;
}

export function isTeacherDoubleBooked(meetings: Meeting[]): boolean {
  const seen = new Set<string>();
  for (const m of meetings) {
    const key = `${m.teacherId}:${m.slotIndex}`;
    if (seen.has(key)) return true;
    seen.add(key);
  }
  return false;
}

export function isFamilyDoubleBooked(meetings: Meeting[]): boolean {
  const seen = new Set<string>();
  for (const m of meetings) {
    const key = `${m.familyId}:${m.slotIndex}`;
    if (seen.has(key)) return true;
    seen.add(key);
  }
  return false;
}

export function legalSlotsForMove(
  meetings: Meeting[],
  familyId: string,
  teacherId: string,
  fromSlot: number,
  nSlots: number,
): number[] {
  const occ = occupancyFromMeetings(
    meetings.filter(
      (m) => !(m.familyId === familyId && m.teacherId === teacherId && m.slotIndex === fromSlot),
    ),
  );
  const legal: number[] = [];
  for (let s = 0; s < nSlots; s++) {
    if (teacherFree(occ, teacherId, s) && familyFree(occ, familyId, s)) legal.push(s);
  }
  return legal;
}

export function moveMeeting(
  schedule: ScheduleResult,
  families: Family[],
  settings: NightSettings,
  familyId: string,
  teacherId: string,
  fromSlot: number,
  toSlot: number,
): ScheduleResult | null {
  const nSlots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
  if (toSlot < 0 || toSlot >= nSlots) return null;
  const legal = legalSlotsForMove(schedule.meetings, familyId, teacherId, fromSlot, nSlots);
  if (!legal.includes(toSlot)) return null;
  const meetings = schedule.meetings.map((m) =>
    m.familyId === familyId && m.teacherId === teacherId && m.slotIndex === fromSlot
      ? { ...m, slotIndex: toSlot }
      : m,
  );
  return {
    meetings,
    unscheduled: schedule.unscheduled,
    itineraries: analyzeSchedule(families, meetings, schedule.unscheduled, settings),
    generatedAt: schedule.generatedAt,
  };
}

export function scheduleStats(result: ScheduleResult, families: Family[]) {
  const requested = families.reduce((n, f) => n + uniqueIds(f.teacherIds).length, 0);
  const placed = result.meetings.length;
  const withGap = result.itineraries.filter((i) => i.violatesMaxGap).length;
  const withMissing = result.itineraries.filter((i) => i.unscheduledTeacherIds.length > 0).length;
  const withMeetings = result.itineraries.filter((i) => i.meetings.length > 0);
  const avgIdle =
    withMeetings.length === 0
      ? 0
      : withMeetings.reduce((n, i) => n + i.idleMinutes, 0) / withMeetings.length;
  const maxIdle = result.itineraries.reduce((n, i) => Math.max(n, i.maxGapMinutes), 0);
  return {
    requested,
    placed,
    withGap,
    withMissing,
    avgIdle,
    maxIdle,
    teacherConflict: isTeacherDoubleBooked(result.meetings),
    familyConflict: isFamilyDoubleBooked(result.meetings),
  };
}
