/**
 * jQuery-style event delegation
 * https://youmightnotneedjquery.com/#on
 */
export const addDelegateEventListener = (
  wrapperEl: HTMLElement,
  eventName: keyof HTMLElementEventMap,
  eventHandler: (event: Event) => void,
  selector: string,
) => {
  if (selector) {
    const wrappedHandler = (e: Event) => {
      if (!e.target) return;

      const triggeredEl = (e.target as HTMLElement).closest(selector);

      if (triggeredEl) {
        eventHandler.call(triggeredEl, e);
      }
    };

    wrapperEl.addEventListener(eventName, wrappedHandler);

    return wrappedHandler;
  } else {
    const wrappedHandler = (e: Event) => {
      eventHandler.call(wrapperEl, e);
    };

    wrapperEl.addEventListener(eventName, wrappedHandler);

    return wrappedHandler;
  }
};
