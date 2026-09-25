import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Clock3, f as Check, h as ArrowRight, n as Users, p as CalendarRange, r as TriangleAlert, u as GraduationCap } from "../_libs/lucide-react.mjs";
import { a as formatMinutes, c as minutesFromHm, l as slotCount, n as useConference, o as formatNightDate, r as cn } from "./router-i7oCrOqN.mjs";
import { n as Shell, t as PageHeader } from "./shell-BQSFcyIL.mjs";
import { n as Input, r as NativeSelect, t as Button } from "./input-C-zkeRtA.mjs";
import { t as Label } from "./label-CRnZXIeW.mjs";
import { t as Badge } from "./badge-D5lhl7QY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dgw8_62Q.js
var import_jsx_runtime = require_jsx_runtime();
function NightPage() {
	const settings = useConference((s) => s.settings);
	const setSettings = useConference((s) => s.setSettings);
	const teachers = useConference((s) => s.teachers);
	const families = useConference((s) => s.families);
	const schedule = useConference((s) => s.schedule);
	const stale = useConference((s) => s.stale);
	const generate = useConference((s) => s.generate);
	const loadDemo = useConference((s) => s.loadDemo);
	const resetEmpty = useConference((s) => s.resetEmpty);
	const stats = useConference((s) => s.stats)();
	const slots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
	const requested = families.reduce((n, f) => n + f.teacherIds.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Conference night",
			title: settings.title || "Parent-teacher conferences",
			description: "Convene places every meeting so a teacher is never in two rooms at once, and each family’s evening stays compact — no more than 30 minutes between visits unless the roster makes that impossible.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: generate,
				children: schedule && !stale ? "Rebuild schedule" : "Build schedule"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/schedule",
					children: ["Open board", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl bg-surface px-5 py-6 shadow-[var(--shadow-border)] sm:px-7 sm:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.14em] text-muted uppercase",
					children: settings.schoolName || "Unnamed school"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
					children: settings.date ? formatNightDate(settings.date) : "Pick a date"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted",
					children: [
						formatMinutes(minutesFromHm(settings.startTime)),
						" –",
						" ",
						formatMinutes(minutesFromHm(settings.endTime)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-2 text-line",
							children: "·"
						}),
						settings.slotMinutes,
						"-minute meetings",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-2 text-line",
							children: "·"
						}),
						slots,
						" slots"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [
						stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "warn",
							children: "Roster changed — rebuild to refresh"
						}) : schedule ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "ok",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), "Schedule ready"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "No schedule yet" }),
						stats?.withGap ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "warn",
							children: [stats.withGap, " families over the wait cap"]
						}) : schedule ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "ok",
							children: [
								"All waits within ",
								settings.maxGapMinutes,
								" min"
							]
						}) : null,
						stats?.withMissing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "danger",
							children: [stats.withMissing, " families missing a teacher"]
						}) : null
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: Users,
					label: "Families",
					value: String(families.length),
					hint: `${requested} meetings requested`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: GraduationCap,
					label: "Teachers",
					value: String(teachers.length),
					hint: "One family at a time"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: CalendarRange,
					label: "Placed",
					value: stats ? `${stats.placed}/${stats.requested}` : "—",
					hint: stats?.teacherConflict ? "Teacher conflict" : "No double-books",
					warn: Boolean(stats?.teacherConflict)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: Clock3,
					label: "Longest wait",
					value: stats ? `${Math.round(stats.maxIdle)} min` : "—",
					hint: stats ? `Average ${Math.round(stats.avgIdle)} min between visits` : `Cap is ${settings.maxGapMinutes} min`,
					warn: Boolean(stats && stats.maxIdle > settings.maxGapMinutes)
				})
			]
		}),
		schedule && (stats?.withGap || stats?.withMissing) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueList, {}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold tracking-tight",
					children: "Night setup"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 mb-5 text-sm text-muted",
					children: "Times, slot length, and the wait cap. Changing these marks the schedule out of date."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "School",
							htmlFor: "school-name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "school-name",
								value: settings.schoolName,
								onChange: (e) => setSettings({ schoolName: e.target.value }),
								placeholder: "Maplewood Elementary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Event name",
							htmlFor: "event-title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "event-title",
								value: settings.title,
								onChange: (e) => setSettings({ title: e.target.value }),
								placeholder: "Fall Conferences"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Date",
							htmlFor: "event-date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "event-date",
								type: "date",
								value: settings.date,
								onChange: (e) => setSettings({ date: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Start",
							htmlFor: "start-time",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "start-time",
								type: "time",
								value: settings.startTime,
								onChange: (e) => setSettings({ startTime: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "End",
							htmlFor: "end-time",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "end-time",
								type: "time",
								value: settings.endTime,
								onChange: (e) => setSettings({ endTime: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Meeting length",
							htmlFor: "slot-minutes",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								id: "slot-minutes",
								value: String(settings.slotMinutes),
								onChange: (e) => setSettings({ slotMinutes: Number(e.target.value) }),
								children: [
									10,
									15,
									20,
									30
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: n,
									children: [n, " minutes"]
								}, n))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Max wait between meetings",
							htmlFor: "max-gap",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								id: "max-gap",
								value: String(settings.maxGapMinutes),
								onChange: (e) => setSettings({ maxGapMinutes: Number(e.target.value) }),
								children: [
									15,
									30,
									45,
									60
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: n,
									children: [n, " minutes"]
								}, n))
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						type: "button",
						onClick: loadDemo,
						children: "Load Maplewood demo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						type: "button",
						onClick: resetEmpty,
						children: "Start empty"
					})]
				})
			]
		})
	] });
}
function IssueList() {
	const schedule = useConference((s) => s.schedule);
	const families = useConference((s) => s.families);
	const teachers = useConference((s) => s.teachers);
	const settings = useConference((s) => s.settings);
	if (!schedule) return null;
	const issues = schedule.itineraries.filter((it) => it.violatesMaxGap || it.unscheduledTeacherIds.length > 0);
	if (issues.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-5 rounded-xl bg-warn-soft/60 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-warn",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Needs a look"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2 text-sm",
			children: issues.map((it) => {
				const family = families.find((f) => f.id === it.familyId);
				if (!family) return null;
				const bits = [];
				if (it.violatesMaxGap) bits.push(`longest wait ${it.maxGapMinutes} min (cap ${settings.maxGapMinutes})`);
				if (it.unscheduledTeacherIds.length) {
					const names = it.unscheduledTeacherIds.map((id) => teachers.find((t) => t.id === id)?.name ?? "Unknown").join(", ");
					bits.push(`could not place ${names}`);
				}
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [family.familyName, " family"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [" — ", bits.join("; ")]
					})]
				}, it.familyId);
			})
		})]
	});
}
function Stat({ icon: Icon, label, value, hint, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs font-medium tracking-wide uppercase",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: cn("mt-2 font-display text-3xl font-semibold tabular-nums", warn && "text-warn"),
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: hint
			})
		]
	});
}
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
//#endregion
export { NightPage as component };
