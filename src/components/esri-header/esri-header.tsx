import {
  Component,
  Element,
  Prop,
  Host,
  // Event,
  // EventEmitter,
  Method,
  State,
  Listen,
  h
} from "@stencil/core";
@Component({
  tag: "esri-header",
  styleUrl: "esri-header.scss",
  shadow: true
})
export class EsriHeader {
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

  /** App mode will show a color bar at the top and float menu items right */
  @Prop() theme: "web" | "app" = "web";

  /** Set to `true` to show hamburger menu regardless of screen size  */
  @Prop() collapseMenus: boolean;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillUpdate(): void {}

  render() {
    return (
      <Host>
        <div class={`esri-header -${this.theme}`}>
          {this.brand ? (
            <esri-header-brand {...this.brand} />
          ) : null}
          {this.menus ? (
            <esri-header-menus
              ref={el => this.menusElement = el}
              detail={this.menus}
            />
          ) : null}
          {this.search ? (
            <esri-header-search
              ref={el => this.searchElement = el}
              searchText={this.search.label}
              cancelText={this.search.dialog.cancelLabel}
              formText={this.search.dialog.label}
              placeholderText={this.search.dialog.queryLabel}
              submitText={this.search.dialog.submitLabel}
              action={this.search.dialog.action}
            />
          ) : null}
          {this.search &&
          (this.cart || this.notifications || this.apps || this.account) ? (
            <span class="esri-header-divider" />
          ) : null}
          {this.cart ? (
            <esri-header-cart
              items={this.cart.items}
              url={this.cart.url}
            />
          ) : null}
          {this.notifications ? (
            <esri-header-notifications
              ref={el => this.notificationsElement = el}
              messages={this.notifications.messages}
              dismissAllLabel={this.notifications.dismissAllLabel}
              dismissLabel={this.notifications.dismissLabel}
              emptyMessage={this.notifications.emptyMessage}
            />
          ) : null}
          {this.apps ? (
            <esri-header-apps
              ref={el => this.appsElement = el}
              loading={this.apps.isLoading}
              applicationsText={this.apps.label}
              confirmText={this.apps.text.confirm}
              dragAppsHereText={this.apps.text.dragAppsHere}
              introText={this.apps.text.intro}
              removedText={this.apps.text.removed}
              showMoreText={this.apps.text.showMore}
              disableDragAndDrop={this.apps.disableDragAndDrop}
              displayIntro={this.apps.displayIntro}
              primary={this.apps.primary}
              secondary={this.apps.secondary}
            />
          ) : null}
          {this.account ? (
            <esri-header-account
              ref={el => this.accountElement = el}
              profileText={this.account.label}
              signInText={this.account.controls.signin}
              switchText={this.account.controls.switch}
              signOutText={this.account.controls.signout}
              userName={this.account.user.name}
              userId={this.account.user.id}
              userGroup={this.account.user.group}
              userImage={this.account.user.image}
              menus={this.account.menus}
            />
          ) : null}
        </div>
        <button
          class={{
            "esri-header-canvas": true,
            "esri-header-canvas--white": this.scrimColor === "white"
          }}
          tabindex="-1"
          data-open={!!this.openMenu}
        />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("header:menu:toggle") handleToggleMenu(event: CustomEvent) {
    const {open, el, color} = event.detail;
    this.scrimColor = color;
    [
      this.menusElement,
      this.searchElement,
      this.notificationsElement,
      this.appsElement,
      this.accountElement
    ]
    .filter(element => element)
    .forEach(element => {
      if (element === el) {
        this.openMenu = open ? element : null;
      } else {
        element.open = false;
      }
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * If using the header programatically, you can pass in the data structure
   * to the init method, and it will create all sub elements for you.
   */
  @Method() async init(detail): Promise<void> {
    [
      "theme",
      "brand",
      "cart",
      "menus",
      "search",
      "notifications",
      "apps",
      "account"
    ].forEach(component => {
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
  @State() private cart;
  @State() private menus;
  @State() private search;
  @State() private notifications;
  @State() private apps;
  @State() private account;

  private menusElement: HTMLEsriHeaderMenusElement;
  private searchElement: HTMLEsriHeaderSearchElement;
  private notificationsElement: HTMLEsriHeaderNotificationsElement;
  private appsElement: HTMLEsriHeaderAppsElement;
  private accountElement: HTMLEsriHeaderAccountElement;

  /** Track the open menu in state  */
  @State() openMenu: HTMLElement|boolean;

  /** Track the open menu in state  */
  @State() scrimColor: "white"|undefined;

  /** Track viewport width for responsive changes */
  @State() screenSize: number;
}
