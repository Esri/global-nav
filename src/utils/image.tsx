import { imgOrSvgDef } from "./interfaces";
import { h } from "@stencil/core";

export function imgOrSvg({ imgDef = "" as imgOrSvgDef, attributes = {} }) {
  if (typeof imgDef === "string") {
    return <img src={imgDef} {...attributes} />;
  } else {
    return (
      <svg viewBox={imgDef.viewBox} {...attributes}>
        {imgDef.path.map(path => (
          <path d={path} />
        ))}
      </svg>
    );
  }
}
