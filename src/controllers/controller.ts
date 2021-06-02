import { html } from "lit-element";

export interface ControllerConfig {
  entity: string;
  hide_state?: boolean;
  min?: number;
  max?: number;
  step?: number;
  attribute?: string;
  slider_width?: string;
  slider_height?: string;
  slider_color?: string;
  thumb_color?: string;
  track_color?: string;
  state_color?: string;
  slider_corner_radius?: string;
  slider_color_rgb_0?: string;
  slider_color_rgb_100?: string;
  slider_color_auto?: boolean;
}

export abstract class Controller {
  _config: ControllerConfig;
  _hass: any;
  stateObj: any;

  abstract _value?: number;
  abstract _min?: number;
  abstract _max?: number;
  abstract _step?: number;
  abstract _slider_color_rgb_0?: string;
  abstract _slider_color_rgb_100?: string;

  constructor(config: ControllerConfig) {
    this._config = config;
  }

  set hass(hass: any) {
    this._hass = hass;
    this.stateObj = hass.states[this._config.entity];
  }

  get value(): number {
    if (this._value) return Math.round(this._value / this.step) * this.step;
    return 0;
  }
  set value(value: number) {
    if (value !== this.value) this._value = value;
  }

  get string(): string {
    return `${this.value}`;
  }
  instantString(value: number): string {
    return value == 0 ? this._hass.localize("component.light.state._.off") : `${value}`;
  }
  get hidden(): boolean {
    return false;
  }
  get hasSlider(): boolean {
    return true;
  }
  get hasToggle(): boolean {
    return true;
  }

  renderToggle(hass: any) {
    return this.hasToggle
      ? html`
          <ha-entity-toggle
            .stateObj=${hass.states[this.stateObj.entity_id]}
            .hass=${hass}
            .class="state"
          ></ha-entity-toggle>
        `
      : undefined;
  }

  get isOff(): boolean {
    return this.value === 0;
  }

  get min(): number {
    return this._config.min ?? this._min ?? 0;
  }
  get max(): number {
    return this._config.max ?? this._max ?? 100;
  }
  get step(): number {
    return this._config.step ?? this._step ?? 5;
  }

  get sliderColor(): string {
    return this.sliderInstantColor(this.value);
  }
  sliderInstantColor(value: number): string {
    if (this._config.slider_color_auto || (this._config.slider_color_rgb_0 && this._config.slider_color_rgb_100)) {
      const startColor = this._config.slider_color_rgb_0 ?? this._slider_color_rgb_0 ?? "rgb(158, 158, 158)";
      const endColor = this._config.slider_color_rgb_100 ?? this._slider_color_rgb_100 ?? "rgb(250, 250, 250)";

      const startColorRgb = startColor.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
      const endColorRgb = endColor.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);

      if (startColorRgb && endColorRgb) {
        const x = (value - this.min) / (this.max - this.min);

        const r = parseInt(startColorRgb[1]) + x * (parseInt(endColorRgb[1]) - parseInt(startColorRgb[1]));
        const g = parseInt(startColorRgb[2]) + x * (parseInt(endColorRgb[2]) - parseInt(startColorRgb[2]));
        const b = parseInt(startColorRgb[3]) + x * (parseInt(endColorRgb[3]) - parseInt(startColorRgb[3]));

        return `rgb(${r}, ${g}, ${b})`;
      }
    }

    return this._config.slider_color ?? "var(--accent-color)";
  }
  get trackColor(): string {
    return this._config.track_color ?? "var(--disabled-text-color)";
  }
  get thumbColor(): string {
    return this._config.thumb_color ?? "var(--disabled-text-color)";
  }
}
