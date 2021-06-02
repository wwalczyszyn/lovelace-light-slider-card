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
  slider_color_0?: string;
  slider_color_100?: string;
}

export abstract class Controller {
  _config: ControllerConfig;
  _hass: any;
  stateObj: any;

  abstract _value?: number;
  abstract _min?: number;
  abstract _max?: number;
  abstract _step?: number;

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
    return this._config.slider_color ?? "var(--accent-color)";
  }
  get trackColor(): string {
    return this._config.track_color ?? "var(--disabled-text-color)";
  }
  get thumbColor(): string {
    return this._config.thumb_color ?? "var(--disabled-text-color)";
  }
}
