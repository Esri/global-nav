import {
  Component,
  Element,
  Prop,
  Host,
  h
} from "@stencil/core";
import { SocialLink } from "../../utils/interfaces";

@Component({
  tag: "esri-footer-social",
  styleUrl: "esri-footer-social.scss",
  shadow: true
})
export class EsriFooterSocial {
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
  @Prop() label: string = "Social Media";
  @Prop() menu: SocialLink[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <nav
          class="esri-footer-social-nav"
          aria-label={this.label}
        >
          {this.menu.map(link => (
            <a
              class={`esri-footer-social-link esri-footer-social-link--${link.label.toLowerCase()}`}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noopener"
            >
              <esri-image
                img-width="32"
                img-height="32"
                img-class="esri-footer-social-image"
                role="presentation"
                viewBox={link.image.viewBox}
                path={link.image.path}
              />
            </a>
          ))}
        </nav>
      </Host>
    );
  }
}
