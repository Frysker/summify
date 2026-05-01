import { createContext, useContext, useState } from "react";

/**
 * DocumentContext
 * Global state shared across Original, Summarized, and Graph pages.
 *
 * State:
 *  - mode          "bullet" | "paragraph"
 *  - uploadedFile  File | null
 *  - pastedText    string
 *  - extractedText string   (plain text from parsed file or paste)
 *  - summary       string   (AI-generated summary result)
 *  - activeTab     "original" | "summarized" | "graph"
 *  - sidebarOpen   boolean
 */

const DocumentContext = createContext(null);

export function DocumentProvider({ children }) {
  const [mode, setMode]               = useState("bullet");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pastedText, setPastedText]   = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary]         = useState("");
  const [activeTab, setActiveTab]     = useState("original");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen((v) => !v);
  }

  function resetDocument() {
    setUploadedFile(null);
    setPastedText("");
    setExtractedText("");
    setSummary("");
  }

  return (
    <DocumentContext.Provider
      value={{
        mode, setMode,
        uploadedFile, setUploadedFile,
        pastedText, setPastedText,
        extractedText, setExtractedText,
        summary, setSummary,
        activeTab, setActiveTab,
        sidebarOpen, toggleSidebar,
        resetDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

/** Convenience hook */
export function useDocument() {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error("useDocument must be used inside <DocumentProvider>");
  return ctx;
}
