export function Staff() {
  this.status = "ready";
}

Staff.prototype.isAvailable = function () {
  return this.status == "ready";
};

Staff.prototype.setup = function () {
  if (this.status == "ready") {
    this.status = "setup";
    return true;
  } else {
    return false;
  }
};

Staff.prototype._workAsync = function (time) {
  return new Promise(
    function (resolve, reject) {
      this.status = "working";
      setTimeout(
        function () {
          this.status = "ready";
          resolve();
        }.bind(this),
        time
      );
    }.bind(this)
  );
};
