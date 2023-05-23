var todoList = [];
var inputVal = "";

var todoListCtrl;
var doneListCtrl;
var inputCtrl;

render();

function render() {
  var $main = document.getElementById("main");
  inputCtrl = Widget.textInput({
    id: "todo-input",
    value: inputVal,
    placeholder: "할일을 입력하세요.",
    onChange: inputOnChangeHandler,
  });
  inputCtrl.render($main);

  var inputBtnCtrl = Widget.button({
    label: "입력",
    onClick: inputBtnOnClickHandler,
  });
  inputBtnCtrl.render($main);

  todoListCtrl = Widget.list({
    datas: todoList.filter(function (data) {
      return !data.done;
    }),
    columns: [createCheckbox, createLabel, createRemoveBtn],
  });
  todoListCtrl.render($main);

  doneListCtrl = Widget.list({
    datas: todoList.filter(function (data) {
      return data.done;
    }),
    columns: [createCheckbox, createLabel, createRemoveBtn],
  });
  doneListCtrl.render($main);
}

function inputOnChangeHandler(e) {
  inputVal = e.target.value;
}

function inputBtnOnClickHandler(e) {
  if (inputVal == "") {
    alert("할일을 입력하세요.");
    return;
  }

  todoList.push({
    key: crypto.randomUUID(),
    contents: inputVal,
    done: false,
  });

  inputVal = "";
  inputCtrl.setValue(inputVal);
  inputCtrl.focus();

  todoListCtrl.setDatas(
    todoList.filter(function (data) {
      return !data.done;
    })
  );
  todoListCtrl.reload();
}

function deleteBtnOnClickHandler(data) {
  todoList.splice(todoList.indexOf(data), 1);
  if (!data.done) {
    todoListCtrl.setDatas(
      todoList.filter(function (data) {
        return !data.done;
      })
    );
    todoListCtrl.reload();
  } else {
    doneListCtrl.setDatas(
      todoList.filter(function (data) {
        return data.done;
      })
    );
    doneListCtrl.reload();
  }
}

function checkboxOnChangeHandler(data) {
  data.done = !data.done;

  todoListCtrl.setDatas(
    todoList.filter(function (data) {
      return !data.done;
    })
  );
  todoListCtrl.reload();
  doneListCtrl.setDatas(
    todoList.filter(function (data) {
      return data.done;
    })
  );
  doneListCtrl.reload();
}

function createRemoveBtn(data) {
  var btnCtrl = Widget.button({
    label: "삭제",
    onClick: deleteBtnOnClickHandler.bind(null, data),
  });

  return btnCtrl;
}

function createLabel(data) {
  var $span = document.createElement("span");
  $span.textContent = data.contents;
  return {
    render: function ($parent) {
      $parent.appendChild($span);
    },
  };
}

function createCheckbox(data) {
  var ckCtrl = Widget.checkbox({
    checked: data.done,
    onChange: checkboxOnChangeHandler.bind(null, data),
  });

  return ckCtrl;
}
