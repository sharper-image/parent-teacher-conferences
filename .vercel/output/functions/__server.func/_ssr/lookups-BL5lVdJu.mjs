import { i as familyChipIndex, r as cn } from "./router-i7oCrOqN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookups-BL5lVdJu.js
function teacherById(teachers, id) {
	return teachers.find((t) => t.id === id);
}
function familyById(families, id) {
	return families.find((f) => f.id === id);
}
function familyLabel(family) {
	return `${family.familyName} family`;
}
function studentLine(family) {
	return `${family.student}, Grade ${family.grade}`;
}
var CHIP_BG = [
	"bg-chip-0",
	"bg-chip-1",
	"bg-chip-2",
	"bg-chip-3",
	"bg-chip-4",
	"bg-chip-5",
	"bg-chip-6",
	"bg-chip-7"
];
function familyChipClass(id, extra) {
	return cn(CHIP_BG[familyChipIndex(id)], "text-navy-fg", extra);
}
//#endregion
export { teacherById as a, studentLine as i, familyChipClass as n, familyLabel as r, familyById as t };
