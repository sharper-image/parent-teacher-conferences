export type Teacher = {
  id: string;
  name: string;
  role: string;
  room: string;
};

export type Family = {
  id: string;
  familyName: string;
  guardian: string;
  student: string;
  grade: string;
  teacherIds: string[];
};

export type NightSettings = {
  schoolName: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  slotMinutes: number;
  maxGapMinutes: number;
};

export type Meeting = {
  familyId: string;
  teacherId: string;
  slotIndex: number;
};

export type Unscheduled = {
  familyId: string;
  teacherId: string;
  reason: string;
};

export type FamilyItinerary = {
  familyId: string;
  meetings: Meeting[];
  unscheduledTeacherIds: string[];
  idleMinutes: number;
  maxGapMinutes: number;
  violatesMaxGap: boolean;
  firstSlot: number | null;
  lastSlot: number | null;
};

export type ScheduleResult = {
  meetings: Meeting[];
  unscheduled: Unscheduled[];
  itineraries: FamilyItinerary[];
  generatedAt: number;
};

export const CHIP_COUNT = 8;
