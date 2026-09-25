import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Trash2, o as Plus, s as Pencil } from "../_libs/lucide-react.mjs";
import { n as useConference } from "./router-i7oCrOqN.mjs";
import { n as Shell, t as PageHeader } from "./shell-BQSFcyIL.mjs";
import { t as Button } from "./input-C-zkeRtA.mjs";
import { t as FamilyDialog } from "./people-forms-BxdrCcT4.mjs";
import { t as Badge } from "./badge-D5lhl7QY.mjs";
import { a as teacherById } from "./lookups-BL5lVdJu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/families-CSfhP0eR.js
var import_jsx_runtime = require_jsx_runtime();
function FamiliesPage() {
	const families = useConference((s) => s.families);
	const teachers = useConference((s) => s.teachers);
	const schedule = useConference((s) => s.schedule);
	const removeFamily = useConference((s) => s.removeFamily);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Roster",
		title: "Families",
		description: "Each family lists the teachers they need. Convene clusters those visits so the evening does not stall.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add family"] }) })
	}), families.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-semibold",
			children: "No families yet"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-2 max-w-md text-sm text-muted",
			children: "Add families and the teachers they need to see. Homeroom plus specialists is the usual mix."
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-3",
		children: families.map((family) => {
			const it = schedule?.itineraries.find((i) => i.familyId === family.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [family.familyName, " family"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-sm text-muted",
							children: [
								family.guardian ? `${family.guardian} · ` : "",
								family.student,
								", Grade ",
								family.grade
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyDialog, {
								family,
								trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									"aria-label": `Edit ${family.familyName}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": `Remove ${family.familyName}`,
								onClick: () => removeFamily(family.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-1.5",
						children: family.teacherIds.map((tid) => {
							const t = teacherById(teachers, tid);
							const missing = it?.unscheduledTeacherIds.includes(tid);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: missing ? "danger" : "ink",
								children: t?.name ?? "Unknown"
							}, tid);
						})
					}),
					it && it.meetings.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted",
						children: [
							"Longest wait ",
							it.maxGapMinutes,
							" min",
							it.violatesMaxGap ? " — over the cap" : "",
							it.idleMinutes > 0 ? ` · ${it.idleMinutes} min idle overall` : " · back to back"
						]
					}) : null
				]
			}, family.id);
		})
	})] });
}
//#endregion
export { FamiliesPage as component };
