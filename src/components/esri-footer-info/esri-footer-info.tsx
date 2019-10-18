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
  tag: "esri-footer-info",
  styleUrl: "esri-footer-info.scss",
  shadow: true
})
export class EsriFooterInfo {
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
  @Prop() property: string = "default";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {

    return (
      <Host>
        Info
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
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private privateMethod(): void {}
}
