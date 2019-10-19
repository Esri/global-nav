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
import { FooterMenu } from "../../utils/interfaces";

@Component({
  tag: "esri-footer-menus",
  styleUrl: "esri-footer-menus.scss",
  shadow: true
})
export class EsriFooterMenus {
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
  @Prop() label: string = "";
  @Prop() menu: FooterMenu[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    return (
      <Host>
        <div aria-label={this.label}>
          <ul class="esri-footer-menu-list" role="presentation">
            {this.menu.map((section, i) => (
              <li
                class="esri-footer-menu-item"
                id={`esri-footer-menu-link--${i}`}
              >
                <span
                  class="esri-footer-menu-link"
                  role="heading"
                >
                  {section.label}
                </span>
                <div
                  class="esri-footer-menu--sub"
                  id="esri-footer-menu--sub--0"
                  aria-labelledby={`esri-footer-menu-link--${i}`}
                >
                  <ul
                    class="esri-footer-menu-list--sub"
                    role="presentation"
                  >
                    {section.menu.map((link) => (
                      <li class="esri-footer-menu-item--sub">
                        <a class="esri-footer-menu-link--sub" href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
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
