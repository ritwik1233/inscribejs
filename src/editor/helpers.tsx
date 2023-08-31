export function getParentLineItem(childElement: any) {
  // If the node is a text node, use its parent element
  if (childElement.nodeType === Node.TEXT_NODE) {
    childElement = childElement.parentElement;
  }
  return childElement.closest('div[id^="lineItem-"]');
}

export function getAttributeValue(node: Element, attributeName: string) {
  if (node.nodeType === Node.TEXT_NODE) {
    return "";
  }
  return node.getAttribute(attributeName);
}
export function createTextSelectionRange(
  startContainer: Node,
  startOffset: number,
  endContainer: Node,
  endOffset: number
) {
  const range = document.createRange();

  range.setStart(startContainer, startOffset);
  range.setEnd(endContainer, endOffset);

  return range;
}

export const getFirstTextNode = (elem: any) => {
  let firstChild = elem;
  while (firstChild.nodeType !== 3) firstChild = firstChild.firstChild;

  return firstChild;
};

export const getLastTextNode = (elem: any) => {
  let lastChild = elem;
  while (lastChild.nodeType !== 3) lastChild = lastChild.lastChild;

  return lastChild;
};

export function optimizeChildNodes(parentNode: any) {
  let currentNode = parentNode.firstChild;

  while (currentNode && currentNode.nextSibling) {
    const nextNode = currentNode.nextSibling;

    // If the currentNode and nextNode are both SPANs with the same className
    if (
      currentNode.nodeName === "SPAN" &&
      nextNode.nodeName === "SPAN" &&
      currentNode.className === nextNode.className
    ) {
      // Move all children of the nextNode to currentNode
      while (nextNode.firstChild) {
        currentNode.appendChild(nextNode.firstChild);
      }
      parentNode.removeChild(nextNode);
    } else {
      currentNode = nextNode;
    }
  }

  // Check for SPANs that only contain a single SPAN child
  currentNode = parentNode.firstChild;
  while (currentNode) {
    if (
      currentNode.nodeName === "SPAN" &&
      currentNode.childNodes.length === 1 &&
      currentNode.firstChild.nodeName === "SPAN"
    ) {
      const childSpan = currentNode.firstChild;
      currentNode.className += " " + childSpan.className; // Merge the class names
      while (childSpan.firstChild) {
        currentNode.appendChild(childSpan.firstChild);
      }
      currentNode.removeChild(childSpan);
    }
    currentNode = currentNode.nextSibling;
  }

  // Merge adjacent text nodes
  currentNode = parentNode.firstChild;
  while (currentNode && currentNode.nextSibling) {
    if (
      currentNode.nodeType === Node.TEXT_NODE &&
      currentNode.nextSibling.nodeType === Node.TEXT_NODE
    ) {
      currentNode.nodeValue += currentNode.nextSibling.nodeValue;
      parentNode.removeChild(currentNode.nextSibling);
    } else {
      currentNode = currentNode.nextSibling;
    }
  }

  // Remove empty SPANs and text nodes
  currentNode = parentNode.firstChild;
  while (currentNode) {
    const nextNode = currentNode.nextSibling; // Store reference as currentNode might get deleted

    if (
      (currentNode.nodeName === "SPAN" &&
        (!currentNode.firstChild || !currentNode.textContent.trim())) ||
      (currentNode.nodeType === Node.TEXT_NODE && !currentNode.nodeValue.trim())
    ) {
      parentNode.removeChild(currentNode);
    }
    currentNode = nextNode;
  }

  // Recursively optimize child nodes
  currentNode = parentNode.firstChild;
  while (currentNode) {
    if (currentNode.nodeName === "SPAN") {
      optimizeChildNodes(currentNode);
    }
    currentNode = currentNode.nextSibling;
  }
}
const wrapWithSpan = (
  node: any,
  className: string,
  clickHandlerId?: string
) => {
  const span = document.createElement("span");
  span.className = className;
  span.appendChild(node.cloneNode(true));
  if (clickHandlerId) {
    span.setAttribute("data-clickHandlerId", clickHandlerId);
  }
  return span;
};

export const formatItem = (
  range: any,
  className: string,
  clickHandlerId?: string
) => {
  if (!range.collapsed) {
    const startNode = range.startContainer;
    const endNode = range.endContainer;
    if (startNode === endNode && startNode.nodeType === Node.TEXT_NODE) {
      // Handle partial selection of a single text node
      const span = wrapWithSpan(
        document.createTextNode(range.toString()),
        className,
        clickHandlerId
      );
      range.deleteContents();
      range.insertNode(span);
    } else {
      // Handle multi-node selection
      const fragment = range.cloneContents();
      const nodesToWrap = Array.from(fragment.childNodes);

      nodesToWrap.forEach((node: any, index) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const newNode = wrapWithSpan(node, className, clickHandlerId);
          node.parentNode.replaceChild(newNode, node);
        } else if (node.nodeName === "SPAN") {
          if (!node.classList.contains(className)) {
            Array.from(node.childNodes).forEach((child) => {
              const newNode = wrapWithSpan(child, className, clickHandlerId);
              node.replaceChild(newNode, child);
            });
          }
        }
      });
      range.deleteContents();
      range.insertNode(fragment);
    }
  }
};
