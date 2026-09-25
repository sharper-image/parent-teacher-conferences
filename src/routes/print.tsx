import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FamilyItineraries, TeacherSheets } from "@/components/schedule-board";
import { useConference } from "@/lib/store";
import { formatMinutes, formatNightDate, minutesFromHm } from "@/lib/time";

export const Route = createFileRoute("/print")({ component: PrintPage });

function PrintPage() {
  const settings = useConference((s) => s.settings);
  const schedule = useConference((s) => s.schedule);

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <div className="no-print mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4">
        <Button variant="ghost" asChild>
          <Link to="/schedule">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
        <Button type="button" onClick={() => window.print()}>
          <Printer className="size-4" />
          Print
        </Button>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16">
        <header className="print-sheet mb-8 border-b border-line pb-6">
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Convene</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            {settings.title}
          </h1>
          <p className="mt-2 text-muted">
            {settings.schoolName}
            {settings.date ? ` · ${formatNightDate(settings.date)}` : ""}
            {" · "}
            {formatMinutes(minutesFromHm(settings.startTime))}–
            {formatMinutes(minutesFromHm(settings.endTime))}
          </p>
        </header>

        {!schedule ? (
          <p className="text-muted">Build a schedule before printing.</p>
        ) : (
          <>
            <h2 className="mb-4 font-display text-2xl font-semibold">Family itineraries</h2>
            <FamilyItineraries />
            <h2 className="mt-10 mb-4 font-display text-2xl font-semibold">Teacher sheets</h2>
            <TeacherSheets />
          </>
        )}
      </div>
    </div>
  );
}
