"use client";
import React from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BaKejadianTab } from "./BaKejadianTab";
import { BaKerusakanTab } from "./BaKerusakanTab";
import { IncidentCardItem } from "@/lib/types/incident-report";
import { MOCK_PRIORITY_INCIDENTS } from "@/lib/mock/incident-report";

interface VerifikasiLaporanDetailFeatureProps {
  id: string;
}

export function VerifikasiLaporanDetailFeature({ id }: VerifikasiLaporanDetailFeatureProps) {
  // Fetch mock data by ID
  const mockItem = MOCK_PRIORITY_INCIDENTS.find(item => item.uuid === id) || MOCK_PRIORITY_INCIDENTS[0];

  return (
    <Tabs defaultValue="kejadian" className="flex flex-col w-full">
      {/* Sticky Header Section (Mobile Only) */}
      <div className="sticky lg:static top-[64px] lg:top-auto z-10 lg:z-auto bg-bg-subtle lg:bg-transparent -mt-6 lg:mt-0 pt-6 lg:pt-0 -mx-6 lg:mx-0 flex flex-col gap-4">

        {/* Header: judul + tombol scroll ke Otorisasi BA */}
        <div className="self-stretch px-6 lg:px-0 flex justify-between items-center lg:items-start gap-4 lg:gap-0">
          <div className="flex-1 lg:flex-none flex flex-col justify-start items-start gap-0.5 lg:gap-1">
            <p className="self-stretch lg:self-auto text-text-muted text-base lg:text-lg font-normal leading-6 lg:leading-tight">
              Verifikasi Laporan
            </p>
            <h1 className="self-stretch lg:self-auto text-text text-lg lg:text-2xl font-semibold lg:font-medium leading-7 lg:leading-tight">
              {mockItem.report_number ?? id}
            </h1>
          </div>
          <a
            href="#otorisasi-ba"
            className="lg:hidden px-4 py-2 bg-brand rounded-sm flex justify-center items-center hover:bg-brand/90 transition-colors cursor-pointer"
            style={{ scrollBehavior: "smooth" }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("otorisasi-ba")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-white text-sm font-semibold leading-5">Otorisasi BA</span>
          </a>
        </div>

        {/* Tabs full width di mobile, tapi normal (flex-none) di desktop */}
        <div className="w-full px-0">
          <TabsList className="h-auto p-0 border-b border-border-strong w-full lg:w-max flex">
            <TabsTrigger
              value="kejadian"
              className="flex-1 lg:flex-none py-2 px-4 lg:px-16 text-sm font-normal rounded-none border-b-2 border-transparent text-text-muted data-[active]:border-brand data-[active]:text-brand cursor-pointer whitespace-nowrap"
            >
              BA Kejadian
            </TabsTrigger>
            <TabsTrigger
              value="kerusakan"
              className="flex-1 lg:flex-none py-2 px-4 lg:px-16 text-sm font-normal rounded-none border-b-2 border-transparent text-text-muted data-[active]:border-brand data-[active]:text-brand cursor-pointer whitespace-nowrap"
            >
              BA Kerusakan
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <div className="pt-4">
        <TabsContent value="kejadian" className="mt-0">
          <BaKejadianTab item={mockItem} />
        </TabsContent>
        <TabsContent value="kerusakan" className="mt-0">
          <BaKerusakanTab item={mockItem} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
