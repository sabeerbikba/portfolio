// "use client";
// import { useState } from "react";

// const Tabs = () => {
//    const [tab, setTab] = useState(0);

//    const tabsLinks = ["https://devtools-sabeerbikba.vercel.app/", "http://honnavarrickshawservice.vercel.app/", "http://localhost:3000"]

//    return (
//       <>
//          <div className="w-screen h-[90%] center">
//             <iframe className="w-[800px] h-[800px]" src={tabsLinks[tab]} key={tabsLinks[tab]} />
//          </div>
//          <div className="w-screen h-[10%] center">
//             {tabsLinks.map((tab, id) => <button onClick={() => setTab(id)} key={id}>set {id}</button>)}
//          </div>
//       </>
//    )
// };

// export default Tabs;


// "use client";
// import { useState } from "react";

// const Tabs = () => {
//    const [tab, setTab] = useState(0);

//    const tabsLinks = [
//       "https://devtools-sabeerbikba.vercel.app/",
//       "http://honnavarrickshawservice.vercel.app/",
//       "http://localhost:3000"
//    ];

//    return (
//       <>
//          <div className="w-screen h-[90%] center relative">
//             {tabsLinks.map((link, index) => (
//                <iframe
//                   key={index}
//                   className={`w-[800px] h-[800px] absolute transition-opacity duration-300 ${tab === index ? "opacity-100" : "opacity-0 pointer-events-none"
//                      }`}
//                   src={link}
//                />
//             ))}
//          </div>
//          <div className="w-screen h-[10%] center pt-96">
//             {tabsLinks.map((_, id) => (
//                <button onClick={() => setTab(id)} key={id}>Set {id}</button>
//             ))}
//          </div>
//       </>
//    );
// };

// export default Tabs;


"use client";
import { useState } from "react";

const Tabs = () => {
   const [tab, setTab] = useState(0);
   const [loaded, setLoaded] = useState([true, false, false, false]);

   console.log(loaded);


   const tabsLinks = [
      "https://devtools-sabeerbikba.vercel.app/",
      "http://honnavarrickshawservice.vercel.app/",
      "http://github.com/sabeerbikba/dev.tools",
      // "https://ghbtns.com/github-btn.html?user=sabeerbikba&repo=dev.tools&type=star&count=true&size=large",
      "http://localhost:3000"
   ];

   const handleTabClick = (id: number) => {
      setTab(id);
      if (!loaded[id]) {
         // Mark the iframe as loaded when the tab is clicked
         setLoaded((prevLoaded) => {
            const newLoaded = [...prevLoaded];
            newLoaded[id] = true;
            return newLoaded;
         });
      }
   };

   return (
      <>
         <div className="w-screen h-[90%] center relative">
            {tabsLinks.map((link, index) => (
               loaded[index] && (
                  <iframe
                     key={index}
                     className="w-[800px] h-[800px]"
                     hidden={tab !== index}
                     src={link}
                  />
               )
            ))}
         </div>
         <div className="w-screen h-[10%] center">
            {tabsLinks.map((_, id) => (
               <button onClick={() => handleTabClick(id)} key={id}>Set {id}</button>
            ))}
         </div>
      </>
   );
};

export default Tabs;
