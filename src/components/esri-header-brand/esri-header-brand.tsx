import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h
} from "@stencil/core";
import { imgOrSvgDef } from "../../utils/interfaces";
import { imgOrSvg } from "../../utils/image";

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
  @Prop() detail?: any = {};
  @Prop() href?: string;
  @Prop() distributorImage?: imgOrSvgDef;
  @Prop() distributorImageWidth?: number;
  @Prop() distributorImageHeight?: number;
  @Prop() image?: imgOrSvgDef;
  @Prop() width?: number;
  @Prop() height?: number;
  @Prop() brandText?: string;
  @Prop() label?: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

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
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("click") onClick(e: Event) {
    console.log(e);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() open: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------


  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private formatDistributorImage() {
    return this.distributorImage ? (
      <span class="distributor-image">
        {
          imgOrSvg({
            imgDef: this.distributorImage,
            attributes: {
              alt: '',
              class: 'esri-header-brand-image',
              width: this.distributorImageWidth,
              height: this.distributorImageHeight,
              fill: 'currentColor'
            }
          })
        }
      </span>
    ) : "";
  }

  private formatImage() {
    return this.image ? (
      <span class="brand-image">
        {
          imgOrSvg({
            imgDef: this.image,
            attributes: {
              alt: '',
              class: 'esri-header-brand-image',
              width: this.width,
              height: this.height,
              fill: 'currentColor'
            }
          })
        }
      </span>
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
}
