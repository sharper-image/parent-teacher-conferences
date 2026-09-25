import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { r as cn } from "./router-i7oCrOqN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-C-zkeRtA.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,background-color,box-shadow,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-navy text-navy-fg shadow-[var(--shadow-border)] hover:bg-[color-mix(in_oklab,var(--color-navy)_92%,white)]",
			secondary: "bg-surface text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-ink hover:bg-surface-2",
			danger: "bg-danger-soft text-danger hover:bg-[color-mix(in_oklab,var(--color-danger-soft)_80%,white)]"
		},
		size: {
			sm: "h-9 rounded-sm px-3 text-sm",
			md: "h-11 rounded-md px-4 text-sm",
			lg: "h-12 rounded-lg px-5 text-base",
			icon: "size-11 rounded-md",
			"icon-sm": "size-9 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, static: isStatic, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), !isStatic && "active:not-disabled:scale-[0.96]", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md bg-surface px-3 text-sm text-ink shadow-[var(--shadow-border)]", "placeholder:text-subtle", "disabled:opacity-50", className),
		...props
	});
}
function NativeSelect({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-11 w-full rounded-md bg-surface px-3 text-sm text-ink shadow-[var(--shadow-border)]", className),
		...props
	});
}
//#endregion
export { Input as n, NativeSelect as r, Button as t };
