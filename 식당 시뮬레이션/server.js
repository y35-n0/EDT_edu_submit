import { Staff } from "./staff.js";

export function Server(time) {
  this.time = time;
  this.status = "ready";
}

Server.prototype = new Staff();

Server.prototype.workAsync = function () {
  return Server.prototype._workAsync.call(this, this.time);
};
