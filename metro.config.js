/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const { getDefaultConfig } = require("metro-config");

 module.exports = (async () => {
   const {
     resolver: { sourceExts, assetExts }
   } = await getDefaultConfig();
   return {
     transformer: {
       babelTransformerPath: require.resolve("react-native-svg-transformer")
     },
     resolver: {
       assetExts: assetExts.filter(ext => ext !== "svg"),
       sourceExts: [...sourceExts, "svg",'jsx', 'js', 'ts', 'tsx']
     }
   };
 })();


/* const { getDefaultConfig } = require("metro-config");
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
}; */

/* 
module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-sass-transformer")
    },
    resolver: {
      sourceExts: [...sourceExts, "scss", "sass"]
    }
  };
})(); */
