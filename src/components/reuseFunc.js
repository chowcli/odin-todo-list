function setHiddenAttr(element, isHidden) {
  element.hidden = isHidden;
}

function checkValidName(txtValue) {
  const regex = /\S/;

  return txtValue !== "" && regex.test(txtValue);
}

export { setHiddenAttr, checkValidName };
