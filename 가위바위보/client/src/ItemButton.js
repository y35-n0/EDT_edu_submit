export default function ItemButton(item, onClick, element) {
  this.item = item;
  this.$btn = element ? element : document.createElement("button");
  this.$btn.textContent = this.item.value;

  var _self = this;
  this.$btn.onclick = function (e) {
    onClick(e, _self);
  };
}

ItemButton.prototype.render = function ($parent) {
  $parent.appendChild(this.$btn);
};

ItemButton.prototype.disable = function (flag) {
  if (flag) {
    this.$btn.setAttribute("disabled", true);
  } else {
    this.$btn.removeAttribute("disabled");
  }
};
