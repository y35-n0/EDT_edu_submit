import { createButton } from "./button";
import { createCheckbox } from "./checkbox";
import { createTextInput } from "./input";
import { createList } from "./list";

window.Widget = {
  textInput: createTextInput,
  button: createButton,
  list: createList,
  checkbox: createCheckbox,
};
