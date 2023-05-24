import { Staff } from "./staff.js";

export function Chef() {
  this.status = "ready";
}

Chef.prototype = new Staff();

Chef.prototype.workAsync = function (menu) {
  return Chef.prototype._workAsync.call(this, menu.time);
};
