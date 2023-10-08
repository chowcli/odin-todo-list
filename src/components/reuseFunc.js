import { v4 as uuidv4 } from "uuid";
import { SHA256 } from "crypto-js";

function shortenUUID() {
  const uuid = uuidv4();
  const shortenHash = SHA256(uuid).toString().substring(0, 5);

  return shortenHash;
}

function setHiddenAttr(element, isHidden) {
  element.hidden = isHidden;
}

function checkValidName(txtValue) {
  const regex = /\S/;

  return txtValue !== "" && regex.test(txtValue);
}

function clearInputField() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
    if (input.type === "radio" && input.checked) {
      input.checked = false;
    }
    input.value = "";
  });
}
export { setHiddenAttr, checkValidName, shortenUUID, clearInputField };
