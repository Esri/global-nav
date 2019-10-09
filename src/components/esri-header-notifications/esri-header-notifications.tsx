import {
  Component,
  Element,
  Prop,
  Host,
  Event,
  EventEmitter,
  Listen,
  h
} from "@stencil/core";
import { bell24 } from "@esri/calcite-ui-icons/js/bell24";
import { checkCircle32 } from "@esri/calcite-ui-icons/js/checkCircle32";
import { x16 } from "@esri/calcite-ui-icons/js/x16";
import { Notification } from "../../utils/interfaces";

@Component({
  tag: "esri-header-notifications",
  styleUrl: "esri-header-notifications.scss",
  shadow: true
})
export class EsriHeaderNotifications {
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
  /** Set true to open notifications dropdown */
  @Prop({ mutable: true }) open: boolean;
  /** array of current notification messages */
  @Prop({ mutable: true }) messages: Notification[] = [];
  /** Text for button that clears all notifications */
  @Prop({ mutable: true }) dismissAllLabel: string = "Dismiss all";
  /** Aria label for noticiation X */
  @Prop({ mutable: true }) dismissLabel: string = "Dismiss";
  /** Text to display when no notifications are found */
  @Prop({ mutable: true }) emptyMessage: string = "No notifications";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <button
          class="esri-header-notifications-control"
          id="esri-header-notifications-control"
          aria-controls="esri-header-notifications-menu"
          aria-expanded={this.open ? "true" : "false"}
          aria-haspopup="true"
          onClick={() => {
            this.open = !this.open;
            this.toggleMenu.emit({open: this.open, el: this.el});
          }}
        >
          <svg
            class="esri-header-notifications-image"
            role="presentation"
            style={{ transform: "rotate(360deg)" }}
            id="esri-header-notifications-image"
          >
            <path d={bell24}></path>
          </svg>
          {this.messages.length > 0 ? (
            <span class="esri-header-notifications-badge">
              {this.messages.length}
            </span>
          ) : null}
        </button>
        <div
          class="esri-header-notifications-menu"
          id="esri-header-notifications-menu"
          role="group"
          aria-expanded={this.open ? "true" : "false"}
          aria-hidden={!this.open}
        >
          {this.messages.length > 0 ? (
            <div>
              <ul class="esri-header-notifications-messages">
                {this.messages.map(message => (
                  <li class="esri-header-notifications-message">
                    <span class="esri-header-notifications-message-text">
                      <span innerHTML={message.text}></span>
                      {message.date ? (
                        <span class="esri-header-notifications-message-text">
                          <span class="esri-header-notifications-message-date">
                            {message.date}
                          </span>
                        </span>
                      ) : null}
                    </span>
                    <button
                      class="esri-header-notifications-message-dismiss"
                      aria-label="Dismiss notification"
                      onClick={() => {
                        this.dismissNotifications.emit([message]);
                        this.messages = this.messages.filter(
                          m => m !== message
                        );
                      }}
                    >
                      <svg
                        class="esri-header-notifications-dismiss-icon"
                        role="presentation"
                        style={{ transform: "rotate(360deg)" }}
                      >
                        <path d={x16}></path>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                class="esri-header-notifications-dismiss-all"
                onClick={() => {
                  this.dismissNotifications.emit(this.messages);
                  this.messages = [];
                }}
              >
                {this.dismissAllLabel}
              </button>
            </div>
          ) : (
            <div class="esri-header-notifications-empty" key="empty">
              <svg
                class="esri-header-notifications-empty-image"
                role="presentation"
                style={{ transform: "rotate(360deg)" }}
                viewBox="0 0 32 32"
              >
                <path d={checkCircle32}></path>
              </svg>
              <p class="esri-header-notifications-empty-text">
                {this.emptyMessage}
              </p>
            </div>
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
  @Listen("header:update:notifications") updateCart(e: CustomEvent) {
    const detail = e.detail || {};
    this.messages = detail.messages || this.messages;
    this.dismissAllLabel = detail.dismissAllLabel || this.dismissAllLabel;
    this.dismissLabel = detail.dismissLabel || this.dismissLabel;
    this.emptyMessage = detail.emptyMessage || this.emptyMessage;
  }

  @Event({ eventName: "header:click:notifications:dismiss" }) dismissNotifications: EventEmitter;
  @Event({ eventName: "header:menu:toggle" }) toggleMenu: EventEmitter;
}
