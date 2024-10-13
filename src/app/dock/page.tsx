// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { FloatingDock } from "@/components/ui/floating-dock";
// // // import { motion, useAnimation } from 'framer-motion';
// import { motion, useAnimation, useInView } from 'framer-motion';
// import Image from "next/image";
// import {
//    IconBrandGithub,
//    IconBrandX,
//    IconExchange,
//    IconHome,
//    IconNewSection,
//    IconTerminal2,
// } from "@tabler/icons-react";

// const links = [
//    {
//       title: "Home",
//       icon: (
//          <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
//       ),
//       href: "#",
//    },

//    {
//       title: "Products",
//       icon: (
//          <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
//       ),
//       href: "#",
//    },
//    {
//       title: "Components",
//       icon: (
//          <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
//       ),
//       href: "#",
//    },
//    {
//       title: "Aceternity UI",
//       icon: (
//          <Image
//             src="/images/logo-dark.png"
//             width={20}
//             height={20}
//             alt="Aceternity Logo"
//          />
//       ),
//       href: "#",
//    },
//    {
//       title: "Changelog",
//       icon: (
//          <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
//       ),
//       href: "#",
//    },

//    {
//       title: "Twitter",
//       icon: (
//          <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
//       ),
//       href: "#",
//    },
//    {
//       title: "GitHub",
//       icon: (
//          <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
//       ),
//       href: "#",
//    },
// ];



// const Dock = () => {




//    const controls = useAnimation(); // Animation controls
//    const inViewRef = React.useRef(null); // Create a ref
//    const inView = useInView(inViewRef, { once: false }); // Detect when the element is in view
//    const [after5Sec, setAfter5Sec] = useState(false);
//    const [hovered, setHovered] = useState(false);


//    console.log(inView);








//    useEffect(() => {
//       if (inView) {
//          // Animate when the element comes into view
//          controls.start({
//             scale: 1.2, // Scale up
//             y: -50,     // Move up
//             transition: { duration: 1 }, // Duration of the animation
//          });

//          // Set timeout to reset after 5 seconds
//          const timeoutId = setTimeout(() => {
//             setAfter5Sec(true);
//             controls.start({
//                scale: 1, // Reset scale
//                y: 0,     // Reset position
//                transition: { duration: 1 }, // Smooth transition back
//             });
//          }, 5000); // 5 seconds delay

//          return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
//       }
//    }, [inView, controls]);


