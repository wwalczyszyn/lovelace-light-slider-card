import { Controller } from "./controller";

export class ClimateController extends Controller {
  _slider_color_rgb_off?: string;

  get attribute() {
    return this._config.attribute || "temperature";
  }

  get _icon(): string {
    switch (this.attribute) {
      case "fan_mode":
        return "mdi:fan";
      default:
        return "mdi:thermometer";
    }
  }

  get _icon_off(): string {
    switch (this.attribute) {
      case "fan_mode":
        return "mdi:fan-off";
      default:
        return "mdi:thermometer-off";
    }
  }

  get _slider_color_rgb_0(): string {
    return this.attribute === "temperature" ? "rgb(0, 191, 255)" : null;
  }

  get _slider_color_rgb_100(): string {
    return this.attribute === "temperature" ? "rgb(220, 20, 60)" : null;
  }

  get _value() {
    switch (this.attribute) {
      case "fan_mode":
        if (this.isOff) {
          return 0;
        } else {
          const modes = this.stateObj.attributes.fan_modes;
          return modes.indexOf(this.stateObj.attributes.fan_mode) + 1;
        }
      default:
        return this.stateObj.attributes.temperature;
    }
  }

  set _value(value) {
    switch (this.attribute) {
      case "fan_mode":
        if (value == 0) {
          this._hass.callService("climate", "turn_off", {
            entity_id: this.stateObj.entity_id
          });
        } else {
          const modes = this.stateObj.attributes.fan_modes;
          this._hass.callService("climate", "set_fan_mode", {
            entity_id: this.stateObj.entity_id,
            fan_mode: modes[value - 1],
          });
        }
        break;
      case "temperature":
      default:
        this._hass.callService("climate", "set_temperature", {
          entity_id: this.stateObj.entity_id,
          temperature: value,
        });
        break;
    }
  }

  get string() {
    switch (this.attribute) {
      case "fan_mode":
        if (this.isOff) return this._hass.localize("component.climate.state._.off");
        return this.stateObj.attributes.fan_mode;
      default:
        return `${this.value} ${this._hass.config.unit_system.temperature}`;
    }
  }

  instantString(value: number): string {
    switch (this.attribute) {
      case "fan_mode":
        const modes = [this._hass.localize("component.climate.state._.off")].concat(this.stateObj.attributes.fan_modes);
        return modes[value];
      default:
        return `${value} ${this._hass.config.unit_system.temperature}`;
    }
  }

  get isOff() {
    return this.stateObj.state === "off";
  }

  get _min() {
    switch (this.attribute) {
      case "fan_mode":
        return 0;
      default:
        return this.stateObj.attributes.min_temp;
    }
  }
  get _max() {
    switch (this.attribute) {
      case "fan_mode":
        return this.stateObj.attributes.fan_modes.length;
      default:
        return this.stateObj.attributes.max_temp;
    }
  }
  get _step() {
    return 1;
  }
}
