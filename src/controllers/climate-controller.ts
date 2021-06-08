import { Controller } from "./controller";

export class ClimateController extends Controller {
  _slider_color_rgb_off?: string;

  get _icon(): string {
    return "mdi:thermometer";
  }

  get _icon_off(): string {
    return "mdi:thermometer-off";
  }

  get _slider_color_rgb_0(): string {
    return "rgb(0, 200, 222)"
  }

  get _slider_color_rgb_100(): string {
    return "rgb(210, 0, 0)"
  }

  get _value() {
    return this.stateObj.attributes.temperature;
  }

  set _value(value) {
    this._hass.callService("climate", "set_temperature", {
      entity_id: this.stateObj.entity_id,
      temperature: value,
    });
  }

  get string() {
    return `${this.value} ${this._hass.config.unit_system.temperature}`;
  }

  instantString(value: number): string {
    return `${value} ${this._hass.config.unit_system.temperature}`;
  }

  get isOff() {
    return this.stateObj.state === "off";
  }

  get _min() {
    return this.stateObj.attributes.min_temp;
  }
  get _max() {
    return this.stateObj.attributes.max_temp;
  }
  get _step() {
    return 1;
  }
}
