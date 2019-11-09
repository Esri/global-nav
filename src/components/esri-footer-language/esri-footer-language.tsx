import {
  Component,
  Element,
  Prop,
  Host,
  h,
  State
} from "@stencil/core";
import { LanguageOption } from "../../utils/interfaces";
import { x24 } from "@esri/calcite-ui-icons/js/x24";
@Component({
  tag: "esri-footer-language",
  styleUrl: "esri-footer-language.scss",
  shadow: true
})
export class EsriFooterLanguage {
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
  @Prop() buttonLabel: string;
  @Prop() closeLabel: string;
  @Prop() optionsLabel: string;
  @Prop() options: LanguageOption[] = [];
  @Prop() greetingLabel: string;
  @Prop() messageLabel: string;
  @Prop() submitLabel: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    return (
      <Host aria-label={this.label}>
        <div class="esri-footer-language">
          <button
            class="esri-footer-language-control"
            aria-describedby="esri-footer-language"
          >
            {this.buttonLabel}
          </button>
        </div>

        <div
          class="esri-footer-language-dialog-barrier"
          aria-expanded={this.modalOpen}
        >
          <form
            class="esri-footer-language-dialog"
            aria-labelledby="esri-footer-language-dialog-message"
            aria-describedby="dialog-description"
          >
            <p
              class="esri-footer-language-dialog-message"
              id="esri-footer-language-dialog-message"
            >
              {this.messageLabel}
            </p>
            <select
              class="esri-footer-language-dialog-choice"
              aria-label={this.optionsLabel}
            >
              {this.options.map(option => (
                <option value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              class="esri-footer-language-dialog-submit"
              type="submit"
            >
              {this.submitLabel}
            </button>
            <button
              class="esri-footer-language-dialog-close"
              id="dialog-description"
              aria-label="Close Navigation"
            >
              <svg
                class="esri-footer-language-dialog-close-image"
                role="presentation"
                style={{transform: "rotate(360deg)"}}
              >
                <path d={x24}></path>
              </svg>
            </button>
          </form>
          <button
            class="esri-footer-language-dialog-cancel-canvas"
            type="button"
            tabindex="-1"
          />
        </div>
      </Host>
    );
  }

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
  @State() modalOpen: false;
}
