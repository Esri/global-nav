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
import { x16 } from "@esri/calcite-ui-icons/js/x16";
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
  /** Translated string for app launcher label */
  @Prop({ mutable: true }) applicationsText: string = "App Launcher";
  /** Translated string for dismissing help message */
  @Prop({ mutable: true }) confirmText: string = "Got it.";
  /** Translated string for secondary help */
  @Prop({ mutable: true }) dragAppsHereText: string = "Drag apps here that you don't use very often.";
  /** Translated string for sign out */
  @Prop({ mutable: true }) introText: string = "Drag and drop your favorite apps in any order to customize your app launcher.";
  /** Translated string for removed application */
  @Prop({ mutable: true }) removeText: string = "Remove app from app launcher";
  /** Translated string for removed application */
  @Prop({ mutable: true }) removedText: string = "This app is no longer available.";
  /** Translated string for show more */
  @Prop({ mutable: true }) showMoreText: string = "Show more";
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
            aria-label={this.applicationsText}
            aria-expanded={this.open ? "true" : "false"}
            onClick={() => {
              this.open = !this.open
            }}
          >
            <svg
              class="esri-header-apps-image"
              role="presentation"
              style={{"transform": "rotate(360deg)"}}
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
            <nav
              class="esri-header-apps-menu"
              role="menu"
              aria-expanded={this.open ? "true" : "false"}
              aria-hidden={this.open ? "false" : "true"}
            >
              {
                this.showIntro ? (
                  <div class="esri-header-apps__intro">
                    <p class="esri-header-apps-intro">{this.introText}</p>
                    <button
                      class="esri-header-apps-intro-button"
                      onClick={() => this.showIntro = false}
                    >
                      {this.confirmText}
                    </button>
                  </div>
                ) : null
              }
              <ul class="esri-header-apps-grid" role="menu">
                {this.primary.map((app) => this.renderApp({app, secondary: false}))}
              </ul>
              {
                !this.showSecondaryApps ?
                (
                  <button
                    class="esri-header-apps__more"
                    onClick={() => this.showSecondaryApps = true}
                  >
                    {this.showMoreText}
                    <svg viewBox="0 0 16 16" class="esri-header-apps__more__icon">
                      <path d={chevronDown16}></path>
                    </svg>
                  </button>
                ) : (
                  <ul class="esri-header-apps-grid esri-header-apps-grid--secondary" role="menu">
                    {
                      !this.secondary || this.secondary.length === 0 ?
                      (
                        <p class="esri-header-apps-drag-here">{this.dragAppsHereText}</p>
                      ) :
                      this.secondary.map((app) => this.renderApp({app, secondary: true}))
                    }
                  </ul>
                )
              }
            </nav>
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
  @Listen("click") onClick(e: Event) {
    console.log(e);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  @Event({ eventName: "header:apps:reorder" }) reorderApps: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** @internal */
  @State() isLoading: boolean;
  /** @internal */
  @State() showIntro: boolean = true;
  /** @internal */
  @State() showSecondaryApps: boolean;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  // drag and drop:
  // 1. on drag start, note the x/y coords of all app icons
  //     - alt, store array of app icon dom nodes, iterate
  // 2. create a "ghost" (position fixed with mouse cursor)
  // 3. make normal icon transparent
  // 4. on drag update (throttle) check the mouseX/Y
  // 5. if position needs to be updated, move the transparent icon to location
  // 6. on drag end, show the icon again, hide the ghost, and emit the update event
  private renderApp({app, secondary}: {app: Application, secondary?: boolean}) {
    return (
      <li
        class={{
          "app": true,
          "app--hover": !secondary
        }}
        role="menuitem"
        data-id={app.itemId}
      >
        {
          !app.canAccess ? (
            <div class="app__link">
              <div class="app__icon--missing" tabindex="0" title={this.removedText}></div>
              <button
                class="app__indicator app__indicator--removed"
                aria-label={this.removeText}
                onClick={(e) => {
                  e.preventDefault();
                  if (secondary) {
                    this.removeAppFromSecondary(app);
                  } else {
                    this.removeAppFromPrimary(app);
                  }
                }}
              >
                <svg viewBox="0 0 16 16" class="app__indicator__icon">
                  <path d={x16}></path>
                </svg>
              </button>
              <p class="app__label">
                {app.label}
              </p>
            </div>
          ) : (
            <a
              href={app.url}
              target="_blank"
              class="app__link"
            >
              {
                app.isNew ? (
                  <span class="app__indicator app__indicator--new"></span>
                ) : null
              }
              <div class="app__icon">
                <img class="app__image" alt="" src={app.image ? app.image : app.placeHolderIcon} />
                {
                  !app.image ? (
                    <span class="app__abbr" style={{"font-size": this.getFontSize(app.abbr)}}>
                      {app.abbr}
                    </span>
                  ) : null
                }
              </div>
              <p class="app__label">
                {app.label}
              </p>
            </a>
          )
        }
      </li>
    );
  }

  private canvasContext = document.createElement("canvas").getContext("2d");

  /** scale abbreviation to fit within icon */
  private getFontSize (abbr = "") {
		this.canvasContext.font = "16px avenir";
    const width = this.canvasContext.measureText(abbr).width;
    const typeSize = Math.floor(32 / width * 16);
    return `${Math.min(typeSize, 32)}px`;
  }

  private removeAppFromPrimary(app: Application) {
    this.primary = (this.primary || []).filter(a => a.itemId !== app.itemId);
    this.emitReorder();
  }

  private removeAppFromSecondary(app: Application) {
    this.secondary = (this.secondary || []).filter(a => a.itemId !== app.itemId);
    this.emitReorder();
  }

  private emitReorder() {
    this.reorderApps.emit({
      icons: {
        primary: this.primary.map(a => a.itemId),
        secondary: this.secondary.map(a => a.itemId),
        revisions: {}
      }
    });
  }
}
