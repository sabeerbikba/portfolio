import { iconsName } from "~/content/projects";

export default (btnsGrp: "projects" | "apps", btn: string) =>
  iconsName[btnsGrp].findIndex((name) => name === btn);
