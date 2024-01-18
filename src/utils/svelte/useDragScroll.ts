const draggingClassName = 'is-being-dragged';

export const dragScroll = (element: HTMLElement) => {
  let mouseDown = false;
  let startX: number;
  let scrollLeft: number;
  let startY: number;
  let scrollTop: number;

  const startDragging = (e: MouseEvent) => {
    mouseDown = true;
    element.classList.add(draggingClassName);

    startX = e.pageX - element.offsetLeft;
    startY = e.pageY - element.offsetTop;
    scrollTop = element?.scrollTop;
    scrollLeft = element?.scrollLeft;
  };

  const stopDragging = () => {
    element.classList.remove(draggingClassName);
    mouseDown = false;
  };

  const move = (e: MouseEvent) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - element.offsetLeft;
    const y = e.pageY - element.offsetTop;
    const scrollX = x - startX;
    const scrollY = y - startY;
    element.scrollLeft = scrollLeft - scrollX;
    element.scrollTop = scrollTop - scrollY;
  };

  // Add the event listeners
  element.addEventListener('mousemove', move, false);
  element.addEventListener('mousedown', startDragging, false);
  element.addEventListener('mouseup', stopDragging, false);
  element.addEventListener('mouseleave', stopDragging, false);
};
