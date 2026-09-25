import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as LayoutGrid, m as CalendarDays, n as Users, u as GraduationCap } from "../_libs/lucide-react.mjs";
import { n as useConference, r as cn, s as formatNightDateShort } from "./router-i7oCrOqN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-BQSFcyIL.js
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Night",
		icon: CalendarDays
	},
	{
		to: "/teachers",
		label: "Teachers",
		icon: GraduationCap
	},
	{
		to: "/families",
		label: "Families",
		icon: Users
	},
	{
		to: "/schedule",
		label: "Schedule",
		icon: LayoutGrid
	}
];
function Shell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const settings = useConference((s) => s.settings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "no-print border-b border-line/80 bg-surface/80 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-2xl font-semibold tracking-tight text-ink",
						children: "Convene"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hidden text-sm text-muted sm:block",
						children: [settings.schoolName || "Your school", settings.date ? ` · ${formatNightDateShort(settings.date)}` : ""]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid grid-cols-4 gap-1 sm:flex sm:overflow-x-auto",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("inline-flex h-11 min-w-0 items-center justify-center gap-1 rounded-md px-1.5 text-[11px] font-medium transition-colors duration-150 sm:min-w-11 sm:gap-2 sm:px-3 sm:text-sm", active ? "bg-navy text-navy-fg" : "text-muted hover:bg-surface-2 hover:text-ink"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item.label
							})]
						}, item.to);
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8",
			children
		})]
	});
}
function PageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-xs font-medium tracking-[0.14em] text-muted uppercase",
					children: eyebrow
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
					children: title
				}),
				description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: description
				}) : null
			]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		}) : null]
	});
}
//#endregion
export { Shell as n, PageHeader as t };
