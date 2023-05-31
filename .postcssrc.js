import cssnano from "cssnano";
import postcssenv from "postcss-preset-env";
import postcssduplicatecombine from "postcss-combine-duplicated-selectors";

const postCSSConfig = {
  plugins: [
    postcssenv({
      stage: 1,
      browsers: ["last 2 versions", "not dead", "> 0.5%", "not IE 11"],
    }),
    cssnano({
      convertValues: true,
      discardComments: true,
      discardDuplicates: true,
      discardEmpty: true,
      discardUnused: true,
      minifyFontValue: true,
      minifyGradients: true,
      minifyParams: true,
      minifySelectors: true,
      reduceIdent: true,
      reduceInitial: true,
      reduceTransforms: true,
      normalizeWhitespace: true,
      colormin: true,
      uniqueSelectors: true,
      zindex: true,
    }),
    postcssduplicatecombine({
      removeDuplicatedProperties: true,
      removeDuplicatedValues: true,
    }),
  ],
};

export default postCSSConfig;