//    return (
//       <div className="h-full w-full">
//          <div className="">
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt possimus pariatur ut obcaecati, non ab delectus repellendus placeat perferendis deserunt, earum molestias architecto ad beatae ipsum dolorum harum tempora amet vel sunt saepe ipsam. Molestias hic explicabo itaque, consequuntur earum odio quam iure repudiandae voluptatibus nisi aperiam, adipisci unde sunt ipsum quas suscipit dolore rerum molestiae, quibusdam perferendis ullam sit et ipsam veritatis! Facere labore beatae exercitationem iste, temporibus recusandae hic provident, reprehenderit totam nisi amet ut odio placeat similique omnis alias architecto quas. Explicabo quidem quas reiciendis magni voluptas exercitationem eligendi rerum molestiae laborum enim obcaecati placeat voluptatem, ad corrupti aspernatur doloremque neque non dolorem! Repellendus, quisquam? Voluptatum pariatur facere, consectetur ea excepturi quae cum alias illum officiis eaque dolor nulla omnis itaque ratione consequuntur asperiores provident iste vitae possimus molestiae nesciunt ab minus! Quasi qui, ea assumenda dicta tempora vel aperiam nesciunt sapiente illum aut quos nostrum facilis repudiandae voluptatibus, quo pariatur saepe perspiciatis atque libero, tempore sunt veniam! Autem mollitia quaerat dolor. Minus optio nam deserunt nihil suscipit ratione id distinctio omnis voluptatum magni! Est, accusamus adipisci! Praesentium assumenda quod animi voluptas explicabo in cumque quaerat et nesciunt iure ex repellendus doloremque modi harum dolores commodi nobis facere, qui itaque quasi dolor similique libero eligendi. Molestiae voluptatibus reiciendis, sint ad doloremque ullam quae dolores nemo consequatur fuga soluta delectus omnis nostrum ea commodi consectetur, iusto, impedit in provident a nobis quis. Perferendis odio iusto nobis dolores esse consequatur accusantium voluptas. Tempora, aut ab accusamus cupiditate vitae dignissimos culpa sequi inventore in magnam nisi eos aperiam eveniet voluptate neque illum deserunt expedita at, ad atque necessitatibus ipsa quia consequuntur sint! Inventore ab qui, tempora beatae quidem sunt animi consequatur tenetur excepturi possimus dolores eligendi nam cumque magni aperiam quaerat iusto odio repellendus quis? Fugiat facilis velit voluptatum magnam necessitatibus ab vero aliquid itaque dicta perferendis, est deleniti obcaecati ipsa delectus similique quae suscipit ratione exercitationem tempore. Esse, laborum similique vitae incidunt ut saepe soluta! Consequuntur est impedit eveniet molestias, at, esse ex nulla cumque consequatur quaerat rem dolor possimus in? Dolore vero esse nemo dignissimos officiis nulla similique ratione commodi rerum nam, officia ipsum sunt expedita, deserunt odit facere. Totam nostrum, libero, illo ab ut sit consequatur minus molestiae aperiam deserunt tempora blanditiis itaque! Repellat qui similique officiis reprehenderit molestias? Accusantium, iusto, nostrum excepturi alias exercitationem enim mollitia unde ipsam corporis officia quod nemo odio magnam praesentium repellendus necessitatibus ipsum dolores incidunt. Perferendis, quidem alias. Omnis et fuga explicabo, quam deleniti dolore ipsum consectetur suscipit inventore quidem animi id exercitationem, illo consequatur optio temporibus. Optio natus modi totam cum reprehenderit nulla. Possimus nesciunt non neque illum adipisci corrupti delectus sunt enim inventore labore doloribus eos quisquam consequatur qui quam deleniti deserunt ipsam, quasi laudantium dignissimos eaque ut facilis nulla. Architecto accusantium maiores molestiae quam illum sapiente odio quasi laboriosam dolorem cumque sit, dicta suscipit nihil temporibus modi perferendis exercitationem earum reprehenderit obcaecati! At quas quam dolor eos nam cupiditate fugit enim eveniet, dolore, similique mollitia odio esse nulla reiciendis suscipit exercitationem totam consequatur perspiciatis accusamus aperiam debitis? Maiores obcaecati facilis id laborum quod illo tempore, ab suscipit? Beatae quos distinctio et amet deleniti fugiat vitae ducimus ipsum sed! Nesciunt sint provident cumque dolores, culpa doloribus ipsum veritatis voluptate totam, iste id eius. Exercitationem delectus consequatur sit, magni ut neque itaque libero rem, in rerum sed obcaecati, tempora recusandae animi a incidunt necessitatibus ex minima hic ratione quis iusto eligendi! Veniam, fuga aspernatur. Quaerat a eligendi earum, modi dicta neque aperiam unde ipsum odit sint ab est quidem illo quam perferendis voluptatibus dolorem commodi labore nulla. Qui quod cupiditate numquam molestias soluta voluptatum explicabo possimus totam illo incidunt quos voluptates quaerat doloremque, nemo veniam, minima ullam enim tempore. Laboriosam repudiandae atque vero earum totam nisi maiores ut consequatur, nulla a illo voluptatum recusandae commodi odio quidem ad maxime voluptatem dolores eligendi ipsa soluta consectetur quis. Enim quasi cumque eius libero accusantium nulla aliquam nemo quis nam ipsum quod odit, exercitationem nesciunt incidunt tempora soluta vero tenetur expedita et inventore, mollitia commodi natus. Mollitia quasi odio commodi nobis, distinctio ad obcaecati repudiandae ea iste suscipit inventore eius laborum culpa numquam maxime non illo quisquam, deserunt iure? Necessitatibus voluptas adipisci maxime deserunt laboriosam saepe. Libero natus illum a ullam nesciunt assumenda ab tempore ipsa? Quas odio numquam, quibusdam nobis magni dolores iure. Deserunt aperiam totam iste impedit accusamus nulla praesentium pariatur architecto fugiat beatae laudantium, sint quos est at reprehenderit, asperiores quod quaerat odio! Dolor alias optio magni! Optio dolorum ipsam id animi possimus eligendi enim quos rem dolorem labore cumque inventore dolore et earum, consectetur recusandae necessitatibus nobis reprehenderit dignissimos eius, nostrum placeat modi doloremque! Modi est porro nisi quam id! A, quis dicta hic est qui voluptatum optio! Enim mollitia ipsa ea inventore? Eligendi a sed quam recusandae dolor quia nesciunt incidunt, illum magni quo rem quaerat placeat quisquam inventore temporibus obcaecati in corrupti nostrum, exercitationem necessitatibus dignissimos eaque voluptatum? Error nemo temporibus dolores nesciunt ullam esse quaerat alias vitae. Dolores culpa delectus animi magnam quod modi, minus molestias voluptates omnis optio repudiandae ullam odio iure eaque? Architecto labore, voluptatum tempora voluptatibus et, aliquam molestias praesentium cumque id alias delectus laudantium nobis ad iste saepe assumenda blanditiis vero quia, expedita modi officia? Reiciendis mollitia et totam quam necessitatibus, ipsam quisquam modi illum rerum deleniti animi commodi similique asperiores ducimus nihil in natus. Minima, cumque quos minus obcaecati nesciunt magni ipsam aperiam libero nulla, officia provident sed aspernatur. Placeat omnis voluptatum tempora officiis nisi. Nisi ut blanditiis facilis assumenda, esse omnis aut cum autem sunt sed corporis dolorum molestiae laborum aperiam cupiditate unde est cumque adipisci repellat. Voluptates officia earum accusantium eaque, praesentium quis ea iusto voluptatem recusandae minus accusamus laudantium placeat magni, quo eveniet rem. Possimus doloremque neque illum voluptatibus, natus impedit odit libero adipisci, molestias voluptas molestiae quod beatae deserunt. Totam ipsum impedit eius voluptatibus adipisci corrupti nulla magnam eum fuga! Consequatur doloribus atque, enim nemo nihil quasi dolor sed suscipit. Officiis dignissimos quod similique, blanditiis alias ab.
//          </div>
//          <motion.div
//             ref={inViewRef}
//             animate={controls}
//             className="h-[50px]"
//          // animate={{ y: -70 }}
//          // for hide and unhide the dock
//          >
//             {inView && !after5Sec ? (
//                <div className=" flex items-center">
//                   <FloatingDock
//                      desktopClassName="bg-white w-auto m-auto px-3.5 rounded-lg px-2.5 scale-[0.60]"
//                      items={links}
//                   />
//                </div>
//             ) : (
//                <div className="border-2 border-red rounded-xl m-auto relative z-30  w-[50%]"></div>
//             )}
//          </motion.div>


