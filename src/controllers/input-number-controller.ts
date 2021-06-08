import { Controller } from "./controller";

export class InputNumberController extends Controller {
  _icon?: string;
  _icon_off?: string;
  _slider_color_rgb_off?: string;
  _slider_color_rgb_0?: string;
  _slider_color_rgb_100?: string;

  get _value() {
    return this.stateObj.state;
  }

  set _value(value) {
    this._hass.callService("input_number", "set_value", {
      entity_id: this.stateObj.entity_id,
      value: value,
    });
  }

  get string() {
    return `${parseFloat(this.stateObj.state)} ${
      this.stateObj.attributes.unit_of_measurement || ""
    }`.trim();
  }

  instantString(value: number): string {
    return `${value} ${
      this.stateObj.attributes.unit_of_measurement || ""
    }`.trim();
  }

  get isOff() {
    return false;
  }

  isValueOff(value): boolean {
    return false;
  }

  get hasSlider() {
    return this.stateObj.attributes.mode === "slider";
  }

  get _min() {
    return this.stateObj.attributes.min;
  }

  get _max() {
    return this.stateObj.attributes.max;
  }

  get _step() {
    return this.stateObj.attributes.step;
  }
}
