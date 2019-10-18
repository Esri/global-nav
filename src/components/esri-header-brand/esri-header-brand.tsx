import {
  Component,
  Element,
  Prop,
  Host,
  h
} from "@stencil/core";
import { EsriImageData, InlineSVG } from "../../utils/interfaces";

@Component({
  tag: "esri-header-brand",
  styleUrl: "esri-header-brand.scss",
  shadow: true
})
export class EsriHeaderBrand {
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
  @Prop() href?: string;
  @Prop() distributorImage?: EsriImageData;
  @Prop() distributorImageWidth?: string;
  @Prop() distributorImageHeight?: string;
  @Prop() image?: EsriImageData;
  @Prop() width?: string;
  @Prop() height?: string;
  @Prop() brandText?: string;
  @Prop() label?: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const separator = <span class="distributor-image-border"></span>
    return (
      <Host>
        { this.href ?
          <a class="esri-header-brand esri-header-brand--link" href={this.href} aria-label={this.label}>
            {this.formatImage()}
            {this.formatText()}
            {this.distributorImage ? separator : ""}
            {this.formatDistributorImage()}
          </a> :
          <span class="esri-header-brand" aria-label={this.label}>
            {this.formatImage()}
            {this.formatText()}
            {this.distributorImage ? separator : ""}
            {this.formatDistributorImage()}
          </span>
        }
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private formatDistributorImage() {
    const {path, viewBox} = this.getImageObj(this.distributorImage);
    return this.distributorImage ? (
      <esri-image
        imgClass="esri-header-brand-image"
        wrapperClass="distributor-image"
        imgWidth={this.distributorImageWidth}
        imgHeight={this.distributorImageHeight}
        img-alt=""
        path={path}
        viewBox={viewBox}
      />
    ) : "";
  }

  private formatImage() {
    const {path, viewBox} = this.getImageObj(this.image);
    return this.image ? (
      <esri-image
        img-class="esri-header-brand-image"
        wrapper-class="brand-image"
        img-width={this.width}
        img-height={this.height}
        img-alt=""
        path={path}
        viewBox={viewBox}
      />
    ) : "";
  }

  private formatText() {
    return this.brandText ? (
      <span
        class={{
          "esri-header-brand-text": true,
          "-has-image": !!this.image
        }}>{this.brandText}</span>
    ) : "";
  }

  private getImageObj(img: EsriImageData):InlineSVG {
    const imageData = {
      path: img,
      viewBox: null
    };
    if (typeof img !== "string" && !Array.isArray(img)) {
      imageData.path = img.path;
      imageData.viewBox = img.viewBox;
    }
    return imageData as InlineSVG;
  }
}
