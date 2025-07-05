type ProjectPayloadType = "dev-tools" | "rickshaw";
type AppPayloadType = "website" | "about" | "github";

type ScreenStoreStateType = {
  previewProject: number;
  previewApp: number;
};

type ScreenStoreActionType =
  | { type: "TOGGLE_PROJECT"; payload: number }
  | { type: "TOGGLE_APP"; payload: number };

type ScreenStoreType = {
  state: ScreenStoreStateType;
  dispatch: (action: ScreenStoreActionType) => void;
};

export type {
  ScreenStoreStateType,
  ScreenStoreActionType,
  ScreenStoreType,
  ProjectPayloadType,
  AppPayloadType,
};
