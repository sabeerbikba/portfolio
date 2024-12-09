import { useEffect, useState } from "react";
import type { ProjectType } from "@/data/projects";

const Website = ({
  tab, data, hidden,
}: {
  tab: number, data: ProjectType[], hidden: boolean,
}) => {
  const [loaded, setLoaded] = useState(
    Array.from({ length: data.length }, (_, index) => index === 0)
  );

  useEffect(() => {
    if (!loaded[tab]) {
      setLoaded((prevLoaded) => {
        const newLoaded = [...prevLoaded];
        newLoaded[tab] = true;
        return newLoaded;
      });
    }
  }, [tab, loaded])

  return (
    <div
      className="w-full h-full center relative"
      style={{ display: hidden ? "none" : "block" }}
    >
      {data.map(({ title, website }, index) => (
        loaded[index] && (
          <iframe
            loading="lazy"
            key={index}
            className="w-full h-full max-md:rounded-2xl"
            hidden={tab !== index}
            aria-hidden={tab !== index}
            src={website}
            title={`Project showcase: ${title}`}
          />
        )
      ))}
    </div>
  );
};

export default Website;
