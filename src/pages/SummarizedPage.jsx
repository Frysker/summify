import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ModeToggle from "../components/ui/ModeToggle";
import SummaryContent from "../components/ui/SummaryContent";
import { useDocument } from "../context/DocumentContext";

export default function SummarizedPage() {
  const navigate = useNavigate();
  const { summary, mode, setActiveTab } = useDocument();
  const hasSummary = Boolean(summary?.trim());

  function handleGoToOriginal() {
    setActiveTab("original");
    navigate("/app/original");
  }

  return (
    <AppLayout>
      <div className="flex flex-col flex-1 px-4 pt-5 pb-0">
        <div className="flex justify-center mb-0">
          <ModeToggle defaultExpanded={hasSummary} />
        </div>
        <div className="w-full h-px bg-[#E0E0E0] mt-4 mb-4" />
        <div className="flex flex-col flex-1">
          {!hasSummary && (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 pb-20">
              <p className="font-['Poppins'] text-[13px] text-[#B8C5B1] text-center leading-relaxed">
                No summary yet. Go to{" "}
                <button type="button" onClick={handleGoToOriginal}
                  className="text-[#8D7C66] font-medium hover:underline transition-colors duration-200">
                  Original
                </button>
                {" "}and press Summarize.
              </p>
            </div>
          )}
          {hasSummary && (
            <div className="animate-[fadeSlideUp_0.25s_ease_both]">
              <SummaryContent summary={summary} mode={mode} />
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex-shrink-0">
        <div className="w-full h-px bg-[#E0E0E0]" />
        <div className="h-[60px]" />
      </div>
    </AppLayout>
  );
}