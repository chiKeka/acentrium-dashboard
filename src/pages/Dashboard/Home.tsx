import { useState } from "react";
import ImpactMetrics from "../../components/impact/ImpactMetrics";
import ProgramImpactChart from "../../components/impact/ProgramImpactChart";
import GeographicReach from "../../components/impact/GeographicReach";
import GenderDemographics from "../../components/impact/GenderDemographics";
import AfricaMap from "../../components/impact/AfricaMap";
import PageMeta from "../../components/common/PageMeta";

interface FilterData {
  type: 'region' | 'all';
  value: string;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterData>({
    type: 'all',
    value: 'all'
  });

  const handleFilterChange = (filter: FilterData) => {
    setActiveFilter(filter);
  };
  return (
    <>
      <PageMeta
        title="Acentrium Africa Impact Dashboard"
        description="Building Africa's AI Ecosystem: Education, Innovation, Impact. Track Acentrium Africa's AI education, research, and community initiatives across the continent."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">

        {/* Impact Metrics Cards */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-12">
          <ImpactMetrics filter={activeFilter} />
        </div>

        {/* Program Impact Chart */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-12 xl:col-span-8">
          <ProgramImpactChart />
        </div>

        {/* Geographic Reach */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-12 xl:col-span-4">
          <GeographicReach />
        </div>

        {/* Africa Map */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-12">
          <AfricaMap onFilterChange={handleFilterChange} />
        </div>

        {/* Gender Demographics */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-12">
          <GenderDemographics />
        </div>
      </div>
    </>
  );
}
