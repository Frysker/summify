import Navbar from "./Navbar";
import TabBar from "./TabBar";
import Sidebar from "./Sidebar";

export default function AppLayout({ children, fixedHeight = false }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      width: "100%", maxWidth: 412, margin: "0 auto",
      background: "var(--bg-page)",
      height: fixedHeight ? "100dvh" : undefined,
      minHeight: fixedHeight ? undefined : "100vh",
      transition: "background 0.25s ease",
    }}>
      <Navbar />
      <TabBar />
      <Sidebar />
      {children}
    </div>
  );
}