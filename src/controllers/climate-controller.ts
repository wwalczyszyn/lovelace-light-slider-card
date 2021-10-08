import { Controller } from "./controller";

export class ClimateController extends Controller {
  hvacModes: Array<String> = ["off", "fan_only", "dry", "cool", "heat"];
  _slider_color_rgb_off?: string;

  get attribute() {
    return this._config.attribute;
  }

  get _icon(): string {
    switch (this.attribute) {
      case "fan_mode":
        return "mdi:fan";
      case "temperature":
        return "mdi:thermometer";
      default:
        switch (this._value) {
          case "off":
            return "mdi:power";
          case "dry":
            return "mdi:water-opacity"
          case "cool":
            return "mdi:snowflake"
          case "heat":
            return "mdi:fire"
          case "fan_only":
          default:
            return "mdi:fan"
        }
    }
  }

  get _icon_off(): string {
    switch (this.attribute) {
      case "fan_mode":
        return "mdi:fan-off";
      case "temperature":
        return "mdi:thermometer-off";
      default:
        return "mdi:power";
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
      case "temperature":
        return this.stateObj.attributes.temperature;
      default:
        return this.hvacModes.indexOf(this.stateObj.state);
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
        this._hass.callService("climate", "set_temperature", {
          entity_id: this.stateObj.entity_id,
          temperature: value,
        });
        break;
      default:
        this._hass.callService("climate", "set_hvac_mode", {
          entity_id: this.stateObj.entity_id,
          hvac_mode: this.hvacModes[value],
        });
    }
  }

  get string() {
    switch (this.attribute) {
      case "fan_mode":
        if (this.isOff) return this._hass.localize("component.climate.state._.off");
        return this.stateObj.attributes.fan_mode;
      case "temperature":
        return `${this.value} ${this._hass.config.unit_system.temperature}`;
      default:
        return this._hass.localize("component.climate.state._." + this.stateObj.state);
    }
  }

  instantString(value: number): string {
    switch (this.attribute) {
      case "fan_mode":
        const modes = [this._hass.localize("component.climate.state._.off")].concat(this.stateObj.attributes.fan_modes);
        return modes[value];
      case "temperature":
        return `${value} ${this._hass.config.unit_system.temperature}`;
      default:
        return this._hass.localize("component.climate.state._." + this.hvacModes[value]);
    }
  }

  get isOff() {
    return this.stateObj.state === "off";
  }

  get _min() {
    switch (this.attribute) {
      case "fan_mode":
        return 0;
      case "temperature":
        return this.stateObj.attributes.min_temp;
      default:
        return 0;
    }
  }
  get _max() {
    switch (this.attribute) {
      case "fan_mode":
        return this.stateObj.attributes.fan_modes.length;
      case "temperature":
        return this.stateObj.attributes.max_temp;
      default:
        return this.hvacModes.length - 1;
    }
  }
  get _step() {
    return 1;
  }
}
