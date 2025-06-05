export default (
  logArgs: any[],
  level: "log" | "error" | "warn" = "log"
): void => {
  if (!import.meta.env.DEV) return;
  const fn = console[level];
  onMounted(() => fn(...logArgs));
};
