
import ResearchPipeline from '../components/impact/ResearchPipeline';
import PageMeta from '../components/common/PageMeta';

export default function Research() {
  return (
    <>
      <PageMeta
        title="Research & Innovation Pipeline - Acentrium Africa"
        description="Track Acentrium Africa's active research projects, innovation initiatives, and their impact across different sectors in Africa"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <ResearchPipeline />
        </div>
      </div>
    </>
  );
}
