export default () => {
  const { pointerType } = usePointer();

  return {
    isTouch: computed(() => pointerType.value === "touch"),
    isMouse: computed(() => pointerType.value === "mouse"),
  };
};
