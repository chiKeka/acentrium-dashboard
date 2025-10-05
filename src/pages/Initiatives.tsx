
import RecentInitiatives from '../components/impact/RecentInitiatives';
import PageMeta from '../components/common/PageMeta';

export default function Initiatives() {
  return (
    <>
      <PageMeta
        title="Recent Initiatives & Programs - Acentrium Africa"
        description="Explore Acentrium Africa's latest programs, initiatives, and their impact across AI education, research, and community development"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <RecentInitiatives />
        </div>
      </div>
    </>
  );
}
