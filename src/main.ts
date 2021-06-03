import { LitElement, html, css, property } from "lit-element";

import { getController } from "./controllers/get-controller";
import { Controller, ControllerConfig } from "./controllers/controller";
import pjson from "../package.json";

class LightSliderCard extends LitElement {
  _config: ControllerConfig;
  ctrl: Controller;

  @property() hass: any;

  setConfig(config: ControllerConfig) {
    this._config = config;
    if (!config.entity) throw new Error(`No entity specified.`);
    const domain = config.entity.split(".")[0];
    const ctrlClass = getController(domain);
    if (!ctrlClass) throw new Error(`Unsupported entity type: ${domain}`);
    this.ctrl = new ctrlClass(config);
  }

  async resized() {
    await this.updateComplete;
  }

  async firstUpdated() {
    await this.resized();
  }

  render() {
    const c = this.ctrl;
    c.hass = this.hass;
    if (!c.stateObj)
      return html`
        <hui-warning>
          ${this.hass.localize(
        "ui.panel.lovelace.warning.entity_not_found",
        "entity",
        this._config.entity
      )}
        </hui-warning>
      `;

    const dir = this.hass.translationMetadata.translations[
      this.hass.language || "en"
    ].isRTL
      ? "rtl"
      : "ltr";

    const showSlider = c.stateObj.state !== "unavailable" && c.hasSlider;
    const showValue = !this._config.hide_state;
    const showTitle = !this._config.hide_title;
    const showIcon = !this._config.hide_icon;
    const hideThumb = this._config.hide_thumb;
    const transparentCard = this._config.transparent_card;
    const title = this._config.title ?? c.stateObj.attributes.friendly_name;
    const statePosition = this._config.state_position ?? "above";
    const sliderWidth = this._config.slider_width ?? "150px";
    const sliderHeight = this._config.slider_height ?? "400px";
    const sliderBorderRadius = this._config.slider_corner_radius ?? "var(--ha-card-border-radius)";
    const sliderColor = this._config.slider_color ? this._config.slider_color : c.sliderColor;
    const trackColor = this._config.slider_track_color ? this._config.slider_track_color : c.sliderTrackColor;
    const thumbColor = this._config.slider_thumb_color ? this._config.slider_thumb_color : c.sliderThumbColor;
    const thumbSize = this._config.slider_thumb_size ?? "80px";
    const stateColor = this._config.state_color ?? "var(--primary-text-color)";
    const titleColor = this._config.title_color ?? "var(--primary-text-color)";
    const iconColor = this._config.icon_color ?? "var(--primary-text-color)";
    const iconSize = this._config.icon_size;
    const iconPosition = this._config.icon_position ?? "inline";

    return showSlider ? html`
      <ha-card style="${transparentCard ? 'background: none; box-shadow: none;' : ''}">
        <div class="wrapper" @click=${(ev) => ev.stopPropagation()}>
          <div class="title-wrapper">
            ${showIcon && iconPosition === "inline" ? html`
            <ha-icon icon="${c.icon}" style="color: ${iconColor}; ${iconSize ? `--mdc-icon-size: ${iconSize};` : ''}"></ha-icon>`
        : ""}
            ${showTitle ? html`
            <span class="title" style="color: ${titleColor}">${title}</span>`
        : ""}
          </div>
        ${showValue && (statePosition === "above" || statePosition === "below") ? html`
          <span id="slider-value" class="state ${statePosition}">
              ${c.stateObj.state === "unavailable" ? this.hass.localize("state.default.unavailable") : c.string}
          </span>`
        : ""}
        
          <div class="range-holder ${hideThumb ? 'hide-thumb' : ''}" style="--slider-height: ${sliderHeight};--slider-width: ${sliderWidth};">
            <input type="range" style="--slider-border-radius: ${sliderBorderRadius}; --state-color: ${stateColor}; --slider-color: ${sliderColor}; --slider-thumb-color:${thumbColor}; --slider-track-color:${trackColor}; --thumb-size: ${thumbSize};"                  
                .value="${this._updateCurrentValue(c)}"
                .min=${c.min}
                .max=${c.max}
                .step=${c.step}
                @input=${e => this._previewValue(c, e)}
                @change=${e => this._setValue(c, e)}>
                
            <div class="inside-wrapper">
                ${showIcon && iconPosition === "inside" ? html`
                <ha-icon class="${iconPosition}" icon="${c.icon}" style="color: ${iconColor}; ${iconSize ? `--mdc-icon-size: ${iconSize};` : ''}"></ha-icon>`
        : ""}
                ${showValue && statePosition === "inside" ? html`
                <span id="slider-value" class="state ${statePosition}">
                    ${c.stateObj.state === "unavailable" ? this.hass.localize("state.default.unavailable") : c.string}
                </span>`
        : ""}
            </div>
          </div>
        </div>
      </ha-card>
    ` : '';
  }

  _updateCurrentValue(c: Controller) {
    const sliderValueEl = this.shadowRoot.getElementById("slider-value");
    if (sliderValueEl) { sliderValueEl.innerText = c.string; }

    return c.isOff ? 0 : c.value;
  }

