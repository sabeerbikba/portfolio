// const fs = require('fs-extra');
// const path = require('path');

// const outDir = 'out';
// const oldName = '_next';
// const newName = 'assets';
// const isVercel = process.env.VERCEL === '1';

// if (!isVercel) {
//    (async function renameNextFolder() {
//       const oldPath = path.join(outDir, oldName);
//       const newPath = path.join(outDir, newName);

//       try {
//          await fs.move(oldPath, newPath);
//          console.log(`Successfully renamed ${oldName} to ${newName}`);

//          // Update references in HTML files
//          const htmlFiles = await fs.readdir(outDir);
//          for (const file of htmlFiles) {
//             if (file.endsWith('.html')) {
//                const filePath = path.join(outDir, file);
//                let content = await fs.readFile(filePath, 'utf8');
//                content = content.replace(new RegExp(`/${oldName}/`, 'g'), `/${newName}/`);
//                await fs.writeFile(filePath, content);
//                console.log(`Updated references in ${file}`);
//             }
//          }
//       } catch (err) {
//          console.error('An error occurred:', err);
//       }
//    })();
// }













// const fs = require('fs-extra');
// const path = require('path');
// import fs from 'fs-extra';
// import path from 'path';

// // Use path.resolve to ensure the outDir is correctly set relative to the root
// const outDir = path.resolve(__dirname, '../../out'); // Adjusted path
// const oldName = '_next';
// const newName = 'assets';
// const isVercel = process.env.VERCEL === '1';

// if (!isVercel) {
//    (async function renameNextFolder() {
//       const oldPath = path.join(outDir, oldName);
//       const newPath = path.join(outDir, newName);

//       try {
//          await fs.move(oldPath, newPath);
//          console.log(`Successfully renamed ${oldName} to ${newName}`);

//          // Update references in HTML files
//          const htmlFiles = await fs.readdir(outDir);
//          for (const file of htmlFiles) {
//             if (file.endsWith('.html')) {
//                const filePath = path.join(outDir, file);
//                let content = await fs.readFile(filePath, 'utf8');
//                content = content.replace(new RegExp(`/${oldName}/`, 'g'), `/${newName}/`);
//                await fs.writeFile(filePath, content);
//                console.log(`Updated references in ${file}`);
//             }
//          }
//       } catch (err) {
//          console.error('An error occurred:', err);
//       }
//    })();
// }





import fs from 'fs-extra';
import path from 'path';

// Use path.resolve to ensure the outDir is correctly set relative to the root
const outDir = path.resolve(new URL('.', import.meta.url).pathname, '../../out'); // Adjusted path
const oldName = '_next';
const newName = 'assets';
const isVercel = process.env.VERCEL === '1';

if (!isVercel) {
   (async function renameNextFolder() {
      const oldPath = path.join(outDir, oldName);
      const newPath = path.join(outDir, newName);

      try {
         await fs.move(oldPath, newPath);
         console.log(`Successfully renamed ${oldName} to ${newName}`);

         // Update references in HTML files
         const htmlFiles = await fs.readdir(outDir);
         for (const file of htmlFiles) {
            if (file.endsWith('.html')) {
               const filePath = path.join(outDir, file);
               let content = await fs.readFile(filePath, 'utf8');
               content = content.replace(new RegExp(`/${oldName}/`, 'g'), `/${newName}/`);
               await fs.writeFile(filePath, content);
               console.log(`Updated references in ${file}`);
            }
         }
      } catch (err) {
         console.error('An error occurred:', err);
      }
   })();
}
