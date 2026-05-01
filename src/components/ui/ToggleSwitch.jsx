export default function ToggleSwitch({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      style={{
        position: "relative",
        width: 52,
        height: 28,
        borderRadius: 999,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        background: checked ? "#8BA88C" : "#D0D0D0",
        transition: "background 0.2s ease",
        flexShrink: 0,
        outline: "none",
        padding: 0,
      }}
    >
      {/* Thumb — inline left avoids Tailwind purge issues with dynamic classes */}
      <span
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 27 : 3,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.2s ease-in-out",
          display: "block",
        }}
      />
    </button>
  );
}
