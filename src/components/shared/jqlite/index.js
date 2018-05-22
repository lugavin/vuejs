const children = (element) => {
  const childNodes = [];
  for (let i = 0; i < element.childNodes.length; i += 1) {
    if (element.childNodes[i].nodeType === Node.ELEMENT_NODE) {
      childNodes.push(element.childNodes[i]);
    }
  }
  return childNodes;
};

export default { children };