  _previewValue(c: Controller, e) {
    const sliderValueEl = this.shadowRoot.getElementById("slider-value");
    if (sliderValueEl) { sliderValueEl.innerText = c.instantString(e.target.value); }

    if (this._config.slider_color_auto || (this._config.slider_color_rgb_0 && this._config.slider_color_rgb_100)) {
      e.target.style.setProperty('--slider-color', c.sliderInstantColor(e.target.value));
    }
  }

  _setValue(c: Controller, e) {
    c.value = e.target.value

  }

  static get styles() {
    return css`
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 100;
      }
      .title-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        max-width: 100%;
      }
      .title-wrapper > ha-icon + span {
        margin-left: 10px;
      }
      .title {
        font-size: 24px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .state {
        margin: 10px 0px 20px 0;
        font-size: 22px;
        color: var(--state-color);
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .state.below {
        order: 1;
        margin: 20px 0px 10px 0;
      }
      .inside-wrapper {
        position: absolute;
        width: var(--slider-width);
        text-align: center;
        bottom: calc(0.45 * var(--slider-width));
        pointer-events: none
      }
      .inside-wrapper > ha-icon {
        -webkit-filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
        filter: drop-shadow(rgba(0, 0, 0, 0.2) 0 1px 3px);
      }
      .state.inside {
        display: block;
        text-align: center;
        margin: 20px 10px 0 10px;
        -webkit-filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
        filter: drop-shadow(rgba(0, 0, 0, 0.2) 0 1px 3px);
      }
      .wrapper {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 100;
        flex-direction: column;
      }
      .range-holder {
        height: var(--slider-height);
        width: var(--slider-width);
        position: relative;
        display: block;
        margin: auto;
      }
      .range-holder input[type="range"] {
          outline: 0;
          border: 0;
          border-radius: var(--slider-border-radius, 12px);
          width: var(--slider-height);
          margin: 0;
          //transition: box-shadow 0.2s ease-in-out;
          -webkit-transform:rotate(270deg);
          -moz-transform:rotate(270deg);
          -o-transform:rotate(270deg);
          -ms-transform:rotate(270deg);
          transform:rotate(270deg);
          overflow: hidden;
          height: var(--slider-width);
          -webkit-appearance: none;
          background-color: var(--slider-track-color);
          position: absolute;
          top: calc(50% - (var(--slider-width) / 2));
          right: calc(50% - (var(--slider-height) / 2));
      }
      .range-holder input[type="range"]::-webkit-slider-runnable-track {
          height: var(--slider-width);
          -webkit-appearance: none;
          background-color: var(--slider-track-color);
          margin-top: -1px;
          //transition: box-shadow 0.2s ease-in-out;
      }
      .range-holder input[type="range"]::-moz-thumb-track {
        height: var(--slider-width);
        background-color: var(--slider-track-color);
        margin-top: -1px;
        //transition: box-shadow 0.2s ease-in-out;
      }
      .range-holder input[type="range"]::-webkit-slider-thumb {
          width: 25px;
          border-right:10px solid var(--slider-color);
          border-left:10px solid var(--slider-color);
          border-top:20px solid var(--slider-color);
          border-bottom:20px solid var(--slider-color);
          -webkit-appearance: none;
          height: var(--thumb-size);
          cursor: grab;
          background: var(--slider-color);
          box-shadow: -350px 0 0 350px var(--slider-color), inset 0 0 0 80px var(--slider-thumb-color);
          border-radius: 0;
          //transition: box-shadow 0.2s ease-in-out;
          position: relative;
          top: calc((var(--slider-width) - var(--thumb-size)) / 2);
      }
      .range-holder.hide-thumb input[type="range"]::-webkit-slider-thumb {
        box-shadow: -350px 0 0 350px var(--slider-color);
      }
      .range-holder input[type="range"]::-moz-range-thumb {
          width: 5px;
          border-right:12px solid var(--slider-color);
          border-left:12px solid var(--slider-color);
          border-top:20px solid var(--slider-color);
          border-bottom:20px solid var(--slider-color);
          height: calc(var(--thumb-size) - 2*20px);
          cursor: grab;
          background: var(--slider-color);
          box-shadow: -350px 0 0 350px var(--slider-color), inset 0 0 0 80px var(--slider-thumb-color);
          border-radius: 0;
          //transition: box-shadow 0.2s ease-in-out;
          position: relative;
          top: calc((var(--slider-width) - (var(--thumb-size) - 2*20px)) / 2);
      }
      .range-holder.hide-thumb input[type="range"]::-moz-range-thumb {
        box-shadow: -350px 0 0 350px var(--slider-color);
      }
    `;
  }
}

if (!customElements.get("light-slider-card")) {
  customElements.define("light-slider-card", LightSliderCard);
  console.info(
    `%cLIGHT-SLIDER-CARD ${pjson.version} IS INSTALLED`,
    "color: green; font-weight: bold",
    ""
  );
}
