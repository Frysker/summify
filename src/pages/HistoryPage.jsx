import { useMemo, useState } from "react";
import MobileShell, { ClipboardIcon, FileTextIcon } from "../components/layout/MobileShell";
import { useDocument } from "../context/DocumentContext";

export default function HistoryPage() {
  const [query, setQuery] = useState("");
  const { uploadedFile, extractedText, summary, resetDocument } = useDocument();
  const hasRecord = Boolean(uploadedFile || extractedText.trim() || summary.trim());

  const records = useMemo(() => {
    if (!hasRecord) return [];

    return [
      {
        id: "current-summary",
        name: uploadedFile?.name || "Current Summary",
        date: new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      },
    ];
  }, [hasRecord, uploadedFile]);

  const visibleRecords = records.filter((record) =>
    record.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <MobileShell>
      <div className="history-page">
        <h1 className="screen-title">History</h1>

        {hasRecord && (
          <>
            <div className="history-toolbar">
              <label className="history-search">
                <SearchIcon />
                <input
                  type="search"
                  placeholder="Search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <button type="button" className="history-sort">
                <span>Sort</span>
                <SortIcon />
              </button>
            </div>

            <div className="history-list">
              {visibleRecords.map((record) => (
                <article className="history-item" key={record.id}>
                  <button
                    type="button"
                    className="history-item__delete"
                    onClick={resetDocument}
                    aria-label={`Delete ${record.name}`}
                  >
                    x
                  </button>
                  <FileTextIcon />
                  <div>
                    <h2>{record.name}</h2>
                    <p>{record.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {!hasRecord && (
          <div className="history-empty">
            <ClipboardIcon />
            <span>No Files Summarized!</span>
          </div>
        )}
      </div>
    </MobileShell>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M8 12h12M12 17h8" />
    </svg>
  );
}
