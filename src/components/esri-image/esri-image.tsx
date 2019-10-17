import {
  Component,
  Element,
  Prop,
  Host,
  State,
  h
} from "@stencil/core";

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
  @Prop() path?: string;
  @Prop() imgDef?: string[];
  @Prop() imgClass?: string;
  @Prop() wrapperClass?: string;
  @Prop() inlineImg?: boolean;
  @Prop() imgWidth?: string | number;
  @Prop() imgHeight?: string | number;
  @Prop() viewBox?: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad() {
    if (this.path && !this.hasLoadedSVG) {
      this.fetchSVG(this.path, (svgContents) => {
        this.container.innerHTML = svgContents;
        this.hasLoadedSVG = true;
      })
    }
  }

  render() {
    return (
      <Host class={this.wrapperClass}>
        {this.imgDef ?
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.imgWidth}
            height={this.imgHeight}
            class={this.imgClass}
            role="presentation"
            style={{ transform: "rotate(360deg)" }}
            viewBox={this.viewBox}
            fill="currentColor"
          >
            {this.imgDef.map(path => <path d={path}></path>)}
          </svg>
        : <span
            ref={el => this.container = el }
            class={this.imgClass}
          />
        }
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() private hasLoadedSVG: boolean;
  container: HTMLSpanElement;

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
