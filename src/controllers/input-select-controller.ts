import { Controller } from "./controller";

export class InputSelectController extends Controller {
  _min;
  _icon?: string;
  _icon_off?: string;
  _slider_color_rgb_off?: string;
  _slider_color_rgb_0?: string;
  _slider_color_rgb_100?: string;

  get _value() {
    return this.stateObj.attributes.options.indexOf(this.stateObj.state);
  }

  set _value(value) {
    if (value in this.stateObj.attributes.options)
      this._hass.callService("input_select", "select_option", {
        entity_id: this.stateObj.entity_id,
        option: this.stateObj.attributes.options[value],
      });
  }

  get string() {
    return this.stateObj.state;
  }

  get isOff() {
    return false;
  }

  isValueOff(value): boolean {
    return false;
  }

  get hasSlider() {
    return (
      this.stateObj.attributes.options &&
      this.stateObj.attributes.options.length > 0
    );
  }

  get _max() {
    return this.stateObj.attributes.options.length - 1;
  }

  get _step() {
    return 1;
  }
}
