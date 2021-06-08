# light-slider-card

The fork of [slider-entity-row](https://github.com/thomasloven/lovelace-slider-entity-row) by Thomas Loven, with styling inspired by [light-popup-card](https://github.com/DBuit/light-popup-card) by Daan Buit. A lot of custom features and configuration options were put on top of these two projects.

Can be used as a standard card or inside of the popup using [browser_mod](https://github.com/wwalczyszyn/lovelace-light-slider-card).

## Installing

### HACS installation

Go to the hacs store and use the repo url https://github.com/wwalczyszyn/lovelace-light-slider-card and add this as a custom repository under settings.

Add the following to your ui-lovelace.yaml:

```yaml
resources:
  url: /hacsfiles/light-slider-card/light-slider-card.js
  type: module
```

### Manual installation

Copy the .js file from the dist directory to your www directory and add the following to your ui-lovelace.yaml file:

```yaml
resources:
  url: /local/light-slider-card.js
  type: module
```

## Quick Start

```yaml
type: 'custom:light-slider-card'
entity: light.desk_light
icon_position: inside
slider_color_auto: true
```

<img width="500" alt="simple" src="https://user-images.githubusercontent.com/5846089/121170339-5b08a280-c855-11eb-896a-1668498ef6ad.png">

## Usage

`entity` can be an entity in one of the following domains:

- `light` - set brightness, color temperature, effects
- `media_player` - set volume
- `climate` - set temperature
- `cover` - set position
- `fan` - set speed (assumes first setting is `off`)
- `input_number` - set value (only if `mode: slider`)
- `input_select` - select option
- `number` - set value

If you want to controll more than one entity with the same slider, use [light group](https://www.home-assistant.io/integrations/light.group/), [cover group](https://www.home-assistant.io/integrations/cover.group/) or a custom made [template entity](https://www.home-assistant.io/integrations/#search/template).

Available options:

| Option                 | Values                   | Description                                                                                      | default                                               |
| ---------------------- | ------------------------ | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `min`                  | number                   | Minimum value of slider                                                                          | Depends on entity domain                              |
| `max`                  | number                   | Maximum value of slider                                                                          | Depends on entity domain                              |
| `step`                 | number                   | Step size of slider selection                                                                    | Depends on entity domain                              |
| `hide_state`           | `true`/`false`           | Hide the slider value completly                                                                  | `false`                                               |
| `attribute`            | (see below)              | Which attribute the slider should controll                                                       | Depends on entity domain                              |
| `title`                | string                   | Text appearing above the slider                                                                  | Enitity friendly name                                 |
| `icon`                 | string                   | Icon appearing next to the title or inside the slider                                            | Entity icon                                           |
| `icon_off`             | `true`/`false`           | The icon, which replaces the default one when the entity is `off`                                | none                                                  |
| `hide_title`           | `true`/`false`           | Hide the title completly                                                                         | `false`                                               |
| `hide_icon`            | `true`/`false`           | Hide the icon completly                                                                          | `false`                                               |
| `hide_thumb`           | `true`/`false`           | Hide the slider thumb completly                                                                  | `false`                                               |
| `transparent_card`     | `true`/`false`           | Make the card transparet and without the shadow                                                  | `false`                                               |
| `state_position`       | `above`/`below`/`inside` | Position of the slider value text                                                                | `above`                                               |
| `slider_width`         | string                   | Slider width (CSS notation - px/%...)                                                            | `150px`                                               |
| `slider_height`        | string                   | Slider height (CSS notation - px/%...)                                                           | `400px`                                               |
| `slider_color`         | string                   | Color of the slider progress                                                                     | Accent color                                          |
| `slider_thumb_color`   | string                   | Color of the slider thumb                                                                        | Color of disabled text (`var(--disabled-text-color)`) |
| `slider_thumb_size`    | string                   | Width of the thumb                                                                               | `100px`                                               |
| `slider_track_color`   | string                   | Color of the slider background (track)                                                           | Color of disabled text (`var(--disabled-text-color)`) |
| `state_color`          | string                   | Color of the slider value text                                                                   | Primary text color (usually `white`)                  |
| `title_color`          | string                   | Color of the title text                                                                          | Primary text color (usually `white`)                  |
| `icon_color`           | string                   | Color of the icon                                                                                | Primary text color (usually `white`)                  |
| `icon_size`            | string                   | Width of the icon (preserves aspect ratio)                                                       | `24px` for `inline`, `40px` for `inside` position     |
| `icon_position`        | `inline`/`inside`        | Position of the icon - inline with title or inside the slider (above state)                      | `inline`                                              |
| `slider_corner_radius` | string                   | Slider corder radius                                                                             | Same as other cards corder radius                     |
| `slider_color_rgb_off` | string                   | Color of the slider when the entity is `off`                                                     | `rgb(70, 70, 70)`                                     |
| `slider_color_rgb_0`   | string                   | Color of the slider when it is at the very bottom. This color is used to calculate middle tones. | none                                                  |
| `slider_color_rgb_100` | string                   | Color of the slider when it is at the very top. This color is used to calculate middle tones.    | none                                                  |
| `slider_color_auto`    | `true`/`false`           | Enable automatic slider coloring based on its value. Supported by some entity domains.           | `false`                                               |

### Custom slider colors

<img width="500" alt="light-slider-card" src="https://user-images.githubusercontent.com/5846089/121169239-16c8d280-c854-11eb-8548-40c4643d39ba.png">

<details><summary>YAML code for screenshot above</summary>

```yaml
type: 'custom:light-slider-card'
entity: light.desk_light
title: Desk lamp
slider_color_auto: false
slider_corner_radius: 30px
slider_track_color: '#d9d9d9'
slider_color_rgb_off: 'rgb(100, 100, 100)'
slider_color_rgb_0: 'rgb(148, 128, 0)'
slider_color_rgb_100: 'rgb(255, 249, 202)'
hide_thumb: true
icon_color: '#fff'
icon_position: inside
state_color: '#fff'
state_position: inside
```

</details>

### Automatic slider colors

<img width="500" alt="light-slider-card" src="https://user-images.githubusercontent.com/5846089/121168152-ee8ca400-c852-11eb-95da-e7de2639022e.gif">

<details><summary>YAML code for screenshot above</summary>

```yaml
type: 'custom:light-slider-card'
entity: light.desk_light
title: Desk lamp
attribute: color_temp_pct
slider_color_auto: true
slider_corner_radius: 30px
slider_track_color: '#d9d9d9'
slider_color_rgb_off: 'rgb(100, 100, 100)'
hide_thumb: true
icon_color: '#fff'
icon_position: inside
state_color: '#fff'
state_position: inside
```

</details>

### Attribute

Currently, the following attribute settings are supported.

**For `light` domain:**

- `brightness_pct` - default
- `brightness`
- `color_temp`
- `color_temp_pct`
- `hue`
- `saturation`
- `red`
- `green`
- `blue`
- `effect`
- `white_value`

**For `cover` domain:**

- `position` - default
- `tilt`

## Examples

### Display two sliders side-by-side [hack]

<img width="500" alt="double_brightness_color" src="https://user-images.githubusercontent.com/5846089/121170463-8ab7aa80-c855-11eb-81fe-36668333104e.png">

<details><summary>YAML code for screenshot above</summary>

```yaml
type: entities
title: Desk lamp
show_header_toggle: false
card_mod:
  style: |
    :host #states {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: baseline;
    }
entities:
  - type: 'custom:light-slider-card'
    entity: light.desk_light
    slider_color_auto: true
    state_position: inside
    icon_position: inside
    hide_title: true
    transparent_card: true
  - type: 'custom:light-slider-card'
    entity: light.desk_light
    icon: 'mdi:thermometer'
    attribute: color_temp_pct
    slider_color_auto: true
    state_position: inside
    icon_position: inside
    hide_title: true
    transparent_card: true
```

</details>

### Wrapped in popup

<img width="500" alt="popup" src="https://user-images.githubusercontent.com/5846089/121179996-9f4d7000-c860-11eb-95f5-14a1556f211b.png">

<details><summary>YAML code for screenshot above</summary>

```yaml
action: fire-dom-event
browser_mod:
  command: popup
  title: |
    [[[ return entity.attributes.friendly_name ]]]
  card:
    type: 'custom:light-slider-card'
    entity: light.desk_light
    transparent_card: true
    icon_position: inside
    slider_color_auto: true
    hide_title: true
    step: 1
```

</details>

### iOS dark theme

iOS dark theme used, no additional styling required.

<img width="500" alt="simple_ios_dark" src="https://user-images.githubusercontent.com/5846089/121179090-8e502f00-c85f-11eb-8be9-12f02e4dad53.png">

<details><summary>YAML code for screenshot above</summary>

```yaml
type: 'custom:light-slider-card'
entity: light.desk_light
icon_position: inside
slider_color_auto: true
```

</details>