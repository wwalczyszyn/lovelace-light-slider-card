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
    const sliderWidth = this._config.slider_width ?? "150px";
    const sliderHeight = this._config.slider_height ?? "400px";
    const sliderBorderRadius = this._config.slider_corner_radius ?? "var(--ha-card-border-radius)";
    const sliderColor = this._config.slider_color ? this._config.slider_color : c.sliderColor;
    const trackColor = this._config.slider_track_color ? this._config.slider_track_color : c.sliderTrackColor;
    const thumbColor = this._config.slider_thumb_color ? this._config.slider_thumb_color : c.sliderThumbColor;
    const stateColor = this._config.state_color ?? "var(--primary-text-color)";

    return html`
      <ha-card>
        <div class="wrapper" @click=${(ev) => ev.stopPropagation()}>
        ${showValue
        ? html`<span id="slider-value" class="state">
              ${c.stateObj.state === "unavailable"
            ? this.hass.localize("state.default.unavailable")
            : c.string}
            </span>`
        : ""}
        ${showSlider
        ? html`
              <div class="range-holder" style="--slider-height: ${sliderHeight};--slider-width: ${sliderWidth};">
                <input type="range" style="--slider-height: ${sliderHeight}; --slider-width: ${sliderWidth}; --slider-border-radius: ${sliderBorderRadius}; --state-color: ${stateColor}; --slider-color: ${sliderColor}; --slider-thumb-color:${thumbColor}; --slider-track-color:${trackColor};"                  
                    .value="${this._updateCurrentValue(c)}"
                    .min=${c.min}
                    .max=${c.max}
                    .step=${c.step}
                    @input=${e => this._previewValue(c, e)}
                    @change=${e => this._setValue(c, e)}>
              </div>
            `
        : ""}
        </div>
      </ha-card>
    `;
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
        //height: 40px;
      }
      .state {
        //min-width: 45px;
        //text-align: end;
        //margin-left: 5px;
      }
      ha-entity-toggle {
        min-width: auto;
        margin-left: 8px;
      }
      ha-slider {
        width: 100%;
        min-width: 100px;
      }
      ha-slider:not(.full) {
        max-width: 200px;
      }


      .state {
        margin: 10px 0px 20px 0;
        font-size: 1.6rem;
        color: var(--state-color);
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
      .range-holder input[type="range"]::-webkit-slider-thumb {
          width: 25px;
          border-right:10px solid var(--slider-color);
          border-left:10px solid var(--slider-color);
          border-top:20px solid var(--slider-color);
          border-bottom:20px solid var(--slider-color);
          -webkit-appearance: none;
          height: 80px;
          cursor: ew-resize;
          background: var(--slider-color);
          box-shadow: -350px 0 0 350px var(--slider-color), inset 0 0 0 80px var(--slider-thumb-color);
          border-radius: 0;
          //transition: box-shadow 0.2s ease-in-out;
          position: relative;
          top: calc((var(--slider-width) - 80px) / 2);
      }
      .range-holder input[type="range"]::-moz-thumb-track {
          height: var(--slider-width);
          background-color: var(--slider-track-color);
          margin-top: -1px;
          //transition: box-shadow 0.2s ease-in-out;
      }
      .range-holder input[type="range"]::-moz-range-thumb {
          width: 5px;
          border-right:12px solid var(--slider-color);
          border-left:12px solid var(--slider-color);
          border-top:20px solid var(--slider-color);
          border-bottom:20px solid var(--slider-color);
          height: calc(var(--slider-width)*.4);
          cursor: ew-resize;
          background: var(--slider-color);
          box-shadow: -350px 0 0 350px var(--slider-color), inset 0 0 0 80px var(--slider-thumb-color);
          border-radius: 0;
          //transition: box-shadow 0.2s ease-in-out;
          position: relative;
          top: calc((var(--slider-width) - 80px) / 2);
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