//          {/* <div>
//             <div className="border-2 border-red rounded-xl m-auto relative z-30  w-[50%]"></div>
//          </div>
//  */}



//          {/* <motion.div
//             ref={inViewRef} // Attach the ref to the motion div
//             initial={{ scale: 1, y: 0 }} // Initial state
//             animate={controls} // Control animations
//             className="h-40 w-40 bg-blue-500 mx-auto mt-20 flex items-center justify-center"
//          >
//             Scroll to see me!
//          </motion.div> */}
//       </div>
//    );
// };

// export default Dock;














"use client";
import React, { useEffect, useRef, useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
// // import { motion, useAnimation } from 'framer-motion';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from "next/image";
import {
   IconBrandGithub,
   IconBrandX,
   IconExchange,
   IconHome,
   IconNewSection,
   IconTerminal2,
} from "@tabler/icons-react";

const links = [
   {
      title: "Home",
      icon: (
         <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
   },

   {
      title: "Products",
      icon: (
         <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
   },
   {
      title: "Components",
      icon: (
         <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
   },
   {
      title: "Aceternity UI",
      icon: (
         <Image
            src="/images/logo-dark.png"
            width={20}
            height={20}
            alt="Aceternity Logo"
         />
      ),
      href: "#",
   },
   {
      title: "Changelog",
      icon: (
         <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
   },

   {
      title: "Twitter",
      icon: (
         <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
   },
   {
      title: "GitHub",
      icon: (
         <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
   },
];



const Dock = () => {




   // const controls = useAnimation(); // Animation controls
   const inViewRef = useRef(null);
   const inView = useInView(inViewRef, { once: false }); // Detect when the element is in view
   const [after5Sec, setAfter5Sec] = useState(false);


   console.log(inView);

   const delay5Sec = () => {
      setAfter5Sec(true);
      setTimeout(() => {
         setAfter5Sec(false);
      }, 4999)
   }







   useEffect(() => {
      if (inView) {
         delay5Sec();
      }
   }, [inView]);


   return (
      <div className="h-full w-full">
         <div className="">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt possimus pariatur ut obcaecati, non ab delectus repellendus placeat perferendis deserunt, earum molestias architecto ad beatae ipsum dolorum harum tempora amet vel sunt saepe ipsam. Molestias hic explicabo itaque, consequuntur earum odio quam iure repudiandae voluptatibus nisi aperiam, adipisci unde sunt ipsum quas suscipit dolore rerum molestiae, quibusdam perferendis ullam sit et ipsam veritatis! Facere labore beatae exercitationem iste, temporibus recusandae hic provident, reprehenderit totam nisi amet ut odio placeat similique omnis alias architecto quas. Explicabo quidem quas reiciendis magni voluptas exercitationem eligendi rerum molestiae laborum enim obcaecati placeat voluptatem, ad corrupti aspernatur doloremque neque non dolorem! Repellendus, quisquam? Voluptatum pariatur facere, consectetur ea excepturi quae cum alias illum officiis eaque dolor nulla omnis itaque ratione consequuntur asperiores provident iste vitae possimus molestiae nesciunt ab minus! Quasi qui, ea assumenda dicta tempora vel aperiam nesciunt sapiente illum aut quos nostrum facilis repudiandae voluptatibus, quo pariatur saepe perspiciatis atque libero, tempore sunt veniam! Autem mollitia quaerat dolor. Minus optio nam deserunt nihil suscipit ratione id distinctio omnis voluptatum magni! Est, accusamus adipisci! Praesentium assumenda quod animi voluptas explicabo in cumque quaerat et nesciunt iure ex repellendus doloremque modi harum dolores commodi nobis facere, qui itaque quasi dolor similique libero eligendi. Molestiae voluptatibus reiciendis, sint ad doloremque ullam quae dolores nemo consequatur fuga soluta delectus omnis nostrum ea commodi consectetur, iusto, impedit in provident a nobis quis. Perferendis odio iusto nobis dolores esse consequatur accusantium voluptas. Tempora, aut ab accusamus cupiditate vitae dignissimos culpa sequi inventore in magnam nisi eos aperiam eveniet voluptate neque illum deserunt expedita at, ad atque necessitatibus ipsa quia consequuntur sint! Inventore ab qui, tempora beatae quidem sunt animi consequatur tenetur excepturi possimus dolores eligendi nam cumque magni aperiam quaerat iusto odio repellendus quis? Fugiat facilis velit voluptatum magnam necessitatibus ab vero aliquid itaque dicta perferendis, est deleniti obcaecati ipsa delectus similique quae suscipit ratione exercitationem tempore. Esse, laborum similique vitae incidunt ut saepe soluta! Consequuntur est impedit eveniet molestias, at, esse ex nulla cumque consequatur quaerat rem dolor possimus in? Dolore vero esse nemo dignissimos officiis nulla similique ratione commodi rerum nam, officia ipsum sunt expedita, deserunt odit facere. Totam nostrum, libero, illo ab ut sit consequatur minus molestiae aperiam deserunt tempora blanditiis itaque! Repellat qui similique officiis reprehenderit molestias? Accusantium, iusto, nostrum excepturi alias exercitationem enim mollitia unde ipsam corporis officia quod nemo odio magnam praesentium repellendus necessitatibus ipsum dolores incidunt. Perferendis, quidem alias. Omnis et fuga explicabo, quam deleniti dolore ipsum consectetur suscipit inventore quidem animi id exercitationem, illo consequatur optio temporibus. Optio natus modi totam cum reprehenderit nulla. Possimus nesciunt non neque illum adipisci corrupti delectus sunt enim inventore labore doloribus eos quisquam consequatur qui quam deleniti deserunt ipsam, quasi laudantium dignissimos eaque ut facilis nulla. Architecto accusantium maiores molestiae quam illum sapiente odio quasi laboriosam dolorem cumque sit, dicta suscipit nihil temporibus modi perferendis exercitationem earum reprehenderit obcaecati! At quas quam dolor eos nam cupiditate fugit enim eveniet, dolore, similique mollitia odio esse nulla reiciendis suscipit exercitationem totam consequatur perspiciatis accusamus aperiam debitis? Maiores obcaecati facilis id laborum quod illo tempore, ab suscipit? Beatae quos distinctio et amet deleniti fugiat vitae ducimus ipsum sed! Nesciunt sint provident cumque dolores, culpa doloribus ipsum veritatis voluptate totam, iste id eius. Exercitationem delectus consequatur sit, magni ut neque itaque libero rem, in rerum sed obcaecati, tempora recusandae animi a incidunt necessitatibus ex minima hic ratione quis iusto eligendi! Veniam, fuga aspernatur. Quaerat a eligendi earum, modi dicta neque aperiam unde ipsum odit sint ab est quidem illo quam perferendis voluptatibus dolorem commodi labore nulla. Qui quod cupiditate numquam molestias soluta voluptatum explicabo possimus totam illo incidunt quos voluptates quaerat doloremque, nemo veniam, minima ullam enim tempore. Laboriosam repudiandae atque vero earum totam nisi maiores ut consequatur, nulla a illo voluptatum recusandae commodi odio quidem ad maxime voluptatem dolores eligendi ipsa soluta consectetur quis. Enim quasi cumque eius libero accusantium nulla aliquam nemo quis nam ipsum quod odit, exercitationem nesciunt incidunt tempora soluta vero tenetur expedita et inventore, mollitia commodi natus. Mollitia quasi odio commodi nobis, distinctio ad obcaecati repudiandae ea iste suscipit inventore eius laborum culpa numquam maxime non illo quisquam, deserunt iure? Necessitatibus voluptas adipisci maxime deserunt laboriosam saepe. Libero natus illum a ullam nesciunt assumenda ab tempore ipsa? Quas odio numquam, quibusdam nobis magni dolores iure. Deserunt aperiam totam iste impedit accusamus nulla praesentium pariatur architecto fugiat beatae laudantium, sint quos est at reprehenderit, asperiores quod quaerat odio! Dolor alias optio magni! Optio dolorum ipsam id animi possimus eligendi enim quos rem dolorem labore cumque inventore dolore et earum, consectetur recusandae necessitatibus nobis reprehenderit dignissimos eius, nostrum placeat modi doloremque! Modi est porro nisi quam id! A, quis dicta hic est qui voluptatum optio! Enim mollitia ipsa ea inventore? Eligendi a sed quam recusandae dolor quia nesciunt incidunt, illum magni quo rem quaerat placeat quisquam inventore temporibus obcaecati in corrupti nostrum, exercitationem necessitatibus dignissimos eaque voluptatum? Error nemo temporibus dolores nesciunt ullam esse quaerat alias vitae. Dolores culpa delectus animi magnam quod modi, minus molestias voluptates omnis optio repudiandae ullam odio iure eaque? Architecto labore, voluptatum tempora voluptatibus et, aliquam molestias praesentium cumque id alias delectus laudantium nobis ad iste saepe assumenda blanditiis vero quia, expedita modi officia? Reiciendis mollitia et totam quam necessitatibus, ipsam quisquam modi illum rerum deleniti animi commodi similique asperiores ducimus nihil in natus. Minima, cumque quos minus obcaecati nesciunt magni ipsam aperiam libero nulla, officia provident sed aspernatur. Placeat omnis voluptatum tempora officiis nisi. Nisi ut blanditiis facilis assumenda, esse omnis aut cum autem sunt sed corporis dolorum molestiae laborum aperiam cupiditate unde est cumque adipisci repellat. Voluptates officia earum accusantium eaque, praesentium quis ea iusto voluptatem recusandae minus accusamus laudantium placeat magni, quo eveniet rem. Possimus doloremque neque illum voluptatibus, natus impedit odit libero adipisci, molestias voluptas molestiae quod beatae deserunt. Totam ipsum impedit eius voluptatibus adipisci corrupti nulla magnam eum fuga! Consequatur doloribus atque, enim nemo nihil quasi dolor sed suscipit. Officiis dignissimos quod similique, blanditiis alias ab.
         </div>
         <motion.div
            ref={inViewRef}
            // animate={ }
            // className="h-[50px]"
            // animate={{ y: -70 }}
            // for hide and unhide the dock
            onHoverStart={delay5Sec}
            animate={{
               height: after5Sec ? "100px" : "",
               width: after5Sec ? "500px" : "100px",
               y: after5Sec ? -50 : 0,
            }}
            style={{ backgroundColor: 'red', border: '8px solid white', borderRadius: '10px', display: 'flex', alignItems: 'center' }}
         >
            {after5Sec && (
               <div className=" flex items-center">
                  <FloatingDock
                     desktopClassName="bg-white w-auto m-auto px-3.5 rounded-lg px-2.5 scale-[0.60]"
                     items={links}
                  />
               </div>
               // <div className="border-2 border-red rounded-xl m-auto relative z-30  w-[50%]"></div>
            )}
         </motion.div>
         <FloatingDock items={links} />
      </div>
   );
};

export default Dock;



