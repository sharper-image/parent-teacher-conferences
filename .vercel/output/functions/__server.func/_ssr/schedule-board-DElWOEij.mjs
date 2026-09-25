import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Printer } from "../_libs/lucide-react.mjs";
import { d as slotRangeLabel, l as slotCount, n as useConference, r as cn, u as slotLabel } from "./router-i7oCrOqN.mjs";
import { r as NativeSelect, t as Button } from "./input-C-zkeRtA.mjs";
import { t as Badge } from "./badge-D5lhl7QY.mjs";
import { a as teacherById, i as studentLine, n as familyChipClass, r as familyLabel, t as familyById } from "./lookups-BL5lVdJu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-board-DElWOEij.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ScheduleBoard() {
	const [tab, setTab] = (0, import_react.useState)("grid");
	const settings = useConference((s) => s.settings);
	const teachers = useConference((s) => s.teachers);
	const families = useConference((s) => s.families);
	const schedule = useConference((s) => s.schedule);
	const stale = useConference((s) => s.stale);
	const generate = useConference((s) => s.generate);
	const stats = useConference((s) => s.stats)();
	const nSlots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex rounded-lg bg-surface-2 p-1",
				children: [
					["grid", "Board"],
					["families", "Families"],
					["teachers", "Teachers"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: cn("h-10 min-w-11 flex-1 rounded-md px-3 text-sm font-medium transition-colors duration-150 sm:flex-none", tab === id ? "bg-navy text-navy-fg" : "text-muted hover:text-ink"),
					children: label
				}, id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: generate,
					children: schedule ? "Rebuild" : "Build schedule"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/print",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Print night"]
					})
				})]
			})]
		}),
		stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn",
			children: "Teachers, families, or times changed. Rebuild so the board matches the roster."
		}) : null,
		!schedule ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-semibold",
				children: "Nothing on the board yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto mt-2 max-w-md text-sm text-muted",
				children: [
					"Add teachers and families, then build. Convene will refuse double-books and keep each family’s gaps under ",
					settings.maxGapMinutes,
					" minutes whenever it can."
				]
			})]
		}) : nSlots <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger",
			children: "The start and end times do not leave any slots. Fix the night window."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			stats ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums font-medium text-ink",
						children: [
							stats.placed,
							"/",
							stats.requested
						]
					}),
					" ",
					"meetings placed",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2 text-line",
						children: "·"
					}),
					"longest wait",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums font-medium text-ink",
						children: [Math.round(stats.maxIdle), " min"]
					}),
					stats.withGap ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2 text-line",
						children: "·"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-warn",
						children: [stats.withGap, " over the cap"]
					})] }) : null
				]
			}) : null,
			tab === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
				teachers,
				families,
				nSlots
			}) : null,
			tab === "families" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyItineraries, {}) : null,
			tab === "teachers" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeacherSheets, {}) : null
		] })
	] });
}
function Grid({ teachers, families, nSlots }) {
	const settings = useConference((s) => s.settings);
	const schedule = useConference((s) => s.schedule);
	const selected = useConference((s) => s.selected);
	const selectMeeting = useConference((s) => s.selectMeeting);
	const moveSelectedTo = useConference((s) => s.moveSelectedTo);
	const legalSlots = useConference((s) => s.legalSlots);
	const [mobileTeacher, setMobileTeacher] = (0, import_react.useState)(teachers[0]?.id ?? "");
	const byKey = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const m of schedule.meetings) map.set(`${m.teacherId}:${m.slotIndex}`, m);
		return map;
	}, [schedule.meetings]);
	const legal = selected ? legalSlots() : [];
	const renderColumn = (teacher) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium",
				children: teacher.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "truncate text-xs text-muted",
				children: [
					teacher.role,
					" · ",
					teacher.room
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex flex-col gap-1",
			children: Array.from({ length: nSlots }, (_, slot) => {
				const meeting = byKey.get(`${teacher.id}:${slot}`);
				const family = meeting ? familyById(families, meeting.familyId) : void 0;
				const isSelected = selected && meeting && selected.familyId === meeting.familyId && selected.teacherId === meeting.teacherId && selected.slotIndex === meeting.slotIndex;
				const isLegal = selected && selected.teacherId === teacher.id && legal.includes(slot) && !meeting;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !meeting && !isLegal,
					onClick: () => {
						if (meeting) {
							if (isSelected) selectMeeting(null);
							else selectMeeting({
								familyId: meeting.familyId,
								teacherId: meeting.teacherId,
								slotIndex: meeting.slotIndex
							});
							return;
						}
						if (isLegal) moveSelectedTo(slot);
					},
					className: cn("flex min-h-11 w-full items-center rounded-sm px-2 text-left text-xs transition-colors duration-150", meeting && family ? familyChipClass(family.id, "hover:opacity-90") : "bg-surface-2 text-subtle", isSelected && "ring-2 ring-ink ring-offset-2 ring-offset-bg", isLegal && "bg-ok-soft text-ok ring-1 ring-ok/30", !meeting && !isLegal && "cursor-default"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-2 w-16 shrink-0 tabular-nums text-[11px] opacity-80",
						children: slotLabel(settings.startTime, settings.slotMinutes, slot)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: family ? family.familyName : isLegal ? "Move here" : "Open"
					})]
				}) }, slot);
			})
		})]
	}, teacher.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 rounded-lg bg-surface px-3 py-2 text-sm text-muted shadow-[var(--shadow-border)]",
			children: [
				"Moving",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-medium text-ink",
					children: [familyById(families, selected.familyId)?.familyName, " family"]
				}),
				" ",
				"with ",
				teacherById(teachers, selected.teacherId)?.name,
				". Tap a highlighted open slot in this column, or tap the meeting again to cancel."
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm text-muted",
			children: "Tap a meeting to move it. Open slots stay empty so a teacher is never double-booked."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "mobile-teacher",
					className: "mb-1.5 block text-sm font-medium",
					children: "Teacher"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
					id: "mobile-teacher",
					value: mobileTeacher || teachers[0]?.id,
					onChange: (e) => setMobileTeacher(e.target.value),
					className: "mb-3",
					children: teachers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t.id,
						children: t.name
					}, t.id))
				}),
				teachers.filter((t) => t.id === (mobileTeacher || teachers[0]?.id)).map(renderColumn)
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-4",
			children: teachers.map(renderColumn)
		})
	] });
}
function FamilyItineraries() {
	const families = useConference((s) => s.families);
	const teachers = useConference((s) => s.teachers);
	const schedule = useConference((s) => s.schedule);
	const settings = useConference((s) => s.settings);
	if (!schedule) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3 lg:grid-cols-2",
		children: families.map((family) => {
			const it = schedule.itineraries.find((i) => i.familyId === family.id);
			const meetings = it?.meetings ?? [];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: familyLabel(family)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: studentLine(family)
						})] }), it?.violatesMaxGap ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "warn",
							children: [it.maxGapMinutes, " min wait"]
						}) : meetings.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "ok",
							children: it?.idleMinutes ? `${it.idleMinutes} min idle` : "Packed"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 flex flex-col",
						children: meetings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "No meetings placed."
						}) : meetings.map((m, idx) => {
							const teacher = teacherById(teachers, m.teacherId);
							const next = meetings[idx + 1];
							const gap = next ? (next.slotIndex - m.slotIndex - 1) * settings.slotMinutes : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-28 shrink-0 tabular-nums text-muted",
									children: slotRangeLabel(settings.startTime, settings.slotMinutes, m.slotIndex)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: teacher?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [" · ", teacher?.room]
								})] })]
							}), next && gap > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("my-1 ml-28 text-xs", gap > settings.maxGapMinutes ? "text-warn" : "text-subtle"),
								children: [
									gap,
									" min between meetings",
									gap > settings.maxGapMinutes ? " — over the cap" : ""
								]
							}) : next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "my-1 ml-28 text-xs text-subtle",
								children: "Walk to next room"
							}) : null] }, `${m.teacherId}-${m.slotIndex}`);
						})
					}),
					it && it.unscheduledTeacherIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-danger",
						children: [
							"Could not place",
							" ",
							it.unscheduledTeacherIds.map((id) => teacherById(teachers, id)?.name ?? "Unknown").join(", ")
						]
					}) : null
				]
			}, family.id);
		})
	});
}
function TeacherSheets() {
	const teachers = useConference((s) => s.teachers);
	const families = useConference((s) => s.families);
	const schedule = useConference((s) => s.schedule);
	const settings = useConference((s) => s.settings);
	const nSlots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
	if (!schedule) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3 lg:grid-cols-2",
		children: teachers.map((teacher) => {
			const meetings = schedule.meetings.filter((m) => m.teacherId === teacher.id).sort((a, b) => a.slotIndex - b.slotIndex);
			const bySlot = new Map(meetings.map((m) => [m.slotIndex, m]));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: teacher.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							teacher.role,
							" · ",
							teacher.room
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-1",
						children: Array.from({ length: nSlots }, (_, slot) => {
							const m = bySlot.get(slot);
							const family = m ? familyById(families, m.familyId) : void 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-16 shrink-0 tabular-nums text-muted",
									children: slotLabel(settings.startTime, settings.slotMinutes, slot)
								}), family ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: family.familyName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [" · ", studentLine(family)]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle",
									children: "Open"
								})]
							}, slot);
						})
					})
				]
			}, teacher.id);
		})
	});
}
//#endregion
export { ScheduleBoard as n, TeacherSheets as r, FamilyItineraries as t };
