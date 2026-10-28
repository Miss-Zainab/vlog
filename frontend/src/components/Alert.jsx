const styles = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  error: "border-red-500/30 bg-red-500/10 text-red-300",
  info: "border-line bg-surface text-muted",
};

export default function Alert({ type = "info", children }) {
  return (
    <p
      role={type === "error" ? "alert" : "status"}
      className={`rounded-lg border px-4 py-3 text-sm ${styles[type]}`}
    >
      {children}
    </p>
  );
}
