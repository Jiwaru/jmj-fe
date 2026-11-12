import React from "react";
import { SummaryCards } from "./SummaryCards";
import { PriorityList } from "./PriorityList";
import { MOCK_DASHBOARD_SUMMARY, MOCK_PRIORITY_INCIDENTS } from "@/lib/mock/incident-report";

export function DashboardInsidenFeature() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <SummaryCards data={MOCK_DASHBOARD_SUMMARY} />
      <PriorityList items={MOCK_PRIORITY_INCIDENTS.filter(item => item.report_status === "new").slice(0, 4)} />
    </div>
  );
}
