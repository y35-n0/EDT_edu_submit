export function createList(option) {
  var $list = document.createElement("ul");
  $list.style.listStyle = "none";
  $list.style.padding = "0";

  function load() {
    $list.innerHTML = "";
    option.datas.forEach(function (data) {
      var $li = document.createElement("li");
      option.columns.map(function (column) {
        var ctrl = column(data);
        ctrl.render($li);
      });
      $list.appendChild($li);
    });
  }
  return {
    key: option.key,
    setDatas: function (datas) {
      option.datas = datas;
    },
    reload: function () {
      load();
    },
    render: function ($parent) {
      load();
      $parent.appendChild($list);
    },
  };
}
