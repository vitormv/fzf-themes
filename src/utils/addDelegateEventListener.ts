/**
 * jQuery-style event delegation
 * https://youmightnotneedjquery.com/#on
 */
export const addDelegateEventListener = (
  el: HTMLElement,
  eventName: keyof HTMLElementEventMap,
  eventHandler: (event: Event) => void,
  selector: string,
) => {
  if (selector) {
    const wrappedHandler = (e: Event) => {
      if (!e.target) return;
      const el = (e.target as HTMLElement).closest(selector);
      if (el) {
        eventHandler.call(el, e);
      }
    };
    el.addEventListener(eventName, wrappedHandler);
    return wrappedHandler;
  } else {
    const wrappedHandler = (e: Event) => {
      eventHandler.call(el, e);
    };
    el.addEventListener(eventName, wrappedHandler);
    return wrappedHandler;
  }
};
