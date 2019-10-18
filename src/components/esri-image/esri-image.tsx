import {
  Component,
  Element,
  Prop,
  Host,
  State,
  h
} from "@stencil/core";
import { ImagePath } from "../../utils/interfaces";

@Component({
  tag: "esri-image"
})
export class EsriImage {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------
  @Prop() path?: ImagePath;
  @Prop() imgClass?: string;
  @Prop() wrapperClass?: string;
  @Prop() inlineImg?: boolean = true;
  @Prop() imgWidth?: string;
  @Prop() imgHeight?: string;
  @Prop() imgAlt?: string;
  @Prop() imgFill?: string = "currentColor";
  @Prop() viewBox?: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad() {
    // for svg files, go fetch them and return the contents
    if (typeof this.path === "string" && this.path.indexOf(".svg") > -1 && !this.loaded && this.inlineImg) {
      this.fetchSVG(this.path, (svgContents) => {
        const temp = document.createElement("span");
        temp.innerHTML = svgContents;
        const svg = temp.firstElementChild as SVGElement;
        svg.setAttribute("width", this.imgWidth || svg.getAttribute("width"));
        svg.setAttribute("height", this.imgHeight || svg.getAttribute("height"));
        svg.setAttribute("class", this.imgClass || svg.getAttribute("class"));
        svg.setAttribute("fill", this.imgFill || svg.getAttribute("fill"));
        this.svgContents = temp.innerHTML;
        this.loaded = true;
      }, () => {
        this.failed = true;
      })
    }
  }

  render() {
    const isString = typeof this.path === "string";
    const isInlineSVG = !isString && this.path.length > 0;
    return (
      this.svgContents ?
        // if we've fetched the svg, set the contents to the innerHTML
        <Host class={this.wrapperClass} innerHTML={this.svgContents} /> :
        <Host class={this.wrapperClass}>
          {
            // if we have path data, construct an svg
            isInlineSVG ?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={this.imgWidth}
                height={this.imgHeight}
                class={this.imgClass}
                role="presentation"
                style={{ transform: "rotate(360deg)" }}
                viewBox={this.viewBox}
                fill={this.imgFill}
              >
                {(this.path as string[]).map(path => <path d={path}></path>)}
              </svg>
            : null
          }
          {
            // if we have a binary image, use img tag
            isString && this.path.indexOf(".svg") < 0 || this.failed || !this.inlineImg?
              <img
                style={{width: `${this.imgWidth}px`, height: `${this.imgHeight}px` }}
                class={this.imgClass}
                alt={this.imgAlt}
                src={this.path as string}
              /> : null
          }
        </Host>
    )
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() private loaded: boolean;
  @State() private svgContents: string;
  @State() private failed: boolean;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private fetchSVG(url, callback, onError = () => {}) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
      if (4 === xhr.readyState) {
        if (200 === xhr.status) {
          callback(xhr.responseText);
        } else {
          onError();
        }
      }
    });

    xhr.open("GET", url);
    xhr.send();

    return xhr;
  }
}
