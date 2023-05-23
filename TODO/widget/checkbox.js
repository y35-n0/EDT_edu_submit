export function createCheckbox(option) {
  var $ck = document.createElement("input");
  $ck.type = "checkbox";
  $ck.onchange = option.onChange;

  function load() {
    $ck.checked = option.checked;
  }

  return {
    setChecked: function (checked) {
      option.checked = checked;
    },
    reload: function () {
      load();
    },
    render: function ($parent) {
      load();
      $parent.appendChild($ck);
    },
  };
}
