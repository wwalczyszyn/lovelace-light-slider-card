import { Controller } from "./controller";

const RGB_INDEX = { red: 0, green: 1, blue: 2 };
const HS_INDEX = { hue: 0, saturation: 1 };

export class LightController extends Controller {
  get attribute() {
    return this._config.attribute || "brightness_pct";
  }

  get _value() {
    if (!this.stateObj || this.stateObj.state !== "on") return 0;
    const attrs = this.stateObj.attributes;
    switch (this.attribute) {
      case "color_temp":
        return attrs.color_temp;
      case "color_temp_pct":
        return (attrs.color_temp - attrs.min_mireds) / (attrs.max_mireds - attrs.min_mireds) * 100;
      case "white_value":
        return attrs.white_value;
      case "brightness":
        return attrs.brightness;
      case "brightness_pct":
        return attrs.brightness * 100.0 / 255;
      case "red":
      case "green":
      case "blue":
        return attrs.rgb_color
          ? attrs.rgb_color[RGB_INDEX[this.attribute]]
          : 0;
      case "hue":
      case "saturation":
        return attrs.hs_color
          ? attrs.hs_color[HS_INDEX[this.attribute]]
          : 0;
      case "effect":
        if (attrs.effect_list) return attrs.effect_list.indexOf(attrs.effect);
        return 0;
      default:
        return 0;
    }
  }

  get _step() {
    switch (this.attribute) {
      case "effect":
        return 1;
      default:
        return 5;
    }
  }

  get _min() {
    switch (this.attribute) {
      case "color_temp":
        return this.stateObj ? this.stateObj.attributes.min_mireds : 0;
      default:
        return 0;
    }
  }
  get _max() {
    switch (this.attribute) {
      case "color_temp":
        return this.stateObj ? this.stateObj.attributes.max_mireds : 0;
      case "red":
      case "green":
      case "blue":
      case "white_value":
      case "brightness":
        return 255;
      case "hue":
        return 360;
      case "effect":
        return this.stateObj
          ? this.stateObj.attributes.effect_list
            ? this.stateObj.attributes.effect_list.length - 1
            : 0
          : 0;
      default:
        return 100;
    }
  }

  set _value(value) {
    if (!this.stateObj) return;
    const attrs = this.stateObj.attributes;
    let attr = this.attribute;
    let on = true;
    let _value;
    switch (attr) {
      case "color_temp_pct":
        value = Math.round(value / 100 * (attrs.max_mireds - attrs.min_mireds)) + attrs.min_mireds;
        attr = "color_temp"
        break;
      case "brightness":
      case "brightness_pct":
        value =
          attr === "brightness"
            ? Math.round(value)
            : Math.round(value / 100.0 * 255);
        if (!value) on = false;
        attr = "brightness";
        break;
      case "red":
      case "green":
      case "blue":
        _value = this.stateObj.attributes.rgb_color || [0, 0, 0];
        _value[RGB_INDEX[attr]] = value;
        value = _value;
        attr = "rgb_color";
        break;
      case "hue":
      case "saturation":
        _value = this.stateObj.attributes.hs_color || [0, 0];
        _value[HS_INDEX[attr]] = value;
        value = _value;
        attr = "hs_color";
        break;
      case "effect":
        value = this.stateObj.attributes.effect_list[value];
        attr = "effect";
        break;
    }

    if (on) {
      this._hass.callService("light", "turn_on", {
        entity_id: this.stateObj.entity_id,
        [attr]: value,
      });
    } else {
      this._hass.callService("light", "turn_off", {
        entity_id: this.stateObj.entity_id,
      });
    }
  }

  get string() {
    if (this.stateObj && this.stateObj.state === "off")
      return this._hass.localize("component.light.state._.off");
    switch (this.attribute) {
      case "color_temp":
      case "brightness":
        return `${this.value}`;
      case "color_temp_pct":  
      case "brightness_pct":
      case "saturation":
        return `${this.value} %`;
      case "hue":
        return `${this.value} °`;
      case "effect":
        return this.stateObj ? this.stateObj.attributes.effect : "";
      default:
        return this.value;
    }
  }
  instantString(value: number): string {
    switch (this.attribute) {
      case "color_temp":
        return `${value}`;
      case "brightness":
        return value == 0 ? this._hass.localize("component.light.state._.off") : `${value}`;
      case "brightness_pct":
        return value == 0 ? this._hass.localize("component.light.state._.off") : `${value} %`;
      case "color_temp_pct":
      case "saturation":
        return `${value} %`;
      case "hue":
        return `${value} °`;
      case "effect":
        return this.stateObj ? `${value}` : "";
      default:
        return `${value}`;
    }
  }

  get hasSlider() {
    if (!this.stateObj) return false;
    switch (this.attribute) {
      case "brightness":
      case "brightness_pct":
        if ("brightness" in this.stateObj.attributes) return true;
        if (
          "supported_features" in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 1
        )
          return true;
        return false;
      case "color_temp":
      case "color_temp_pct":
        if ("color_temp" in this.stateObj.attributes) return true;
        if (
          "supported_features" in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 2
        )
          return true;
        return false;
      case "white_value":
        if ("white_value" in this.stateObj.attributes) return true;
        if (
          "supported_features" in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 128
        )
          return true;
        return false;
      case "red":
      case "green":
      case "blue":
        if ("rgb_color" in this.stateObj.attributes) return true;
        if (
          "supported_features" in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 16
        )
          return true;
        return false;
      case "hue":
      case "saturation":
        if ("hs_color" in this.stateObj.attributes) return true;
        if (
          "supported_features" in this.stateObj.attributes &&
          this.stateObj.attributes.supported_features & 16
        )
          return true;
        return false;
      case "effect":
        if ("effect" in this.stateObj.attributes) return true;
        return false;
      default:
        return false;
    }
  }
}
