import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as MapPin, i as Trash2, o as Plus, s as Pencil } from "../_libs/lucide-react.mjs";
import { n as useConference } from "./router-i7oCrOqN.mjs";
import { n as Shell, t as PageHeader } from "./shell-BQSFcyIL.mjs";
import { t as Button } from "./input-C-zkeRtA.mjs";
import { n as TeacherDialog } from "./people-forms-BxdrCcT4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teachers-CZQnpxN1.js
var import_jsx_runtime = require_jsx_runtime();
function TeachersPage() {
	const teachers = useConference((s) => s.teachers);
	const families = useConference((s) => s.families);
	const removeTeacher = useConference((s) => s.removeTeacher);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Roster",
		title: "Teachers",
		description: "Each teacher can sit with only one family at a time. Demand is how many families asked to see them.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeacherDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add teacher"] }) })
	}), teachers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
		title: "No teachers yet",
		body: "Add the staff who will hold conferences, or load the Maplewood demo from Night."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3 sm:grid-cols-2",
		children: teachers.map((teacher) => {
			const demand = families.filter((f) => f.teacherIds.includes(teacher.id)).length;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start justify-between gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: teacher.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted",
						children: teacher.role || "Teacher"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-1.5 text-sm text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
							teacher.room || "Room TBD",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-line",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									demand,
									" ",
									demand === 1 ? "family" : "families"
								]
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeacherDialog, {
						teacher,
						trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							"aria-label": `Edit ${teacher.name}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": `Remove ${teacher.name}`,
						onClick: () => removeTeacher(teacher.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})]
				})]
			}, teacher.id);
		})
	})] });
}
function Empty({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface px-5 py-12 text-center shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-2 max-w-md text-sm text-muted",
			children: body
		})]
	});
}
//#endregion
export { TeachersPage as component };
