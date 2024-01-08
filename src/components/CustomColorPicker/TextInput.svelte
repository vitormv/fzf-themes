<script lang="ts">
  import type { RgbaColor, HsvaColor } from 'colord';

  export let rgb: RgbaColor;
  export let hsv: HsvaColor;
  export let hex: string;

  const HEX_COLOR_REGEX = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i;

  $: h = Math.round(hsv.h);
  $: s = Math.round(hsv.s);
  $: v = Math.round(hsv.v);

  type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };

  function updateHex(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    if (HEX_COLOR_REGEX.test(target.value)) {
      hex = target.value;
    }
  }

  function updateRgb(property: string) {
    return function (e: InputEvent) {
      rgb = { ...rgb, [property]: parseFloat((e.target as HTMLInputElement).value) };
    };
  }

  function updateHsv(property: string) {
    return function (e: InputEvent) {
      hsv = { ...hsv, [property]: parseFloat((e.target as HTMLInputElement).value) };
    };
  }
</script>

<div class="text-input">
  <div class="input-container">
    <input value={hex || '---'} on:input={updateHex} style="flex: 3" />
  </div>

  <div class="input-container group">
    <div>
      <div class="label">R</div>
      <input
        aria-label="red chanel color"
        value={rgb.r}
        type="number"
        min="0"
        max="255"
        on:input={updateRgb('r')}
      />
    </div>
    <div>
      <div class="label">G</div>
      <input
        aria-label="green chanel color"
        value={rgb.g}
        type="number"
        min="0"
        max="255"
        on:input={updateRgb('g')}
      />
    </div>
    <div>
      <div class="label">B</div>
      <input
        aria-label="blue chanel color"
        value={rgb.b}
        type="number"
        min="0"
        max="255"
        on:input={updateRgb('b')}
      />
    </div>
  </div>

  <div class="input-container group">
    <div>
      <div class="label">H</div>
      <input
        aria-label="hue chanel color"
        value={h}
        type="number"
        min="0"
        max="360"
        on:input={updateHsv('h')}
      />
    </div>
    <div>
      <div class="label">S</div>
      <input
        aria-label="saturation chanel color"
        value={s}
        type="number"
        min="0"
        max="100"
        on:input={updateHsv('s')}
      />
    </div>
    <div>
      <div class="label">B</div>
      <input
        aria-label="brightness chanel color"
        value={v}
        type="number"
        min="0"
        max="100"
        on:input={updateHsv('v')}
      />
    </div>
  </div>
</div>

<style lang="scss">
  .text-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px 5px 5px;
  }

  .input-container {
    display: flex;
    flex: 1;
    gap: 15px;

    &.group {
      width: 100%;

      & > * {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .label {
        font-weight: bold;

        &::after {
          content: ':';
        }
      }

      & input {
        width: 10px;
      }
    }
  }

  input {
    text-align: center;
    flex: 1;
    height: 30px;
  }
</style>
