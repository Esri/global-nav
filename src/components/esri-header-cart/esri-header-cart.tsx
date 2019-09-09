import { Component, Element, State, Watch, Prop, Host, Listen, h } from "@stencil/core";
import { shoppingCart24 } from "@esri/calcite-ui-icons";
@Component({
  tag: "esri-header-cart",
  styleUrl: "esri-header-cart.scss",
  shadow: true
})
export class EsriHeaderCart {
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
  @Prop({ mutable: true }) items: number = 0;
  @Prop({ mutable: true }) url: string = "#";

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
          this.items > 0 ?
          (
            <a href={this.url} class="esri-header-cart__icon" >
              <svg class="esri-header-cart__image">
                <path d={shoppingCart24} />
              </svg>
              <span
                class={{
                  "esri-header-cart__items": true,
                  "esri-header-cart__items--updated": this.isUpdated,
                }}
              >
                {this.items}
              </span>
            </a>
          ) :
          null
        }
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  @Listen("header:update:cart") updateCart(e: CustomEvent) {
    const detail = e.detail || {};
    if (e.detail.items > 0) {
      this.items = detail.items;
    }
    if (e.detail.url) {
      this.url = e.detail.url;
    }
  }

  @Listen("header:shoppingcart:add") addToCart(e: CustomEvent) {
    const { increment } = e.detail;
    this.items = Math.max(this.items + increment, 0);
  }

  @Listen("header:shoppingcart:remove") removeFromCart(e: CustomEvent) {
    const { increment } = e.detail;
    this.items = Math.max(this.items - increment, 0);
  }

  @State() private isUpdated: boolean;

  /** When cart updates, show animation */
  @Watch('items') watchHandler(newValue: number, oldValue: number) {
    if (newValue !== oldValue && newValue > 0) {
      this.isUpdated = true;
      setTimeout(() => {
        this.isUpdated = false;
      }, 1000);
    }
  }
}
