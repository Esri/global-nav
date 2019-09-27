import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
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
        <div class="esri-header">
          {this.brand ? (
            <esri-header-brand {...this.brand}></esri-header-brand>
          ) : (
            ""
          )}
          {this.menus ? (
            <esri-header-menus detail={this.menus}></esri-header-menus>
          ) : (
            ""
          )}
          {this.search ? (
            <esri-header-search detail={this.search}></esri-header-search>
          ) : (
            ""
          )}
          {this.cart ? (
            <esri-header-cart
              items={this.cart.items}
              url={this.cart.url}
            ></esri-header-cart>
          ) : (
            ""
          )}
          {this.notifications ? (
            <esri-header-notifications
              messages={this.notifications.messages}
              dismissAllLabel={this.notifications.dismissAllLabel}
              dismissLabel={this.notifications.dismissLabel}
              emptyMessage={this.notifications.emptyMessage}
            ></esri-header-notifications>
          ) : (
            ""
          )}
          {this.apps ? (
            <esri-header-apps detail={this.apps}></esri-header-apps>
          ) : (
            ""
          )}
          {this.account ? (
            <esri-header-account
              profileText={this.account.label}
              signInText={this.account.controls.signin}
              switchText={this.account.controls.switch}
              signOutText={this.account.controls.signout}
              userName={this.account.user.name}
              userId={this.account.user.id}
              userGroup={this.account.user.group}
              userImage={this.account.user.image}
              menus={this.account.menus}
              ></esri-header-account>
          ) : (
            ""
          )}
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
   * If using the header programatically, you can pass in the data structure
   * to the init method, and it will create all sub elements for you.
   */
  @Method() async init(detail): Promise<void> {
    if (detail.theme) {
      this.theme = detail.theme;
    }
    if (detail.brand) {
      this.brand = detail.brand;
    }
    if (detail.cart) {
      this.cart = detail.cart;
    }
    if (detail.menus) {
      this.menus = detail.menus;
    }
    if (detail.search) {
      this.search = detail.search;
    }
    if (detail.notifications) {
      this.notifications = detail.notifications;
    }
    if (detail.apps) {
      this.apps = detail.apps;
    }
    if (detail.account) {
      this.account = detail.account;
    }
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

  /** Track the open menu in state  */
  @State() openMenu: HTMLElement;

  /** Track viewport width for responsive changes */
  @State() screenSize: number;
}
