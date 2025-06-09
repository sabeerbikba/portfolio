import type { ProjectDataType } from "./github";

type ScreenStoreStateType = {
  previewProject: number;
  previewApp: number;
  data: ProjectDataType[];
  isLoading: boolean;
};

type ScreenStoreActionType =
  | { type: "TOGGLE_PROJECT"; payload: number }
  | { type: "TOGGLE_APP"; payload: number };

type ScreenStoreType = {
  state: ScreenStoreStateType;
  dispatch: (action: ScreenStoreActionType) => void;
};

export type { ScreenStoreStateType, ScreenStoreActionType, ScreenStoreType };
