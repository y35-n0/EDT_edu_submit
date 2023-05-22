export default function CircleList(arr) {
  this.arr = arr;
}

CircleList.prototype.getByIndex = function (index) {
  return this.arr[index];
};

CircleList.prototype.getAll = function () {
  return this.arr;
};

CircleList.prototype.getNextByValue = function (value) {
  var index = this.arr.indexOf(value);
  return this.arr[index + 1] ? this.arr[index + 1] : this.arr[0];
};
