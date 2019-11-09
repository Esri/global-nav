import {
  Component,
  Element,
  Prop,
  Host,
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
  @Prop() label: string;
  @Prop() menu: FooterLink[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
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
}
