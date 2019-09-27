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

export type UserMenuLink = {
  label: string;
  href: string;
  newContext?: boolean;
}
@Component({
  tag: "esri-header-account",
  styleUrl: "esri-header-account.scss",
  shadow: true
})
export class EsriHeaderAccount {
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
  /** Translated string for profile */
  @Prop({ mutable: true }) profileText: string = "Account profile";
  /** Translated string for sign in */
  @Prop({ mutable: true }) signInText: string = "Sign in";
  /** Translated string for sign out */
  @Prop({ mutable: true }) signOutText: string = "Sign out";
  /** Translated string for switch account */
  @Prop({ mutable: true }) switchText: string = "Switch account";
  /** Unique user id */
  @Prop({ mutable: true }) userId: string;
  /** Human-readable name of the user */
  @Prop({ mutable: true }) userName: string;
  /** Organization name */
  @Prop({ mutable: true }) userGroup: string;
  /** Absolute path to profile photo */
  @Prop({ mutable: true }) userImage: string;
  /** Array of links to appear in user menu */
  @Prop({ mutable: true }) menus: UserMenuLink[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillUpdate(): void {}

  render() {
    return (
      <Host>
        {
          this.userId ?
          <div class="esri-header-account-wrap">
            <button
              class="esri-header-account-control esri-header-account-control--signedin"
              aria-controls="esri-header-account-menu"
              aria-expanded={this.open ? "true" : "false"}
              aria-haspopup="true"
              id="esri-header-account-control"
              onClick={() => {
                this.open = !this.open
              }}
            >
              <img class="esri-header-account-image" src={this.userImage} alt=""/>
              <span class="esri-header-account-control-info">
                <span class="esri-header-account-name">{this.userName}</span>
                <span class="esri-header-account-id">{this.userId}</span>
              </span>
            </button>
            <div
              class="esri-header-account-menu"
              id="esri-header-account-menu"
              aria-expanded={this.open ? "true" : "false"}
              aria-hidden={this.open ? "false" : "true"}
            >
              <button class="esri-header-account-content-toggle">{this.profileText}</button>
              <div class="esri-header-account-content-info-wrap">
                <div class="esri-header-account-content-info">
                  <img class="esri-header-account-content-image" src={this.userImage} alt=""/>
                  <span class="esri-header-account-content-name">{this.userName}</span>
                  <span class="esri-header-account-content-id">{this.userId}</span>
                </div>
                <ul
                  class="esri-header-account-content-menu"
                  role="navigation"
                  aria-labelledby="esri-header-account-control"
                >
                  {this.menus.map(item => (
                    <li class="esri-header-account-content-item">
                      {
                        item.newContext ?
                        <a class="esri-header-account-content-link" href={item.href} target="_blank" rel="noopener">
                          {item.label}
                        </a>
                        :
                        <a class="esri-header-account-content-link" href={item.href}>
                          {item.label}
                        </a>
                      }
                    </li>
                  ))}
                </ul>
              </div>
              <ul
                class="esri-header-account-signin-menu"
                role="group"
              >
                <li class="esri-header-account-signin-item">
                  <button
                    class="esri-header-account-signin-control -switch"
                    onClick={(event) => this.switch.emit({event})}
                  >
                    {this.switchText}
                  </button>
                </li>
                <li class="esri-header-account-signin-item">
                  <button
                    class="esri-header-account-signin-control -logout"
                    onClick={(event) => this.signout.emit({event})}
                  >
                    {this.signOutText}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          :
          <button
            class="esri-header-account-control esri-header-account-control--sign-in"
            onClick={(event) => {
              this.signIn.emit({event});
            }}
          >
            {this.signInText}
          </button>
        }
      </Host>
    )
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

  @Event({ eventName: "header:click:signin" }) signIn: EventEmitter;
  @Event({ eventName: "header:click:account" }) account: EventEmitter;
  @Event({ eventName: "header:click:switch" }) switch: EventEmitter;
  @Event({ eventName: "header:click:signout" }) signout: EventEmitter;

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
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private privateMethod(): void {}
}
