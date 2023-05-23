export function createTextInput(option) {
  var $el = document.createElement("input");
  $el.type = "text";
  $el.id = option.id;
  $el.value = option.value;
  $el.placeholder = option.placeholder;
  $el.onchange = option.onChange;

  return {
    render: function ($parent) {
      $parent.appendChild($el);
    },
    getValue: function () {
      return $el.value;
    },
    setValue: function (value) {
      $el.value = value;
    },
    focus: function () {
      $el.focus();
    },
  };
}
