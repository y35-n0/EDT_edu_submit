import Item from "./Item.js";
import ItemButton from "./ItemButton.js";
import CircleList from "./CircleList.js";

(function () {
  function Game() {
    var _self = this;

    this._changeDisabled = function () {
      this._startBtn.disable(_self._isPlaying);
      this._itemBtns.getAll().forEach(function (itemBtn) {
        itemBtn.disable(!_self._isPlaying);
      });
    };

    this.start = function () {
      _self._isPlaying = true;
      _self._changeDisabled();
      _self._itemBtns.disabled;

      _self._timerId = setInterval(function () {
        _self._comItemBtn = _self._itemBtns.getNextByValue(_self._comItemBtn);
        _self.$com.textContent = _self._comItemBtn.item.value;
      }, 100);
    };

    this.putOut = function (e, itemBtn) {
      _self._isPlaying = false;
      clearInterval(_self._timerId);

      _self._changeDisabled();
      if (itemBtn == _self._comItemBtn) {
        alert("비겼습니다");
      } else if (itemBtn == _self._itemBtns.getNextByValue(_self._comItemBtn)) {
        alert("이겼습니다.");
      } else {
        alert("졌습니다.");
      }
    };

    this.render = function () {
      this._itemBtns.getAll().forEach(function (itemBtn) {
        itemBtn.render(_self.$itemContainer);
      });
      this._changeDisabled();
    };

    this.$start = document.getElementById("start");
    this.$itemContainer = document.getElementById("item-container");
    this.$com = document.getElementById("com");

    this._startBtn = new ItemButton(
      new Item("start", "시작"),
      this.start,
      this.$start
    );

    this._items = [
      new Item("scissors", "가위"),
      new Item("rock", "바위"),
      new Item("paper", "보"),
    ];

    this._itemBtns = new CircleList(
      this._items.map(function (item) {
        return new ItemButton(item, _self.putOut);
      })
    );

    this._timerId = null;

    this._comItemBtn = this._itemBtns.getByIndex(0);

    this._isPlaying = false;
  }

  var game = new Game();
  game.render();
})();
