import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ModeToggle from "../components/ui/ModeToggle";
import { useDocument } from "../context/DocumentContext";
import { useFileParser } from "../hooks/useFileParser";
import { useSummarizer } from "../hooks/useSummarizer";

const CloudUploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

const ClipboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);

const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

export default function OriginalPage() {
  const fileInputRef = useRef(null);
  const textareaRef  = useRef(null);
  const navigate     = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { uploadedFile, setUploadedFile, extractedText, setExtractedText, setPastedText, setActiveTab } = useDocument();
  const { parseFile, parsing, parseError } = useFileParser();
  const { summarize, summarizing, error: summarizeError } = useSummarizer();

  const hasContent  = extractedText.trim().length > 0;
  const showButtons = !hasContent;

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) { setIsEditing(true); parseFile(file); }
    e.target.value = "";
  }

  async function handlePasteClick() {
    try {
      const text = await navigator.clipboard.readText();
      const val  = text.trim();
      if (val) { setPastedText(val); setExtractedText(val); }
    } catch { /* permission denied — textarea still opens */ } finally {
      setIsEditing(true);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
        }
      }, 0);
    }
  }

  function handleTextChange(e) {
    const val = e.target.value;
    setPastedText(val);
    setExtractedText(val);
    if (!val) { setIsEditing(false); setUploadedFile(null); }
  }

  async function handleSummarize() {
    await summarize();
    setActiveTab("summarized");
    navigate("/app/summarized");
  }

  return (
    <AppLayout>
      <div className="flex flex-col flex-1 px-4 pt-5 pb-0">
        <div className="flex justify-center mb-4"><ModeToggle /></div>
        <div className="w-full h-px bg-[#E0E0E0] mb-4" />
        <div className="flex flex-col flex-1 animate-[fadeSlideUp_0.2s_ease_both]">
          {uploadedFile && (
            <div className="flex items-center gap-2 px-3 py-[6px] mb-4 rounded-[8px] bg-[#8BA88C]/15 border border-[#8BA88C]/40 self-start">
              <span className="text-[#8BA88C] flex-shrink-0"><FileIcon /></span>
              <span className="font-['Poppins'] text-[11px] text-[#06070D] truncate max-w-[230px]">{uploadedFile.name}</span>
            </div>
          )}
          <div className="relative flex flex-col flex-1 min-h-[380px]">
            <textarea
              ref={textareaRef}
              value={extractedText}
              onChange={handleTextChange}
              placeholder="Enter a file, paste, or type your text here..."
              className="absolute inset-0 w-full h-full resize-none bg-transparent border-none outline-none font-['Poppins'] text-[13px] leading-relaxed text-[#06070D] placeholder-[#8BA88C] caret-[#8D7C66] z-0"
            />
            {showButtons && (
              <div className="absolute top-[34px] left-0 flex gap-3 z-10">
                <button type="button" onClick={() => { setIsEditing(true); fileInputRef.current?.click(); }}
                  className="flex items-center gap-2 px-4 h-[38px] rounded-full border border-[#8D7C66] bg-[#F7F8FC] font-['Poppins'] text-[13px] font-medium text-[#06070D] transition-all hover:bg-[#8D7C66]/10 active:scale-95 shadow-sm">
                  <span className="text-[#8D7C66]"><CloudUploadIcon /></span>
                  {parsing ? "Reading…" : "Upload File"}
                </button>
                <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileChange} />
                <button type="button" onClick={handlePasteClick}
                  className="flex items-center gap-2 px-4 h-[38px] rounded-full border border-[#8D7C66] bg-[#F7F8FC] font-['Poppins'] text-[13px] font-medium text-[#06070D] transition-all hover:bg-[#8D7C66]/10 active:scale-95 shadow-sm">
                  <span className="text-[#8D7C66]"><ClipboardIcon /></span>
                  Paste Text
                </button>
              </div>
            )}
          </div>
        </div>
        {parseError     && <p className="font-['Poppins'] text-[12px] text-red-400 mt-2">{parseError}</p>}
        {summarizeError && <p className="font-['Poppins'] text-[12px] text-red-400 mt-2">{summarizeError}</p>}
      </div>
      <div className="w-full flex-shrink-0">
        <div className="w-full h-px bg-[#E0E0E0]" />
        <div className="flex justify-center py-4 px-4">
          <button type="button" onClick={handleSummarize} disabled={!hasContent || summarizing}
            className="flex items-center justify-center gap-2 px-12 h-[46px] rounded-full bg-[#8BA88C] font-['Poppins'] text-[16px] font-medium text-white shadow-[4px_4px_2px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-[#7a9a7b] active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
            {summarizing ? (<><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Summarizing…</>) : "Summarize"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}