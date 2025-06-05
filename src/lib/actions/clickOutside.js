/**
 * Click outside action
 * Dispatches an event when clicking outside the element
 * 
 * Usage:
 * <div use:clickOutside on:click_outside={handleClickOutside}>
 *   Content
 * </div>
 */
export function clickOutside(node) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', { detail: event })
      );
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}