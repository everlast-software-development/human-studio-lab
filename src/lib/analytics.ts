// Lightweight client analytics. Pushes events to window.dataLayer (GTM-compatible),
// dispatches a CustomEvent for in-app listeners, and logs in development.
export type AnalyticsEvent =
  | { name: "app_detail_view"; app: string }
  | { name: "search_open" }
  | { name: "search_query"; query: string; results: number }
  | { name: "search_select"; target: string }
  | { name: "contact_submit"; topic: string }
  | { name: "roadmap_milestone_view"; milestone: string }
  | { name: "cta_click"; label: string };

type WindowWithDL = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  __hslEvents?: AnalyticsEvent[];
};

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const w = window as WindowWithDL;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: event.name, ...event, ts: Date.now() });
  w.__hslEvents = w.__hslEvents || [];
  w.__hslEvents.push(event);
  window.dispatchEvent(new CustomEvent("hsl:track", { detail: event }));
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event);
  }
}
