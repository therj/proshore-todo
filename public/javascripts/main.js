const URL = '/todos/';
const ul = document.querySelector('ul.nav');
const theList = document.querySelector('#the-list');
// let response;
let allItems;
let currentList;
let currentItems;
let currentView = 'all';
ul.addEventListener('click', function(e) {
  for (let i = 0; i < ul.childElementCount; i++) {
    let anchor = ul.children[i].children[0];
    anchor.classList.remove('active');
  }
  e.target.classList.add('active');
  // console.log(e.target.classList);
  // console.log(ul);
  // console.log(e.target.parentElement.id);
});

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];

    if (typeof x == 'string') {
      x = ('' + x).toLowerCase();
    }
    if (typeof y == 'string') {
      y = ('' + y).toLowerCase();
    }

    return x < y ? -1 : x > y ? 1 : 0;
  });
}

const todoList = (URL = URL) => {
  fetch(URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return [{ status: 'error', message: 'Unable to fetch data!' }];
      }
    })
    .then((res) => {
      allItems = sortByKey(res.data.todos, 'date');
      // console.log(allItems);
      if (currentView === 'up') {
        loadUpcoming();
      } else if (currentView === 'completed') {
        loadCompleted();
      } else {
        loadAll();
      }
    });
};

function createList(todos) {
  // todos = sortTodosByDate(todos);
  ulNew = document.createElement('ul');
  for (const todo of todos) {
    // console.log(todo);
    li = document.createElement('li');
    li.id = todo.id;
    li.classList = 'list-group-item';
    past = new Date(todo.date * 1000) < new Date();
    // console.log();

    if (todo.done) {
      li.classList.add('completed');
    } else {
      li.classList.add('not-completed');
      if (past) {
        li.classList.add('late');
      }
    }

    // now = Math.round(Number(Date.now()) / 1000);
    // todo.date = new Date(todo.date);
    let doneClass;
    let doneText;

    if (todo.done) {
      doneText = 'Undo';
      doneClass = 'completed';
    } else {
      doneText = 'Mark as Done';
      doneClass = 'notcompleted';
    }
    // console.log(todo);

    for (const key in todo) {
      span = document.createElement('span');
      span.classList = key;
      if (key === 'date') {
        // span.innerText = new Date(todo.date * 1000);
        span.innerText = moment(todo.date * 1000).format('LLLL');
      } else if (key === 'done') {
        span.innerText = doneText;
        span.classList.add(doneClass);
      } else {
        span.innerText = todo[key];
      }
      li.appendChild(span);
    }
    delMe = document.createElement('span');
    delMe.classList = 'delete';
    // delMe.id = todo.id;
    delMe.innerText = 'Delete This';
    li.appendChild(delMe);

    ulNew.appendChild(li);
  }

  return ulNew;
  // currentList = ulNew;
  // theList.appendChild(currentList);
  // setListListeners();

  // console.log(currentList);
  // console.log(someObjects);
  // return;
}
const loader = function() {
  todoList(URL);
};

document.onload = loader();

// let notDone = document.getElementsByClassName('notdone');
// let done = document.getElementsByClassName('done');

// for (let index = 0; index < done.childElementCount; index++) {
//   done[index].addEventListener('click', function(e) {
//     console.log(e);
//   });
// }

const up = document.querySelector('#up');
up.addEventListener('click', loadUpcoming);

function loadUpcoming(e) {
  let now = new Date() / 1000;
  currentItems = allItems.filter(function(item) {
    console.log(item.done);
    return item.date > now && !item.done;
  });
  currentList = createList(currentItems);
  theList.innerHTML = '';
  theList.appendChild(currentList);
  currentView = 'up';
  setListListeners();
}

const all = document.querySelector('#all');
all.addEventListener('click', loadAll);

function loadAll() {
  currentView = 'all';
  currentList = createList(allItems);
  theList.innerHTML = '';
  theList.appendChild(currentList);
  setListListeners();
}
const complete = document.querySelector('#complete');
complete.addEventListener('click', loadCompleted);

function loadCompleted(e) {
  currentView = 'completed';
  currentItems = allItems.filter(function(item) {
    return item.done;
  });
  currentList = createList(currentItems);
  theList.innerHTML = '';
  theList.appendChild(currentList);
  setListListeners();
}

// Form picker

const formSubmit = document.querySelector('.form-in-modal');
formSubmit.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const short_description = e.target.short_description.value;
  const date = Math.round(Number(new Date(e.target.date.value)) / 1000);
  //debug date validation error
  console.log(date)
  // var url = 'https://example.com/profile';
  let data = { name, short_description, date };
  let now = Number(new Date() / 1000);
  if (!data.name || !data.short_description || !data.date || data.date < now) {
    let message;
    if (!data.name) {
      message = 'Enter Todo Name';
    } else if (!data.short_description) {
      message = 'Enter a short description.';
    } else if (!data.date) {
      message = 'Enter a valid date.';
    } else if (data.date < now) {
      message = 'Wooho.. Enter a future date!';
    }
    alertMessage('alert-warning', message);
  } else {
    fetch(URL, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status == 'success') {
          alertMessage('alert-success', 'Successfully Added to List');
          console.log(e.target.name.value);
          e.target.name.value = '';
          e.target.short_description.value = '';
          e.target.date.value = '';
          loader();
        } else alertMessage('alert-danger', 'Failed to add this Todo!');
      })
      .catch((error) => console.error('Error:', error));
  }
});

function alertMessage(state, message) {
  let alertItem = document.querySelector('.alert.form-alert ');
  alertItem.classList.remove('hide-message');
  alertItem.classList.add(state);
  alertItem.innerText = message;
  x = setTimeout(() => {
    alertItem.classList.add('hide-message');
    alertItem.classList.remove(state);
    clearTimeout(x);
  }, 3000);
  return;
}

const deleteTodo = (id) => {
  fetch(`${URL}/${id}`, {
    method: 'delete'
  }).then((res) =>
    res.json().then((json) => {
      console.log('DELETED!', res);
      loader();
      return json;
    })
  );
};

const markTodo = (todo) => {
  fetch(URL + '/' + todo.id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: todo.name,
      short_description: todo.short_description,
      date: todo.date,
      done: !todo.done
    })
  }).then((res) => {
    loader();
    // console.log('Marked Done!', res);
    // return json;
  });
};
function setListListeners() {
  let delElements = document.querySelectorAll('.delete');
  let markElements = document.querySelectorAll('.done');

  for (var i = 0; i < delElements.length; i++) {
    delElements[i].addEventListener('click', function() {
      deleteTodo(this.parentNode.id);
    });
  }
  for (var i = 0; i < markElements.length; i++) {
    markElements[i].addEventListener('click', function() {
      let todo = {};
      for (let index = 0; index < this.parentNode.childElementCount; index++) {
        // const element = array[index];
        let prop = this.parentNode.children[index].classList[0];
        let val = this.parentNode.children[index].innerText;
        todo[prop] = val;
      }
      todo.date = Math.round(Number(new Date(todo.date)) / 1000);
      todo.done = todo.done === 'Undo' ? true : false;
      // console.log(todo);
      markTodo(todo);

      // console.log(this.parentNode.children);

      // markTodo(this.parentNode.id);
    });
  }
}
