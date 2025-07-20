export default () => {
  const { pointerType } = usePointer();

  return {
    pointerType,
    isTouch: computed(() => pointerType.value === "touch"),
    isMouse: computed(() => pointerType.value === "mouse"),
    isPen: computed(() => pointerType.value === "pen"),
  };
};
