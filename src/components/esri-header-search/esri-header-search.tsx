import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  h,
  State
} from "@stencil/core";
import { search24 } from "@esri/calcite-ui-icons/js/search24";
// import { search32 } from "@esri/calcite-ui-icons/js/search32";

@Component({
  tag: "esri-header-search",
  styleUrl: "esri-header-search.scss",
  shadow: true
})
export class EsriHeaderSearch {
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

  /** Open state of the search UI */
  @Prop() open: boolean;
  /** Form action url */
  @Prop() action: string = "";
  /** Translated aria label for search icon */
  @Prop() searchText: string = "Search";
  /** Translated string for aria label of form */
  @Prop() formText: string = "Esri";
  /** Translated cancel text */
  @Prop() cancelText: string = "Cancel";
  /** Translated input label text */
  @Prop() placeholderText: string = "Search";
  /** Translated submit text */
  @Prop() submitText: string = "";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  constructor() {
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  render() {
    return (
      <Host>
        <button
          class="esri-header-search-control"
          id="esri-header-search-control"
          aria-label={this.searchText}
          aria-controls="esri-header-search-content"
          aria-expanded={this.open ? "true" : "false"}
          aria-haspopup="true"
          onClick={this.handleMenuToggle}
        >
          <svg
            class="esri-header-search-image"
            role="presentation"
            style={{ transform: "rotate(360deg)" }}
            id="esri-header-search-image"
          >
            <path d={search24}></path>
          </svg>
        </button>
        <div
          class="esri-header-search-content"
          id="esri-header-search-content"
          aria-expanded={this.open ? "true" : "false"}
          aria-labelledby="esri-header-search-control"
          aria-hidden={this.open ? "false" : "true"}
        >
          <form
            class="esri-header-search-content-form"
            action={this.action}
            role="search"
            aria-label={this.formText}
          >
            <label>
              <span
                class="esri-header-search-content-label"
                data-filled={this.value.length > 0}
              >
                {this.placeholderText}
              </span>
              <input
                ref={(el) => this.searchInput = el}
                class="esri-header-search-content-input"
                type="search"
                name="q"
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                value={this.value}
                onInput={(event) => this.handleChange(event)}
              />
              <div
                class="esri-header-search-content-measure"
                style={{width: `${this.valueWidth}px`}}
                aria-hidden="true"
              ></div>
            </label>
            <button
              class="esri-header-search-content-submit"
              type="submit"
              aria-label={this.submitText}
            >
              <svg class="esri-header-search-submit-icon" viewBox="0 0 24 24">
                <path d={search24}></path>
              </svg>
            </button>
            <button class="esri-header-search-content-cancel" type="reset">
              <span>{this.cancelText}</span>
            </button>
          </form>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  @Event({ eventName: "header:menu:toggle" }) toggleContent: EventEmitter;

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
  @State() private value: string = "";
  @State() private valueWidth: number = 0;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private searchInput: HTMLInputElement;
  private canvasContext = document.createElement("canvas").getContext("2d");

  private handleMenuToggle() {
    this.value = "";
    this.valueWidth = 0;
    this.open = !this.open;
    this.toggleContent.emit({open: this.open, el: this.el, color: "white"});
    if (this.open) {
      setTimeout(() => {
        this.searchInput.focus();
      }, 300);
    }
  }

  private handleChange(event) {
    this.value = event.target.value;
    const fontSize = window.getComputedStyle(event.target).getPropertyValue("font-size");
    this.canvasContext.font = `${fontSize} 'Avenir Next'`;
    this.valueWidth = Math.ceil(this.canvasContext.measureText(this.value).width);
  }
}
