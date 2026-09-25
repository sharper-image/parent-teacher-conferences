import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageHeader } from "@/components/shell";
import { ScheduleBoard } from "@/components/schedule-board";

export const Route = createFileRoute("/schedule")({ component: SchedulePage });

function SchedulePage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Tonight"
        title="Schedule"
        description="Teachers down the columns, time down the rows. A filled cell is one family. Move a meeting only into an open slot — that is how a teacher stays with one family at a time."
      />
      <ScheduleBoard />
    </Shell>
  );
}
