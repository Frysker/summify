import { useDocument } from "../../context/DocumentContext";
import { useNavigate } from "react-router-dom";

const TABS = [
  { key: "original",   label: "Original",  route: "/app/original"   },
  { key: "summarized", label: "Summarized", route: "/app/summarized" },
  { key: "graph",      label: "Graph",      route: "/app/graph"      },
];

export default function TabBar() {
  const { activeTab, setActiveTab } = useDocument();
  const navigate = useNavigate();

  function handleTab(tab) {
    setActiveTab(tab.key);
    navigate(tab.route);
  }

  return (
    <div style={{ width: "100%", background: "var(--bg-card)", flexShrink: 0, transition: "background 0.25s ease" }}>
      <div style={{ display: "flex", width: "100%" }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button key={tab.key} type="button" onClick={() => handleTab(tab)}
              style={{
                flex: 1, padding: "10px 0", textAlign: "center", position: "relative",
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: 14,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                transition: "color 0.2s ease",
              }}>
              {tab.label}
              {isActive && (
                <span style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 2.5, background: "var(--text-primary)", borderRadius: 2 }} />
              )}
            </button>
          );
        })}
      </div>
      <div style={{ width: "100%", height: 1, background: "var(--border-default)" }} />
    </div>
  );
}