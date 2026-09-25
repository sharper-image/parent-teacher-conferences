import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Printer, g as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as formatMinutes, c as minutesFromHm, n as useConference, o as formatNightDate } from "./router-i7oCrOqN.mjs";
import { t as Button } from "./input-C-zkeRtA.mjs";
import { r as TeacherSheets, t as FamilyItineraries } from "./schedule-board-DElWOEij.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/print-KmRjAnol.js
var import_jsx_runtime = require_jsx_runtime();
function PrintPage() {
	const settings = useConference((s) => s.settings);
	const schedule = useConference((s) => s.schedule);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/schedule",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				onClick: () => window.print(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Print"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-4 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "print-sheet mb-8 border-b border-line pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.16em] text-muted uppercase",
						children: "Convene"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-semibold tracking-tight",
						children: settings.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted",
						children: [
							settings.schoolName,
							settings.date ? ` · ${formatNightDate(settings.date)}` : "",
							" · ",
							formatMinutes(minutesFromHm(settings.startTime)),
							"–",
							formatMinutes(minutesFromHm(settings.endTime))
						]
					})
				]
			}), !schedule ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Build a schedule before printing."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 font-display text-2xl font-semibold",
					children: "Family itineraries"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FamilyItineraries, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-10 mb-4 font-display text-2xl font-semibold",
					children: "Teacher sheets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeacherSheets, {})
			] })]
		})]
	});
}
//#endregion
export { PrintPage as component };
