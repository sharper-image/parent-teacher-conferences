import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./router-i7oCrOqN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-D5lhl7QY.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium tabular-nums", {
	variants: { tone: {
		ink: "bg-surface-2 text-ink",
		navy: "bg-navy text-navy-fg",
		ok: "bg-ok-soft text-ok",
		warn: "bg-warn-soft text-warn",
		danger: "bg-danger-soft text-danger"
	} },
	defaultVariants: { tone: "ink" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
//#endregion
export { Badge as t };
