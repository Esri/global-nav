import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  State,
  h
} from "@stencil/core";
import { x16 } from "@esri/calcite-ui-icons/js/x16";

@Component({
  tag: "esri-header-app",
  styleUrl: "esri-header-app.scss",
  shadow: true
})
export class EsriHeaderApp {
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

  /** Unique id of the app item (required) */
  @Prop() itemId: string;
  /** Title of the app */
  @Prop() label: string;
  /** href for the app's link */
  @Prop() url: string;
  /** app icon (>48x48) */
  @Prop() image: string;
  /** background image for abbreviation (>48x48) */
  @Prop() placeHolderIcon: string;
  /** abbreviation for placeholder icon */
  @Prop() abbr: string;
  /** set to false for invalid or removed apps */
  @Prop({reflect: true}) canAccess: boolean;
  /** set to true for recently added apps */
  @Prop() isNew: boolean;
  /** true if app is in the lower app section of the launcher */
  @Prop() secondary: boolean;
  /** true if app can move up */
  @Prop() top: boolean;
  /** true if app can move right */
  @Prop() right: boolean;
  /** true if app can move down */
  @Prop() bottom: boolean;
  /** true if app can move left */
  @Prop() left: boolean;
  /** Translated string for removed application */
  @Prop() removeText: string = "Remove app from app launcher";
  /** Translated string for removed application */
  @Prop() removedText: string =
    "This app is no longer available.";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host
        onKeyDown={this.handleAppKeyDown}
        onKeyUp={e => this.handleAppKeyUp(e)}
      >
        {!this.canAccess ? (
          <div class="app__link">
            <div
              class="app__icon app__icon--missing"
              tabindex="0"
              title={this.removedText}
            >
              {this.renderAppArrows()}
            </div>
            <button
              class="app__indicator app__indicator--removed"
              aria-label={this.removeText}
              onClick={e => {
                e.preventDefault();
                this.removeApp.emit({id: this.itemId});
              }}
            >
              <svg viewBox="0 0 16 16" class="app__indicator__icon">
                <path d={x16}></path>
              </svg>
            </button>
            <p class="app__label">{this.label}</p>
          </div>
        ) : (
          <a href={this.url} target="_blank" class="app__link">
            {this.isNew ? (
              <span class="app__indicator app__indicator--new"></span>
            ) : null}
            <div class="app__icon">
              {this.renderAppArrows()}
              <img
                class="app__image"
                alt=""
                src={this.image ? this.image : this.placeHolderIcon}
              />
              {!this.image ? (
                <span
                  class="app__abbr"
                  style={{ "font-size": this.getFontSize(this.abbr) }}
                >
                  {this.abbr}
                </span>
              ) : null}
            </div>
            <p class="app__label">{this.label}</p>
          </a>
        )}
      </Host>
    );
  }

  private renderAppArrows() {
    return this.isEditing ? (
      <span>
        { this.top ? <span class="app__arrow app__arrow--top" /> : null }
        { this.right ? <span class="app__arrow app__arrow--right" /> : null }
        { this.bottom ? <span class="app__arrow app__arrow--bottom" /> : null }
        { this.left ? <span class="app__arrow app__arrow--left" /> : null }
      </span>
    ) : null;
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event({ eventName: "header:app:remove" }) removeApp: EventEmitter;
  @Event({ eventName: "header:app:move" }) moveApp: EventEmitter;
  @Event({ eventName: "header:app:edit:start" }) startEdit: EventEmitter;


  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** @internal - set to true when editing location via keyboard */
  @State() isEditing: boolean;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private handleAppKeyDown(e: KeyboardEvent) {
    if (e.key === " " || e.key.indexOf("Arrow") > -1) {
      e.preventDefault();
    }
  }

  private handleAppKeyUp(e: KeyboardEvent) {
    if (this.isEditing) {
      const {top, right, bottom, left, secondary} = this;
      if (e.key === "ArrowUp" && top) {
        this.moveApp.emit({id: this.itemId, delta: -3, secondary});
      }
      if (e.key === "ArrowDown" && bottom) {
        this.moveApp.emit({id: this.itemId, delta: 3, secondary});
      }
      if (e.key === "ArrowRight" && right) {
        this.moveApp.emit({id: this.itemId, delta: 1, secondary});
      }
      if (e.key === "ArrowLeft" && left) {
        this.moveApp.emit({id: this.itemId, delta: -1, secondary});
      }
      this.isEditing = false;
    }
    if (e.key === " " && !this.isEditing) {
      this.isEditing = true;
      this.startEdit.emit();
    }
  }

  private canvasContext = document.createElement("canvas").getContext("2d");

  private getFontSize(abbr = "") {
    this.canvasContext.font = "16px avenir";
    const width = this.canvasContext.measureText(abbr).width;
    const typeSize = Math.floor((32 / width) * 16);
    return `${Math.min(typeSize, 32)}px`;
  }
}
