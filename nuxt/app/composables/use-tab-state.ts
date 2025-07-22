export default <T extends string[]>(keys: [...T]) => {
  return keys.map((key) =>
    useState(key, () => ({
      focused: false,
      tabClicked: false,
    }))
  ) as {
    [K in keyof T]: Ref<{
      focused: boolean;
      tabClicked: boolean;
    }>;
  };
};
