import react from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { resolveToEsbuildTarget } from "esbuild-plugin-browserslist";
import { readPackage } from "read-pkg";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

const pkg = await readPackage();

const externalPkgs = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.optionalDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const external = (id: string) => {
  const match = (dependency: string) => new RegExp(`^${dependency}`).test(id);
  const isExternal = externalPkgs.some(match);
  const isBundled = pkg.bundleDependencies?.some(match); // alias of bundledDependencies package.json field array

  return isExternal && !isBundled;
};

const targets = resolveToEsbuildTarget(
  browserslist("defaults", {
    ignoreUnknownVersions: false,
  }),
  {
    printUnknownTargets: false,
  },
);

export default defineConfig({
  build: {
    outDir: "dist",
    sourcemap: true,
    target: [...targets, "node20"],
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
      output: {
        comments: false,
      },
    },

    lib: {
      name: pkg.name,
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format, filename) => {
        if (format === "es") {
          return `${filename}.js`;
        }

        return `${filename}.${format}`;
      },
    },
    rollupOptions: {
      external,
      output: {
        preserveModules: true,
      },
    },
  },
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    visualizer({
      filename: "stats.html",
      open: true,
    }),
  ],
});
