
import ProgramCompletion from '../components/impact/ProgramCompletion';
import PageMeta from '../components/common/PageMeta';

export default function Programs() {
  return (
    <>
      <PageMeta
        title="Program Completion Analysis - Acentrium Africa"
        description="Analyze completion rates and effectiveness of Acentrium Africa's AI education programs across different initiatives"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <ProgramCompletion />
        </div>
      </div>
    </>
  );
}
