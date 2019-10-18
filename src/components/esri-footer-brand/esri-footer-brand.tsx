import {
  Component,
  Element,
  Prop,
  Host,
  h
} from "@stencil/core";

@Component({
  tag: "esri-footer-brand",
  styleUrl: "esri-footer-brand.scss",
  shadow: true
})
export class EsriFooterBrand {
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
  @Prop() label?: string;
  @Prop() href?: string;
  @Prop() viewBox?: string;
  @Prop() path?: string|string[];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <a
          class="esri-footer-brand-link"
          href={this.href}
          aria-label={this.label}
        >
          <esri-image
            img-width="114"
            img-height="114"
            img-class="esri-footer-brand-image"
            role="presentation"
            viewBox={this.viewBox}
            path={this.path}
          />
        </a>
      </Host>
    );
  }
}
