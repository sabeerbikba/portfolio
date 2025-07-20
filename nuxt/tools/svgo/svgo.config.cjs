module.exports = {
   plugins: [
      {
         name: 'preset-default',
         // params: {
         //    overrides: {
         //       cleanupIDs: true,
         //    },
         // },
      },
      // 'cleanupIDs',
      'removeTitle',
      'removeDesc',
      'removeDimensions',
      'removeStyleElement',
      'removeScripts',
      'removeComments',
      'removeMetadata',
      'removeUselessDefs',
      'removeEditorsNSData',
      'removeEmptyContainers',
      'removeEmptyAttrs',
      'removeHiddenElems',
      'removeXMLNS',
      {
         name: 'removeAttrs',
         params: {
            attrs: ['data.*', 'aria.*', 'class', 'id'],
         },
      },
   ],
};
