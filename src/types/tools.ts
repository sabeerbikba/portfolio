type ToolsType = {
   children?: ToolsType[];
   name: string;
   imageUrl?: string | JSX.Element;
   linkUrl?: string;
   proficiency?: number;
   radius?: number;
   distance?: number;
};

export type { ToolsType };