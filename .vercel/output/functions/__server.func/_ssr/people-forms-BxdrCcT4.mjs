import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, c as DialogTrigger$1, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as useConference, r as cn } from "./router-i7oCrOqN.mjs";
import { n as Input, r as NativeSelect, t as Button } from "./input-C-zkeRtA.mjs";
import { t as Label } from "./label-CRnZXIeW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-forms-BxdrCcT4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
function DialogContent({ className, children, title, description, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-[color-mix(in_oklab,var(--color-ink)_45%,transparent)] data-[state=open]:animate-in data-[state=closed]:animate-out" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(calc(100%-1.5rem),32rem)] -translate-x-1/2 -translate-y-1/2", "rounded-xl bg-surface p-5 text-ink shadow-[var(--shadow-border)]", "max-h-[min(90dvh,40rem)] overflow-y-auto", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-xl font-semibold tracking-tight",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				className: "mt-1 text-sm text-muted",
				children: description
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				className: "sr-only",
				children: title
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Close",
					type: "button",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})
			})]
		}), children]
	})] });
}
function TeacherDialog({ teacher, trigger }) {
	const addTeacher = useConference((s) => s.addTeacher);
	const updateTeacher = useConference((s) => s.updateTeacher);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)(teacher?.name ?? "");
	const [role, setRole] = (0, import_react.useState)(teacher?.role ?? "");
	const [room, setRoom] = (0, import_react.useState)(teacher?.room ?? "");
	const onOpen = (next) => {
		setOpen(next);
		if (next) {
			setName(teacher?.name ?? "");
			setRole(teacher?.role ?? "");
			setRoom(teacher?.room ?? "");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: onOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: teacher ? "Edit teacher" : "Add teacher",
			description: "Name, subject or grade, and room — used on itineraries.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					const payload = {
						name: name.trim(),
						role: role.trim(),
						room: room.trim()
					};
					if (!payload.name) return;
					if (teacher) updateTeacher(teacher.id, payload);
					else addTeacher(payload);
					setOpen(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						htmlFor: "teacher-name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "teacher-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true,
							placeholder: "Avery Chen"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Role / subject",
						htmlFor: "teacher-role",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "teacher-role",
							value: role,
							onChange: (e) => setRole(e.target.value),
							placeholder: "Grade 2 Homeroom"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Room",
						htmlFor: "teacher-room",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "teacher-room",
							value: room,
							onChange: (e) => setRoom(e.target.value),
							placeholder: "Room 12"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-1 w-full sm:w-auto sm:self-end",
						children: teacher ? "Save" : "Add teacher"
					})
				]
			})
		})]
	});
}
function FamilyDialog({ family, trigger }) {
	const teachers = useConference((s) => s.teachers);
	const addFamily = useConference((s) => s.addFamily);
	const updateFamily = useConference((s) => s.updateFamily);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [familyName, setFamilyName] = (0, import_react.useState)(family?.familyName ?? "");
	const [guardian, setGuardian] = (0, import_react.useState)(family?.guardian ?? "");
	const [student, setStudent] = (0, import_react.useState)(family?.student ?? "");
	const [grade, setGrade] = (0, import_react.useState)(family?.grade ?? "2");
	const [teacherIds, setTeacherIds] = (0, import_react.useState)(family?.teacherIds ?? []);
	const onOpen = (next) => {
		setOpen(next);
		if (next) {
			setFamilyName(family?.familyName ?? "");
			setGuardian(family?.guardian ?? "");
			setStudent(family?.student ?? "");
			setGrade(family?.grade ?? "2");
			setTeacherIds(family?.teacherIds ?? []);
		}
	};
	const toggleTeacher = (id) => {
		setTeacherIds((curr) => curr.includes(id) ? curr.filter((t) => t !== id) : [...curr, id]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: onOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: family ? "Edit family" : "Add family",
			description: "Choose every teacher this family needs to see. Convene will pack those meetings tightly.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					const payload = {
						familyName: familyName.trim(),
						guardian: guardian.trim(),
						student: student.trim(),
						grade,
						teacherIds
					};
					if (!payload.familyName || !payload.student) return;
					if (family) updateFamily(family.id, payload);
					else addFamily(payload);
					setOpen(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Family name",
								htmlFor: "family-name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "family-name",
									value: familyName,
									onChange: (e) => setFamilyName(e.target.value),
									required: true,
									placeholder: "Ruiz"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Guardian",
								htmlFor: "family-guardian",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "family-guardian",
									value: guardian,
									onChange: (e) => setGuardian(e.target.value),
									placeholder: "Alex Ruiz"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Student",
								htmlFor: "family-student",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "family-student",
									value: student,
									onChange: (e) => setStudent(e.target.value),
									required: true,
									placeholder: "Elena"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Grade",
								htmlFor: "family-grade",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									id: "family-grade",
									value: grade,
									onChange: (e) => setGrade(e.target.value),
									children: [
										"K",
										"1",
										"2",
										"3",
										"4",
										"5",
										"6"
									].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: g,
										children: g === "K" ? "Kindergarten" : `Grade ${g}`
									}, g))
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-medium",
						children: "Teachers to see"
					}), teachers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Add teachers first, then come back to this list."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: teachers.map((t) => {
							const on = teacherIds.includes(t.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": on,
								onClick: () => toggleTeacher(t.id),
								className: cn("h-11 rounded-full px-3 text-sm font-medium transition-colors duration-150", on ? "bg-navy text-navy-fg" : "bg-surface-2 text-ink hover:bg-line"),
								children: t.name
							}, t.id);
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-1 w-full sm:w-auto sm:self-end",
						children: family ? "Save" : "Add family"
					})
				]
			})
		})]
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
export { TeacherDialog as n, FamilyDialog as t };
