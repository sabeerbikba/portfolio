export default () => {
  if (import.meta.browser) {
    (document.activeElement as HTMLElement | null)?.blur();
  }
};
