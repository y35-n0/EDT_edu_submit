import { Chef } from "./chef.js";
import { Menu } from "./menu.js";
import { Server } from "./server.js";

var orderNum = 0;

var lists = {
  orders: [],
  cookings: [],
  waitings: [],
  servings: [],
};

var waitingNum = {
  chef: 0,
  server: 0,
};

var staffs = {
  chef: [new Chef(), new Chef()],
  server: [new Server(1000), new Server(2000)],
};

document.getElementById("sundea").onclick = function () {
  run(new Menu("순댓국", 1000, orderNum++));
};
document.getElementById("heajang").onclick = function () {
  run(new Menu("해장국", 2000, orderNum++));
};

function run(menu) {
  order(menu);

  findStaffAsync("chef", menu)
    .then(function (chef) {
      return workAsync(chef, menu, "orders", "cookings");
    })
    .then(function () {
      wait(menu);
      return findStaffAsync("server", menu);
    })
    .then(function (server) {
      return workAsync(server, menu, "waitings", "servings");
    })
    .then(function () {
      done(menu);
    });
}

function order(menu) {
  addMenu(menu, "orders");
}

function wait(menu) {
  removeMenu(menu, "cookings");
  addMenu(menu, "waitings");
}

function done(menu) {
  removeMenu(menu, "servings");
}

function findStaffAsync(type, menu) {
  return new Promise(function (resolve, reject) {
    var timerId = setInterval(function () {
      if (menu.orderNum != waitingNum[type]) return;
      var staff = staffs[type].find(function (staff) {
        return staff.isAvailable();
      });
      if (staff) {
        clearInterval(timerId);
        waitingNum[type]++;
        resolve(staff);
      }
    }, 100);
  });
}

function workAsync(staff, menu, listIdToRemove, listIdToAdd) {
  removeMenu(menu, listIdToRemove);
  addMenu(menu, listIdToAdd);
  return staff.workAsync(menu);
}

function addMenu(menu, listId) {
  lists[listId].push(menu);
  renderList(listId);
}

function removeMenu(menu, listId) {
  lists[listId].splice(lists[listId].indexOf(menu), 1);
  renderList(listId);
}

function renderList(listId) {
  var $list = document.getElementById(listId);
  $list.innerHTML = "";

  lists[listId].forEach(function (menu) {
    var $li = document.createElement("li");
    $li.textContent = menu.orderNum + " " + menu.name;

    $list.appendChild($li);
  });
}
