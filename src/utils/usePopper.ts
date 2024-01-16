import { createPopper } from '@popperjs/core';
import type { Instance, Options, StrictModifiers } from '@popperjs/core';

export default function createPopperAction() {
  let popperParams: Partial<Options>;
  let popperTriggerElement: Element | null;
  let popperTooltip: HTMLElement | null;
  let popperInstance: Instance | null;

  function show() {
    if (!popperTriggerElement || !popperTooltip) return;

    popperTooltip.classList.remove('hidden');
    popperTooltip.setAttribute('data-show', '');

    popperInstance = createPopper<StrictModifiers>(
      popperTriggerElement,
      popperTooltip,
      popperParams,
    );
  }

  function hide() {
    if (!popperTriggerElement || !popperTooltip) return;

    popperTooltip.removeAttribute('data-show');
    popperTooltip.classList.add('hidden');

    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  }

  function initializePopper() {
    if (!popperTriggerElement || !popperTooltip) return;

    popperTriggerElement.addEventListener('mouseenter', show);
    popperTriggerElement.addEventListener('mouseleave', hide);
  }

  function destroyPopper() {
    if (!popperInstance) return;

    popperInstance.destroy();
    popperInstance = null;
  }

  function usePopperTrigger(element: HTMLElement) {
    popperTriggerElement = element;
    initializePopper();

    return {
      destroy() {
        popperTriggerElement?.removeEventListener('mouseenter', show);
        popperTriggerElement?.removeEventListener('mouseleave', hide);
        popperTriggerElement = null;
        destroyPopper();
      },
    };
  }

  function usePopperTooltip(element: HTMLElement, params: Partial<Options> = {}) {
    popperTooltip = element;
    popperParams = {
      placement: 'bottom',
      modifiers: [
        { name: 'offset', options: { offset: [0, 15] } },
        { name: 'preventOverflow', options: { mainAxis: true } },
      ],
      ...params,
    };
    initializePopper();

    popperTooltip.classList.add('hidden');

    return {
      update(newParams: Partial<Options>) {
        popperParams = newParams;
        popperInstance?.setOptions(popperParams);
      },
      destroy() {
        popperTooltip = null;
        destroyPopper();
      },
    };
  }

  return [usePopperTrigger, usePopperTooltip];
}
