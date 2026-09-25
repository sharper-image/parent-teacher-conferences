import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as format, t as parseISO } from "../_libs/date-fns.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-i7oCrOqN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function minutesFromHm(hm) {
	const [h, m] = hm.split(":").map((n) => Number(n));
	return (h ?? 0) * 60 + (m ?? 0);
}
function slotCount(startTime, endTime, slotMinutes) {
	const span = minutesFromHm(endTime) - minutesFromHm(startTime);
	if (slotMinutes <= 0 || span <= 0) return 0;
	return Math.floor(span / slotMinutes);
}
function slotStartMinutes(startTime, slotMinutes, slotIndex) {
	return minutesFromHm(startTime) + slotIndex * slotMinutes;
}
function formatMinutes(total) {
	const h = Math.floor(total / 60);
	const m = total % 60;
	return format(new Date(2e3, 0, 1, h, m), "h:mm a");
}
function slotLabel(startTime, slotMinutes, slotIndex) {
	return formatMinutes(slotStartMinutes(startTime, slotMinutes, slotIndex));
}
function slotRangeLabel(startTime, slotMinutes, slotIndex) {
	const start = slotStartMinutes(startTime, slotMinutes, slotIndex);
	return `${formatMinutes(start)}–${formatMinutes(start + slotMinutes)}`;
}
function formatNightDate(isoDate) {
	try {
		return format(parseISO(isoDate), "EEEE, MMMM d, yyyy");
	} catch {
		return isoDate;
	}
}
function formatNightDateShort(isoDate) {
	try {
		return format(parseISO(isoDate), "MMM d");
	} catch {
		return isoDate;
	}
}
function idleBetweenSlots(a, b, slotMinutes) {
	const [lo, hi] = a < b ? [a, b] : [b, a];
	return Math.max(0, hi - lo - 1) * slotMinutes;
}
function familyChipIndex(id) {
	let h = 0;
	for (let i = 0; i < id.length; i++) h = h * 33 + id.charCodeAt(i) | 0;
	return Math.abs(h) % 8;
}
function emptyOcc() {
	return {
		teacher: /* @__PURE__ */ new Map(),
		family: /* @__PURE__ */ new Map()
	};
}
function take(occ, teacherId, familyId, slot) {
	let t = occ.teacher.get(teacherId);
	if (!t) {
		t = /* @__PURE__ */ new Set();
		occ.teacher.set(teacherId, t);
	}
	let f = occ.family.get(familyId);
	if (!f) {
		f = /* @__PURE__ */ new Set();
		occ.family.set(familyId, f);
	}
	t.add(slot);
	f.add(slot);
}
function teacherFree(occ, teacherId, slot) {
	return !occ.teacher.get(teacherId)?.has(slot);
}
function familyFree(occ, familyId, slot) {
	return !occ.family.get(familyId)?.has(slot);
}
function combinations(n, k) {
	const out = [];
	if (k <= 0 || k > n) return out;
	const cur = [];
	const rec = (start) => {
		if (cur.length === k) {
			out.push(cur.slice());
			return;
		}
		const need = k - cur.length;
		for (let i = start; i <= n - need; i++) {
			cur.push(i);
			rec(i + 1);
			cur.pop();
		}
	};
	rec(0);
	return out;
}
function nCk(n, k) {
	if (k < 0 || k > n) return 0;
	let r = 1;
	for (let i = 1; i <= k; i++) r = r * (n - k + i) / i;
	return Math.round(r);
}
function comboGaps(slots, slotMinutes) {
	if (slots.length <= 1) return {
		idle: 0,
		maxGap: 0
	};
	let idle = 0;
	let maxGap = 0;
	for (let i = 1; i < slots.length; i++) {
		const g = idleBetweenSlots(slots[i - 1], slots[i], slotMinutes);
		idle += g;
		if (g > maxGap) maxGap = g;
	}
	return {
		idle,
		maxGap
	};
}
function matchTeachersToSlots(teacherIds, slots, occ) {
	const n = teacherIds.length;
	if (n !== slots.length) return null;
	const slotOf = new Array(n).fill(-1);
	const teacherOfSlot = new Array(slots.length).fill(-1);
	const dfs = (ti, seen) => {
		for (let si = 0; si < slots.length; si++) {
			if (seen[si]) continue;
			const slot = slots[si];
			const tid = teacherIds[ti];
			if (!teacherFree(occ, tid, slot)) continue;
			seen[si] = true;
			if (teacherOfSlot[si] === -1 || dfs(teacherOfSlot[si], seen)) {
				teacherOfSlot[si] = ti;
				slotOf[ti] = si;
				return true;
			}
		}
		return false;
	};
	for (let ti = 0; ti < n; ti++) {
		const seen = Array.from({ length: slots.length }, () => false);
		if (!dfs(ti, seen)) return null;
	}
	const result = /* @__PURE__ */ new Map();
	for (let ti = 0; ti < n; ti++) {
		const si = slotOf[ti];
		result.set(teacherIds[ti], slots[si]);
	}
	return result;
}
function packTeachers(teacherIds, nSlots, slotMinutes, maxGapMinutes, occ, allowGapViolation) {
	const k = teacherIds.length;
	if (k === 0) return {
		assignment: /* @__PURE__ */ new Map(),
		idle: 0,
		maxGap: 0,
		start: 0
	};
	if (k > nSlots) return null;
	const combos = nCk(nSlots, k) <= 2e4 ? combinations(nSlots, k) : null;
	const state = { best: null };
	const consider = (slots) => {
		const { idle, maxGap } = comboGaps(slots, slotMinutes);
		if (!allowGapViolation && maxGap > maxGapMinutes) return;
		const current = state.best;
		if (current) {
			if (!allowGapViolation) {
				if (idle > current.idle) return;
				if (idle === current.idle && slots[0] >= current.start) return;
			} else {
				const bViol = current.maxGap > maxGapMinutes ? 1 : 0;
				const v = maxGap > maxGapMinutes ? 1 : 0;
				if (v > bViol) return;
				if (v === bViol && idle > current.idle) return;
				if (v === bViol && idle === current.idle && slots[0] >= current.start) return;
			}
		}
		const assignment = matchTeachersToSlots(teacherIds, slots, occ);
		if (!assignment) return;
		state.best = {
			assignment,
			idle,
			maxGap,
			start: slots[0]
		};
	};
	if (combos) {
		for (const slots of combos) consider(slots);
		return state.best;
	}
	const maxEmpty = Math.floor(maxGapMinutes / slotMinutes);
	const maxWin = allowGapViolation ? nSlots : Math.min(nSlots, k + Math.max(0, k - 1) * maxEmpty);
	for (let win = k; win <= maxWin; win++) {
		for (let start = 0; start + win <= nSlots; start++) {
			const windowSlots = [];
			for (let s = start; s < start + win; s++) windowSlots.push(s);
			const assignment = matchTeachersToSlots(teacherIds, windowSlots.length === k ? windowSlots : pickFreeSlots(teacherIds, windowSlots, occ, k), occ);
			if (!assignment) continue;
			consider([...assignment.values()].sort((a, b) => a - b));
		}
		if (state.best && !allowGapViolation && state.best.idle === 0) return state.best;
	}
	return state.best;
}
function pickFreeSlots(teacherIds, windowSlots, occ, k) {
	const usable = windowSlots.filter((s) => teacherIds.some((tid) => teacherFree(occ, tid, s)));
	if (usable.length <= k) return usable;
	return usable.slice(0, k);
}
function teacherDemand(families) {
	const d = /* @__PURE__ */ new Map();
	for (const f of families) for (const tid of f.teacherIds) d.set(tid, (d.get(tid) ?? 0) + 1);
	return d;
}
function uniqueIds(ids) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const id of ids) {
		if (seen.has(id)) continue;
		seen.add(id);
		out.push(id);
	}
	return out;
}
function packFamily(family, nSlots, slotMinutes, maxGapMinutes, occ) {
	const teachers = uniqueIds(family.teacherIds);
	if (teachers.length === 0) return {
		assignment: /* @__PURE__ */ new Map(),
		leftover: []
	};
	const tight = packTeachers(teachers, nSlots, slotMinutes, maxGapMinutes, occ, false);
	if (tight) return {
		assignment: tight.assignment,
		leftover: []
	};
	const relaxed = packTeachers(teachers, nSlots, slotMinutes, maxGapMinutes, occ, true);
	if (relaxed) return {
		assignment: relaxed.assignment,
		leftover: []
	};
	for (let keep = teachers.length - 1; keep >= 1; keep--) {
		let best = null;
		const combos = combinations(teachers.length, keep);
		for (const idx of combos) {
			const subset = idx.map((i) => teachers[i]);
			const leftover = teachers.filter((t) => !subset.includes(t));
			const packed = packTeachers(subset, nSlots, slotMinutes, maxGapMinutes, occ, false) ?? packTeachers(subset, nSlots, slotMinutes, maxGapMinutes, occ, true);
			if (!packed) continue;
			if (!best || packed.idle < best.idle || packed.idle === best.idle && packed.start < best.start) best = {
				assignment: packed.assignment,
				leftover,
				idle: packed.idle,
				start: packed.start
			};
		}
		if (best) return best;
	}
	return {
		assignment: /* @__PURE__ */ new Map(),
		leftover: teachers
	};
}
function repairUnscheduled(leftover, occ, nSlots, slotMinutes, maxGapMinutes) {
	const placed = [];
	const still = [];
	for (const item of leftover) {
		const familySlots = [...occ.family.get(item.familyId) ?? []].sort((a, b) => a - b);
		let bestSlot = null;
		let bestScore = Infinity;
		for (let s = 0; s < nSlots; s++) {
			if (!teacherFree(occ, item.teacherId, s)) continue;
			if (!familyFree(occ, item.familyId, s)) continue;
			const { idle, maxGap } = comboGaps([...familySlots, s].sort((a, b) => a - b), slotMinutes);
			const score = (maxGap > maxGapMinutes ? 1 : 0) * 1e4 + idle * 100 + s;
			if (score < bestScore) {
				bestScore = score;
				bestSlot = s;
			}
		}
		if (bestSlot == null) {
			still.push(item);
			continue;
		}
		take(occ, item.teacherId, item.familyId, bestSlot);
		placed.push({
			familyId: item.familyId,
			teacherId: item.teacherId,
			slotIndex: bestSlot
		});
	}
	return {
		placed,
		still
	};
}
function analyzeSchedule(families, meetings, unscheduled, settings) {
	return families.map((family) => {
		const famMeetings = meetings.filter((m) => m.familyId === family.id).sort((a, b) => a.slotIndex - b.slotIndex);
		const slots = famMeetings.map((m) => m.slotIndex);
		const { idle, maxGap } = comboGaps(slots, settings.slotMinutes);
		const missing = uniqueIds(family.teacherIds).filter((tid) => !famMeetings.some((m) => m.teacherId === tid));
		const extra = unscheduled.filter((u) => u.familyId === family.id).map((u) => u.teacherId);
		const unscheduledTeacherIds = uniqueIds([...missing, ...extra]);
		return {
			familyId: family.id,
			meetings: famMeetings,
			unscheduledTeacherIds,
			idleMinutes: idle,
			maxGapMinutes: maxGap,
			violatesMaxGap: maxGap > settings.maxGapMinutes,
			firstSlot: slots[0] ?? null,
			lastSlot: slots[slots.length - 1] ?? null
		};
	});
}
function buildSchedule(teachers, families, settings) {
	const nSlots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
	const occ = emptyOcc();
	const meetings = [];
	let leftover = [];
	const teacherSet = new Set(teachers.map((t) => t.id));
	const demand = teacherDemand(families);
	const ordered = [...families].sort((a, b) => {
		const ka = uniqueIds(a.teacherIds).length;
		const kb = uniqueIds(b.teacherIds).length;
		if (kb !== ka) return kb - ka;
		const da = a.teacherIds.reduce((s, id) => s + (demand.get(id) ?? 0), 0);
		return b.teacherIds.reduce((s, id) => s + (demand.get(id) ?? 0), 0) - da;
	});
	for (const family of ordered) {
		const wanted = uniqueIds(family.teacherIds).filter((id) => teacherSet.has(id));
		for (const tid of uniqueIds(family.teacherIds)) if (!teacherSet.has(tid)) leftover.push({
			familyId: family.id,
			teacherId: tid,
			reason: "Teacher is not on the roster"
		});
		if (nSlots <= 0) {
			for (const tid of wanted) leftover.push({
				familyId: family.id,
				teacherId: tid,
				reason: "Conference window has no time slots"
			});
			continue;
		}
		const { assignment, leftover: dropped } = packFamily({
			...family,
			teacherIds: wanted
		}, nSlots, settings.slotMinutes, settings.maxGapMinutes, occ);
		for (const [teacherId, slotIndex] of assignment) {
			take(occ, teacherId, family.id, slotIndex);
			meetings.push({
				familyId: family.id,
				teacherId,
				slotIndex
			});
		}
		for (const teacherId of dropped) leftover.push({
			familyId: family.id,
			teacherId,
			reason: "No free slot that keeps this family and teacher free"
		});
	}
	const repaired = repairUnscheduled(leftover, occ, nSlots, settings.slotMinutes, settings.maxGapMinutes);
	meetings.push(...repaired.placed);
	leftover = repaired.still;
	return {
		meetings,
		unscheduled: leftover,
		itineraries: analyzeSchedule(families, meetings, leftover, settings),
		generatedAt: Date.now()
	};
}
function occupancyFromMeetings(meetings) {
	const occ = emptyOcc();
	for (const m of meetings) take(occ, m.teacherId, m.familyId, m.slotIndex);
	return occ;
}
function isTeacherDoubleBooked(meetings) {
	const seen = /* @__PURE__ */ new Set();
	for (const m of meetings) {
		const key = `${m.teacherId}:${m.slotIndex}`;
		if (seen.has(key)) return true;
		seen.add(key);
	}
	return false;
}
function isFamilyDoubleBooked(meetings) {
	const seen = /* @__PURE__ */ new Set();
	for (const m of meetings) {
		const key = `${m.familyId}:${m.slotIndex}`;
		if (seen.has(key)) return true;
		seen.add(key);
	}
	return false;
}
function legalSlotsForMove(meetings, familyId, teacherId, fromSlot, nSlots) {
	const occ = occupancyFromMeetings(meetings.filter((m) => !(m.familyId === familyId && m.teacherId === teacherId && m.slotIndex === fromSlot)));
	const legal = [];
	for (let s = 0; s < nSlots; s++) if (teacherFree(occ, teacherId, s) && familyFree(occ, familyId, s)) legal.push(s);
	return legal;
}
function moveMeeting(schedule, families, settings, familyId, teacherId, fromSlot, toSlot) {
	const nSlots = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
	if (toSlot < 0 || toSlot >= nSlots) return null;
	if (!legalSlotsForMove(schedule.meetings, familyId, teacherId, fromSlot, nSlots).includes(toSlot)) return null;
	const meetings = schedule.meetings.map((m) => m.familyId === familyId && m.teacherId === teacherId && m.slotIndex === fromSlot ? {
		...m,
		slotIndex: toSlot
	} : m);
	return {
		meetings,
		unscheduled: schedule.unscheduled,
		itineraries: analyzeSchedule(families, meetings, schedule.unscheduled, settings),
		generatedAt: schedule.generatedAt
	};
}
function scheduleStats(result, families) {
	const requested = families.reduce((n, f) => n + uniqueIds(f.teacherIds).length, 0);
	const placed = result.meetings.length;
	const withGap = result.itineraries.filter((i) => i.violatesMaxGap).length;
	const withMissing = result.itineraries.filter((i) => i.unscheduledTeacherIds.length > 0).length;
	const withMeetings = result.itineraries.filter((i) => i.meetings.length > 0);
	return {
		requested,
		placed,
		withGap,
		withMissing,
		avgIdle: withMeetings.length === 0 ? 0 : withMeetings.reduce((n, i) => n + i.idleMinutes, 0) / withMeetings.length,
		maxIdle: result.itineraries.reduce((n, i) => Math.max(n, i.maxGapMinutes), 0),
		teacherConflict: isTeacherDoubleBooked(result.meetings),
		familyConflict: isFamilyDoubleBooked(result.meetings)
	};
}
var seedSettings = {
	schoolName: "Maplewood Elementary",
	title: "Fall Conferences",
	date: "2026-10-22",
	startTime: "16:00",
	endTime: "19:00",
	slotMinutes: 15,
	maxGapMinutes: 30
};
var seedTeachers = [
	{
		id: "t-chen",
		name: "Avery Chen",
		role: "Grade 2 Homeroom",
		room: "Room 12"
	},
	{
		id: "t-alvarez",
		name: "Mateo Alvarez",
		role: "Grade 2 Homeroom",
		room: "Room 14"
	},
	{
		id: "t-patel",
		name: "Priya Patel",
		role: "Grade 3 Homeroom",
		room: "Room 18"
	},
	{
		id: "t-brooks",
		name: "Jordan Brooks",
		role: "Grade 4 Homeroom",
		room: "Room 22"
	},
	{
		id: "t-okonkwo",
		name: "Nia Okonkwo",
		role: "Reading Specialist",
		room: "Room 8"
	},
	{
		id: "t-singh",
		name: "Raj Singh",
		role: "Math Support",
		room: "Room 9"
	},
	{
		id: "t-rivera",
		name: "Camila Rivera",
		role: "Visual Art",
		room: "Studio A"
	},
	{
		id: "t-hale",
		name: "Owen Hale",
		role: "Music",
		room: "Music Room"
	},
	{
		id: "t-diaz",
		name: "Lena Diaz",
		role: "Physical Education",
		room: "Gym"
	},
	{
		id: "t-walsh",
		name: "Helen Walsh",
		role: "Learning Support",
		room: "Room 6"
	},
	{
		id: "t-ito",
		name: "Yuki Ito",
		role: "Language Support",
		room: "Room 4"
	},
	{
		id: "t-berg",
		name: "Dana Berg",
		role: "School Counselor",
		room: "Office"
	}
];
var seedFamilies = [
	{
		id: "f-ruiz",
		familyName: "Ruiz",
		guardian: "Alex Ruiz",
		student: "Elena",
		grade: "2",
		teacherIds: [
			"t-chen",
			"t-okonkwo",
			"t-rivera"
		]
	},
	{
		id: "f-park",
		familyName: "Park",
		guardian: "Grace Park",
		student: "Noah",
		grade: "2",
		teacherIds: [
			"t-chen",
			"t-singh",
			"t-hale"
		]
	},
	{
		id: "f-mensah",
		familyName: "Mensah",
		guardian: "Kwame Mensah",
		student: "Ama",
		grade: "2",
		teacherIds: ["t-chen", "t-okonkwo"]
	},
	{
		id: "f-gallagher",
		familyName: "Gallagher",
		guardian: "Casey Gallagher",
		student: "Finn",
		grade: "2",
		teacherIds: [
			"t-chen",
			"t-diaz",
			"t-rivera"
		]
	},
	{
		id: "f-cho",
		familyName: "Cho",
		guardian: "Min Cho",
		student: "Mina",
		grade: "2",
		teacherIds: [
			"t-chen",
			"t-ito",
			"t-berg"
		]
	},
	{
		id: "f-haddad",
		familyName: "Haddad",
		guardian: "Lina Haddad",
		student: "Lila",
		grade: "2",
		teacherIds: [
			"t-alvarez",
			"t-okonkwo",
			"t-hale"
		]
	},
	{
		id: "f-okafor",
		familyName: "Okafor",
		guardian: "Chidi Okafor",
		student: "Tunde",
		grade: "2",
		teacherIds: ["t-alvarez", "t-singh"]
	},
	{
		id: "f-bennett",
		familyName: "Bennett",
		guardian: "Sam Bennett",
		student: "Willa",
		grade: "2",
		teacherIds: [
			"t-alvarez",
			"t-rivera",
			"t-diaz"
		]
	},
	{
		id: "f-nguyen",
		familyName: "Nguyen",
		guardian: "Hannah Nguyen",
		student: "Kai",
		grade: "2",
		teacherIds: [
			"t-alvarez",
			"t-okonkwo",
			"t-walsh"
		]
	},
	{
		id: "f-rossi",
		familyName: "Rossi",
		guardian: "Elena Rossi",
		student: "Nico",
		grade: "2",
		teacherIds: [
			"t-alvarez",
			"t-hale",
			"t-berg"
		]
	},
	{
		id: "f-bergstrom",
		familyName: "Bergstrom",
		guardian: "Astrid Bergstrom",
		student: "Freya",
		grade: "3",
		teacherIds: [
			"t-patel",
			"t-singh",
			"t-okonkwo"
		]
	},
	{
		id: "f-ali",
		familyName: "Ali",
		guardian: "Noor Ali",
		student: "Yasmin",
		grade: "3",
		teacherIds: [
			"t-patel",
			"t-rivera",
			"t-ito"
		]
	},
	{
		id: "f-kowalski",
		familyName: "Kowalski",
		guardian: "Piotr Kowalski",
		student: "Marek",
		grade: "3",
		teacherIds: [
			"t-patel",
			"t-hale",
			"t-diaz"
		]
	},
	{
		id: "f-washington",
		familyName: "Washington",
		guardian: "Jordan Washington",
		student: "June",
		grade: "3",
		teacherIds: [
			"t-patel",
			"t-walsh",
			"t-okonkwo"
		]
	},
	{
		id: "f-sharma",
		familyName: "Sharma",
		guardian: "Anika Sharma",
		student: "Arjun",
		grade: "3",
		teacherIds: [
			"t-patel",
			"t-singh",
			"t-berg"
		]
	},
	{
		id: "f-deluca",
		familyName: "DeLuca",
		guardian: "Marco DeLuca",
		student: "Sofia",
		grade: "4",
		teacherIds: [
			"t-brooks",
			"t-singh",
			"t-rivera"
		]
	},
	{
		id: "f-thompson",
		familyName: "Thompson",
		guardian: "Riley Thompson",
		student: "Ellis",
		grade: "4",
		teacherIds: [
			"t-brooks",
			"t-okonkwo",
			"t-diaz"
		]
	},
	{
		id: "f-ibrahim",
		familyName: "Ibrahim",
		guardian: "Fatima Ibrahim",
		student: "Hana",
		grade: "4",
		teacherIds: [
			"t-brooks",
			"t-hale",
			"t-walsh"
		]
	},
	{
		id: "f-mcrae",
		familyName: "McRae",
		guardian: "Owen McRae",
		student: "Callum",
		grade: "4",
		teacherIds: [
			"t-brooks",
			"t-singh",
			"t-berg"
		]
	},
	{
		id: "f-flores",
		familyName: "Flores",
		guardian: "Camila Flores",
		student: "Mateo",
		grade: "4",
		teacherIds: [
			"t-brooks",
			"t-rivera",
			"t-ito",
			"t-okonkwo",
			"t-singh"
		]
	}
];
function makeSeedSchedule() {
	return buildSchedule(seedTeachers, seedFamilies, seedSettings);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function nid(prefix = "id") {
	return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}
function withStale(set, patch) {
	set({
		...patch,
		stale: true,
		selected: null
	});
}
var emptyNight = {
	schoolName: "",
	title: "Parent-Teacher Conferences",
	date: "2026-10-22",
	startTime: "16:00",
	endTime: "19:00",
	slotMinutes: 15,
	maxGapMinutes: 30
};
var useConference = create()(persist((set, get) => ({
	settings: seedSettings,
	teachers: seedTeachers,
	families: seedFamilies,
	schedule: makeSeedSchedule(),
	stale: false,
	selected: null,
	setSettings: (patch) => withStale(set, { settings: {
		...get().settings,
		...patch
	} }),
	addTeacher: (input) => withStale(set, { teachers: [...get().teachers, {
		...input,
		id: nid("t")
	}] }),
	updateTeacher: (id, patch) => withStale(set, { teachers: get().teachers.map((t) => t.id === id ? {
		...t,
		...patch
	} : t) }),
	removeTeacher: (id) => withStale(set, {
		teachers: get().teachers.filter((t) => t.id !== id),
		families: get().families.map((f) => ({
			...f,
			teacherIds: f.teacherIds.filter((tid) => tid !== id)
		}))
	}),
	addFamily: (input) => withStale(set, { families: [...get().families, {
		...input,
		id: nid("f")
	}] }),
	updateFamily: (id, patch) => withStale(set, { families: get().families.map((f) => f.id === id ? {
		...f,
		...patch
	} : f) }),
	removeFamily: (id) => withStale(set, { families: get().families.filter((f) => f.id !== id) }),
	generate: () => {
		const { teachers, families, settings } = get();
		set({
			schedule: buildSchedule(teachers, families, settings),
			stale: false,
			selected: null
		});
	},
	clearSchedule: () => set({
		schedule: null,
		stale: true,
		selected: null
	}),
	selectMeeting: (selected) => set({ selected }),
	moveSelectedTo: (slotIndex) => {
		const { schedule, families, settings, selected } = get();
		if (!schedule || !selected) return false;
		const next = moveMeeting(schedule, families, settings, selected.familyId, selected.teacherId, selected.slotIndex, slotIndex);
		if (!next) return false;
		set({
			schedule: next,
			selected: {
				...selected,
				slotIndex
			},
			stale: false
		});
		return true;
	},
	legalSlots: () => {
		const { schedule, settings, selected } = get();
		if (!schedule || !selected) return [];
		const n = slotCount(settings.startTime, settings.endTime, settings.slotMinutes);
		return legalSlotsForMove(schedule.meetings, selected.familyId, selected.teacherId, selected.slotIndex, n);
	},
	loadDemo: () => set({
		settings: seedSettings,
		teachers: seedTeachers,
		families: seedFamilies,
		schedule: makeSeedSchedule(),
		stale: false,
		selected: null
	}),
	resetEmpty: () => set({
		settings: emptyNight,
		teachers: [],
		families: [],
		schedule: null,
		stale: true,
		selected: null
	}),
	stats: () => {
		const { schedule, families } = get();
		if (!schedule) return null;
		return scheduleStats(schedule, families);
	}
}), {
	name: "convene-night-v1",
	partialize: (s) => ({
		settings: s.settings,
		teachers: s.teachers,
		families: s.families,
		schedule: s.schedule,
		stale: s.stale
	}),
	skipHydration: true
}));
var hydrateStarted = false;
function rehydrateConference() {
	if (hydrateStarted) return;
	hydrateStarted = true;
	useConference.persist.rehydrate();
}
function PersistGate() {
	(0, import_react.useEffect)(() => {
		rehydrateConference();
	}, []);
	return null;
}
var styles_default = "/assets/styles-DFOey1xc.css";
var APP_NAME = "Convene";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Schedule parent-teacher conferences without double-booking teachers or leaving families waiting."
			},
			{
				name: "theme-color",
				content: "#1e3a4c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistGate, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-right",
				toastOptions: { className: "font-sans bg-surface text-ink border-line shadow-[var(--shadow-border)]" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-Dgw8_62Q.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./families-CSfhP0eR.mjs");
var Route$3 = createFileRoute("/families")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./print-KmRjAnol.mjs");
var Route$2 = createFileRoute("/print")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./schedule-D13G01qs.mjs");
var Route$1 = createFileRoute("/schedule")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./teachers-CZQnpxN1.mjs");
var Route = createFileRoute("/teachers")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	FamiliesRoute: Route$3.update({
		id: "/families",
		path: "/families",
		getParentRoute: () => Route$5
	}),
	PrintRoute: Route$2.update({
		id: "/print",
		path: "/print",
		getParentRoute: () => Route$5
	}),
	ScheduleRoute: Route$1.update({
		id: "/schedule",
		path: "/schedule",
		getParentRoute: () => Route$5
	}),
	TeachersRoute: Route.update({
		id: "/teachers",
		path: "/teachers",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { formatMinutes as a, minutesFromHm as c, slotRangeLabel as d, familyChipIndex as i, slotCount as l, useConference as n, formatNightDate as o, cn as r, formatNightDateShort as s, router_exports as t, slotLabel as u };
