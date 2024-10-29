"use client";
import { useState } from "react";

export default function Help() {
   const [number, setNumber] = useState<number>(8);

   return (
      <>
         <input type="number" onChange={e => setNumber(e.target.value)} className="text-black border-black" value={number} />
         <ul className="text-black">
            {[...Array(10).keys()].map((i) => (
               <li key={i}>
                  {number} * {i + 1} = {number * (i + 1)}
               </li>
            ))}
         </ul>
      </>
   )
}