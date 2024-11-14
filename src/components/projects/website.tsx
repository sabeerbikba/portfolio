import { useEffect, useState } from "react";

const Website = ({
   tab, tabsLinks, hidden,
}: {
   tab: number, tabsLinks: string[], hidden: boolean,
}) => {
   const [loaded, setLoaded] = useState(
      Array.from({ length: tabsLinks.length }, (_, index) => index === 0)
   );

   console.log('tab', 'hideen');
   console.log(tab);
   console.log(hidden);

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
      <div className="w-full h-full center relative" style={{ display: hidden ? "none" : "block" }}>
         {tabsLinks.map((link, index) => (
            loaded[index] && (
               <iframe
                  key={index}
                  className="w-full h-full max-md:rounded-2xl"
                  hidden={tab !== index}
                  src={link}
               />
            )
         ))}
      </div>
   );
};

export default Website;
