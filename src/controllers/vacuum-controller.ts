import { Controller } from "./controller";

export class VacuumController extends Controller {
  _slider_color_rgb_0?: string;
  _slider_color_rgb_100?: string;
  _slider_color_rgb_off?: string;

  get attribute() {
    return this._config.attribute || "fan_speed";
  }

  get _icon(): string {
    switch (this.attribute) {
      case "fan_speed":
        return "mdi:fan";
      case "water_grade":
        return "mdi:water";
      default:
        return "mdi:robot-vacuum";
    }
  }

  get _icon_off(): string {
    switch (this.attribute) {
      case "fan_speed":
        return "mdi:fan-off";
      case "water_grade":
        return "mdi:water-off";
      default:
        return "mdi:robot-vacuum";
    }
  }

  get _value() {
    switch (this.attribute) {
      case "fan_speed":
        const modes = this.stateObj.attributes.fan_speed_list;
        return modes.indexOf(this.stateObj.attributes.fan_speed);
      case "water_grade":
        return this.stateObj.attributes.water_grade;
      default:
        return 0;
    }
  }

  set _value(value) {
    switch (this.attribute) {
      case "fan_speed":
        const modes = this.stateObj.attributes.fan_speed_list;
        this._hass.callService("vacuum", "set_fan_speed", {
          entity_id: this.stateObj.entity_id,
          fan_speed: modes[value],
        });
        break;
      case "water_grade":
        this._hass.callService("vacuum", "send_command", {
          entity_id: this.stateObj.entity_id,
          command: "set_suction",
          params: value,
        });
        break;
      default:
    }
  }

  get string() {
    switch (this.attribute) {
      case "fan_speed":
        return this.stateObj.attributes.fan_speed;
      case "water_grade":
        switch (this.stateObj.attributes.water_grade) {
          case 11:
            return "Low";
          case 12:
            return "Medium";
          case 13:
            return "High";
        }
      default:
        return this._hass.localize(`component.vacuum.state._.${this.stateObj.state}`);
    }
  }

  instantString(value: number): string {
    switch (this.attribute) {
      case "fan_speed":
        const modes = this.stateObj.attributes.fan_speed_list;
        return modes[value];
      case "water_grade":
        if (value == 11)
          return "Low";
        else if (value == 12)
          return "Medium";
        else if (value == 13)
          return "High";
      default:
        return this._hass.localize(`component.vacuum.state._.${this.stateObj.value}`);
    }
  }

  get isOff() {
    switch (this.attribute) {
      case "fan_speed":
      case "water_grade":
        return false;
      default:
        return this.stateObj.state === "docked";
    }
  }

  isValueOff(value) {
    return false;
  }

  get _min() {
    switch (this.attribute) {
      case "fan_speed":
        return 0;
      case "water_grade":
        return 11;  // 11 is Low, 12 is Medium, 13 is High
      default:
        return 0;
    }
  }
  get _max() {
    switch (this.attribute) {
      case "fan_speed":
        return this.stateObj.attributes.fan_speed_list.length - 1;
      case "water_grade":
        return 13;  // 11 is Low, 12 is Medium, 13 is High
      default:
        return 100;
    }
  }
  get _step() {
    return 1;
  }
}
