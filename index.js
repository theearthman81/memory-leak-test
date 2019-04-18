let items = [];
let addBtn;
let clearBtn;

function bootApplication() {
  // setup DOM
  addBtn = document.createElement('button');
  addBtn.innerText = 'Add';
  document.body.appendChild(addBtn);

  clearBtn = document.createElement('button');
  clearBtn.innerText = 'Clear';
  document.body.appendChild(clearBtn);

  let content = document.createElement('ul');
  document.body.appendChild(content);

  // create 100 children for item
  let itemTemplate = document.createElement('li');
  for (let i = 0; i < 100; i++) {
    itemTemplate.appendChild(document.createElement('span'));
  }

  // add button listener
  addBtn.addEventListener('click', function(evt) {
    evt.preventDefault();

    let item;
    // create 100 item in the list
    for (let i = 0; i < 100; i++) {
      item = itemTemplate.cloneNode(true);
      item.querySelector('span').innerText = 'item';
      content.appendChild(item);

      // MEMORY LEAK - push DOM item into the 'items' array
      items.push(item);
    }
  });

  // clear button listener
  clearBtn.addEventListener('click', function(evt) {
    evt.preventDefault();

    // remove all items from the list
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }

    // UNCOMMENT TO FIX MEMORY LEAK: by clearing the global 'items' array
    //items = [];
  });
}
