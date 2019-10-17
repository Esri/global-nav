import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Method,
  State,
  Listen,
  h
} from "@stencil/core";

@Component({
  tag: "esri-footer",
  styleUrl: "esri-footer.scss",
  shadow: true
})
export class EsriFooter {
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

  @Prop() hideMenus: boolean = false;
  @Prop() label: string = "";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    return (
      <Host>
        <div class="esri-footer">
          {this.brand ? (
            <esri-footer-brand {...this.brand} />
          ) : null}
          {this.menu ? (
            <esri-footer-menus {...this.menu} />
          ) : null}
          {this.social ? (
            <esri-footer-social {...this.social} />
          ) : null}
          {this.language ? (
            <esri-footer-language {...this.language} />
          ) : null}
          {this.info ? (
            <esri-footer-info {...this.info} />
          ) : null}
        </div>
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

  /**
   * If using the header programatically, you can pass in the data structure
   * to the init method, and it will create all sub elements for you.
   */
  @Method() async init(detail): Promise<void> {
    [
      "brand",
      "info",
      "language",
      "menu",
      "social"
    ].forEach(component => {
      console.log(component, detail[component])
      if (detail[component]) {
        this[component] = detail[component];
      }
    });
    return Promise.resolve();
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------
  @State() private brand;
  @State() private info;
  @State() private language;
  @State() private menu;
  @State() private social;
}
