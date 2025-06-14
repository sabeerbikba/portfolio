export default (
  logArgs: any[],
  level: "log" | "error" | "warn" = "log"
): void => {
  if (!import.meta.env.DEV) return;
  if (typeof window !== "undefined") {
    // onMounted(() =>
    console[level](...logArgs);
    // );
  }
};
