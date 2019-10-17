import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  State,
  h
} from "@stencil/core";
import { Application } from "../../utils/interfaces";
import { chevronDown16 } from "@esri/calcite-ui-icons/js/chevronDown16";
import { appLauncher24 } from "@esri/calcite-ui-icons/js/appLauncher24";

@Component({
  tag: "esri-header-apps",
  styleUrl: "esri-header-apps.scss",
  shadow: true
})
export class EsriHeaderApps {
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

  /** Open state of the menu */
  @Prop({ mutable: true }) open: boolean;
  /** Set to true while apps are being fetched */
  @Prop() loading: boolean;
  /** Translated string for app launcher label */
  @Prop() applicationsText: string = "App Launcher";
  /** Translated string for dismissing help message */
  @Prop() confirmText: string = "Got it.";
  /** Translated string for secondary help */
  @Prop() dragAppsHereText: string =
    "Drag apps here that you don't use very often.";
  /** Translated string for drang and drop help */
  @Prop() introText: string =
    "Drag and drop your favorite apps in any order to customize your app launcher.";
  /** Translated string for removed application */
  @Prop() removeText: string = "Remove app from app launcher";
  /** Translated string for removed application */
  @Prop() removedText: string = "This app is no longer available.";
  /** Translated string for show more */
  @Prop() showMoreText: string = "Show more";
  /** Disallow dragging and dropping to reorder applications */
  @Prop({ mutable: true }) disableDragAndDrop: boolean;
  /** Show help message upon opening app switcher */
  @Prop({ mutable: true }) displayIntro: boolean = true;
  /** Array of applications to appear in top section of app launcher */
  @Prop({ mutable: true }) primary: Application[] = [];
  /** Array of applications to appear in bottom hidden section */
  @Prop({ mutable: true }) secondary: Application[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div class="esri-header-apps">
          <button
            class="esri-header-apps-control"
            id="esri-header-apps-control"
            disabled={this.loading}
            aria-label={this.applicationsText}
            aria-expanded={this.open ? "true" : "false"}
            onClick={() => {
              this.open = !this.open;
              this.toggleMenu.emit({ open: this.open, el: this.el });
            }}
          >
            <svg
              class="esri-header-apps-image"
              role="presentation"
              style={{ transform: "rotate(360deg)" }}
            >
              <path d={appLauncher24}></path>
            </svg>
          </button>
          <div
            class="esri-header-apps-content"
            id="esri-header-apps-content"
            aria-labelledby="esri-header-apps-control"
            aria-hidden={this.open ? null : "true"}
          >
            <div
              class="esri-header-apps-menu"
              aria-expanded={this.open ? "true" : "false"}
              aria-hidden={this.open ? "false" : "true"}
            >
              {this.showIntro ? (
                <div class="esri-header-apps__intro">
                  <p class="esri-header-apps-intro">{this.introText}</p>
                  <button
                    class="esri-header-apps-intro-button"
                    onClick={() => (this.showIntro = false)}
                  >
                    {this.confirmText}
                  </button>
                </div>
              ) : null}
              <nav class="esri-header-apps-grid">
                {this.primary.map((app, i) => this.renderApp(app, i, false))}
              </nav>
              {!this.showSecondaryApps ? (
                <button
                  class="esri-header-apps__more"
                  onClick={() => (this.showSecondaryApps = true)}
                >
                  {this.showMoreText}
                  <svg viewBox="0 0 16 16" class="esri-header-apps__more__icon">
                    <path d={chevronDown16}></path>
                  </svg>
                </button>
              ) : (
                !this.secondary || this.secondary.length === 0 ? (
                  <div class="esri-header-apps-grid esri-header-apps-grid--secondary">
                    <p class="esri-header-apps-drag-here">
                      {this.dragAppsHereText}
                    </p>
                  </div>
                ) : (
                  <nav class="esri-header-apps-grid esri-header-apps-grid--secondary">
                    {this.secondary.map((app, i) => this.renderApp(app, i, true))}
                  </nav>
                )
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("header:app:remove") onAppRemove(e: CustomEvent) {
    const isApp = app => app.itemId !== e.detail.id;
    this.primary = this.primary.filter(isApp);
    this.secondary = this.secondary.filter(isApp);
    this.emitReorder();
  }

  @Listen("header:app:move") onAppMove(e: CustomEvent) {
    const { id, delta, secondary } = e.detail;
    console.log(id, delta, secondary);
    const fromArray = secondary ? this.secondary : this.primary;
    const app = fromArray.reduce(
      (prev, curr) => prev || (curr.itemId === id && curr),
      null
    );
    const fromIndex = fromArray.indexOf(app);
    let toIndex = fromIndex + delta;
    let toArray = fromArray;
    if (toIndex < 0 && secondary) {
      toArray = this.primary;
      if (delta % 3 === 0) {
        toIndex = Math.max(this.primary.length + toIndex, 0);
      } else {
        toIndex = this.primary.length;
      }
    } else if (!secondary && toIndex >= this.primary.length) {
      toArray = this.secondary;
      if (delta % 3 === 0) {
        toIndex = Math.min(toIndex % 3, this.secondary.length);
      } else {
        toIndex = 0;
      }
    }
    fromArray.splice(fromIndex, 1);
    toArray.splice(toIndex, 0, app);
    console.log(fromArray, toArray)
    console.log(this.primary);
    this.emitReorder();
  }

  @Listen("header:app:edit:start") onEditStart() {
    this.showSecondaryApps = true;
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event({ eventName: "header:apps:reorder" }) reorderApps: EventEmitter;
  @Event({ eventName: "header:menu:toggle" }) toggleMenu: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** @internal */
  @State() showIntro: boolean = true;
  /** @internal */
  @State() showSecondaryApps: boolean;

  private emitReorder() {
    this.reorderApps.emit({
      icons: {
        primary: this.primary.map(a => a.itemId),
        secondary: this.secondary.map(a => a.itemId),
        revisions: {}
      }
    });
  }

  private getDirections(i: number, secondary: boolean): any {
    return {
      top: secondary || i > 2,
      right: !secondary || i < this.secondary.length - 1,
      bottom: !secondary || this.primary[i + 3],
      left: secondary || i > 0
    };
  }

  private renderApp(app: Application, i: number, secondary: boolean) {
    const directions = this.getDirections(i, secondary);
    return (
      <esri-header-app
        removeText={this.removeText}
        removedText={this.removedText}
        {...app}
        {...directions}
        secondary={secondary}
      />
    );
  }
}
