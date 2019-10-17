import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Method,
  Listen,
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

  /**
   * Be sure to add a jsdoc comment describing your propery for the generated readme file.
   * If your property should be hidden from documentation, you can use the `@internal` tag
   */
  @Prop() label?: string;
  @Prop() href?: string;
  @Prop() viewBox?: string;
  @Prop() path?: string;
  @Prop() imgDef?: string[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    return (
      <Host>
        <a
          class="esri-footer-brand-link"
          href={this.href}
          aria-label={this.label}
        >
          {this.path && this.imgDef.length === 0 ?
            <esri-image
              img-width="114"
              img-height="114"
              img-class="esri-footer-brand-image"
              role="presentation"
              viewBox={this.viewBox}
              path={this.path}
            />
            :
            <esri-image
              img-width="114"
              img-height="114"
              img-class="esri-footer-brand-image"
              role="presentation"
              viewBox={this.viewBox}
              imgDef={this.imgDef}
            />
          }
        </a>
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

  /**
   * Add a jsdoc comment describing your method and it's parameters (use `@param`).
   */
  @Method() async doThing(): Promise<void> {
    return Promise.resolve(this.privateMethod());
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private privateMethod(): void {}
}
