//Vite Configuration
import { defineConfig as viteConfig } from "vite";

//Vite HTML minification
import { createHtmlPlugin as viteHTMLPlugins } from "vite-plugin-html";

//Vite Image optimization and convertation
import { imagetools as viteImageTools } from "vite-imagetools";
import { ViteImageOptimizer as viteImageOptimizer } from "vite-plugin-image-optimizer";
import viteImagePresets, { widthPreset } from "vite-plugin-image-presets";

//CSS Optimization
import { optimizeCssModules as viteOptimizeCSSModule } from "vite-plugin-optimize-css-modules";

//Native Node.js modules
import path from "node:path";

export default viteConfig(({ mode }) => {
  const plugins =
    mode === "production"
      ? [
          viteHTMLPlugins({ minify: true }),
          viteOptimizeCSSModule(),
          viteImageTools(),
          viteImageOptimizer({
            test: /\.(webp)$/i,
            webp: {
              quality: 1,
              alphaQuality: 1,
              effort: 6,
              smartSubsample: true,
            },
          }),
          viteImagePresets({
            thumbnail: widthPreset({
              class: "img thumb",
              loading: "lazy",
              widths: [30, 80],
              formats: {
                webp: { quality: 50 },
              },
            }),
          }),
        ]
      : [];

  const isDev = mode === "development" ? true : false;

  return {
    appType: "spa",
    root: path.resolve(__dirname, "src"),
    server: {
      open: true,
      host: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      minify: isDev ? false : "terser",
      emptyOutDir: true,
      sourcemap: isDev,
      manifest: isDev,
      terserOptions: {
        ecma: 2020,
        compress: {
          arguments: true,
          drop_console: true,
          drop_debugger: true,
          expression: true,
        },
      },
      outDir: path.resolve(__dirname, "build"),
      reportCompressedSize: false,
      chunkSizeWarningLimit: 250,
      rollupOptions: {
        input: path.resolve(__dirname, "src/index.html"),
        output: {
          manualChunks: {
            "react-vendor": [
              "react",
              "react-dom/client",
              "react-dom",
              "react-router-dom",
            ],
            "redux-vendor": ["@reduxjs/toolkit", "react-redux", "redux"],
          },
          assetFileNames: (assetInfo: { name: string }) => {
            let extType: string = assetInfo.name!.split(".").at(1);

            if (/webp/i.test(extType)) {
              extType = "img";
            }

            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
    },
    css: {
      modules: {
        scopeBehaviour: "local",
        localsConvention: "dashes",
      },
    },
    plugins,
  };
});
