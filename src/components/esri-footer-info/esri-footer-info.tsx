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
import { FooterLink } from "../../utils/interfaces";

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
  @Prop() label: string;
  @Prop() menu: FooterLink[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {

    return (
      <Host aria-label={this.label}>
        <ul class="esri-footer-info-list">
          {this.menu.map((link, i) => (
            <li
              class="esri-footer-info-item"
              role="presentation"
              id={`esri-footer-info-link--${i}`}
            >
              <a
                class="esri-footer-info-link"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
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
