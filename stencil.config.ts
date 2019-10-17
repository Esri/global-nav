import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "esri",
  bundles: [
    {
      components: [
        "esri-header",
        "esri-header-account",
        "esri-header-brand",
        "esri-header-inline-search",
        "esri-header-inline-title",
        "esri-header-menus",
        "esri-header-notifications",
        "esri-header-search"
      ]
    },
    {
      components: [
        "esri-header-apps",
        "esri-header-app",
      ]
    },
    {
      components: [
        "esri-footer",
        "esri-footer-brand",
        "esri-footer-breadcrumbs",
        "esri-footer-language",
        "esri-footer-social"
      ]
    },
  ],
  outputTargets: [
    { type: "dist" },
    { type: "docs-readme" },
    { type: "www", serviceWorker: null }
  ],
  globalStyle: "src/components/_global.scss",
  plugins: [
    sass({})
  ]
};
