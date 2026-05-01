import { useDocument } from "../../context/DocumentContext";

export default function Navbar() {
  const { toggleSidebar } = useDocument();
  return (
    <header style={{ width: "100%", background: "var(--bg-nav)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", flexShrink: 0, transition: "background 0.25s ease" }}>
      <div style={{ width: 30, height: 30, background: "white", borderRadius: 4 }} aria-label="Summify logo" />
      <button type="button" onClick={toggleSidebar} aria-label="Open menu"
        style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 5, width: 32, height: 32, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
        <span style={{ display: "block", width: 22, height: 2, background: "white", borderRadius: 2 }} />
        <span style={{ display: "block", width: 22, height: 2, background: "white", borderRadius: 2 }} />
        <span style={{ display: "block", width: 22, height: 2, background: "white", borderRadius: 2 }} />
      </button>
    </header>
  );
}