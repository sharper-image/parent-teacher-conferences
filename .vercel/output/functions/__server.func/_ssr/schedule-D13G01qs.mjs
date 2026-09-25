import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Shell, t as PageHeader } from "./shell-BQSFcyIL.mjs";
import { n as ScheduleBoard } from "./schedule-board-DElWOEij.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-D13G01qs.js
var import_jsx_runtime = require_jsx_runtime();
function SchedulePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Tonight",
		title: "Schedule",
		description: "Teachers down the columns, time down the rows. A filled cell is one family. Move a meeting only into an open slot — that is how a teacher stays with one family at a time."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleBoard, {})] });
}
//#endregion
export { SchedulePage as component };
