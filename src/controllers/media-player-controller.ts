import { html } from "lit-element";
import { Controller } from "./controller";

export class MediaPlayerController extends Controller {
  _max;
  _min;
  _step;
  _slider_color_rgb_off?: string;
  _slider_color_rgb_0?: string;
  _slider_color_rgb_100?: string;

  get _icon(): string {
    return "mdi:volume-high";
  }

  get _icon_off(): string {
    return "mdi:volume-off";
  }

  get _value() {
    return this.stateObj.attributes.is_volume_muted
      ? 0
      : Math.ceil(this.stateObj.attributes.volume_level * 100.0);
  }

  set _value(value) {
    value = value / 100.0;
    this._hass.callService("media_player", "volume_set", {
      entity_id: this.stateObj.entity_id,
      volume_level: value,
    });
    if (value)
      this._hass.callService("media_player", "volume_mute", {
        entity_id: this.stateObj.entity_id,
        is_volume_muted: false,
      });
  }

  get isOff() {
    return this.stateObj.state === "off" || this.stateObj.attributes.volume_level == 0;
  }

  isValueOff(value): boolean {
    return value == 0;
  }

  get string() {
    if (this.stateObj.attributes.is_volume_muted) return "-";
    return !!this.stateObj.attributes.volume_level
      ? `${this.value} %`
      : this._hass.localize("component.media_player.state._.off");
  }

  instantString(value: number): string {
    return this.isValueOff(value) ? this._hass.localize("component.media_player.state._.off") : `${value} %`;
  }
}
