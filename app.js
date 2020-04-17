const deleteButton = (function() {
  let temp = document.createElement('div');
  temp.innerHTML = '<button type="button" name="button" class="delete-button"></button>';
  return temp.firstElementChild;
})();

const bodyRow = function() {
  let temp = document.createElement('div');
  temp.innerHTML = ''
}

const deleteRow = function(event) {
  if (event.target.className == 'delete-button')
  event.target.parentElement.remove();
}

document.querySelector('.ads-table').addEventListener('click',deleteRow);

const showModal = function(event) {
  document.querySelector('.modal-container').classList.add('modal-reveal');
}

document.querySelector('.add-button').addEventListener('click', showModal);

const priorityColors = {
  '100' : 'orange',
  '200' : 'blue',
  '300' : 'green',
  '400' : 'red'
};

const setRowColors =function() {
  for (let i = 0; i < document.querySelectorAll('.ads-table > .body').length; i++) {

    document.querySelectorAll('.ads-table > .body')[i].classList.add(priorityColors[document.querySelectorAll('.ads-table > .body')[i].querySelector('.col-3').textContent.trim()])
  }
}

setRowColors();
// document.addEventListener('load', setRowColors);

const createAd = function(event) {
  event.preventDefault();
  let newRow = (() => {
    let temp = document.createElement('template');
    temp.innerHTML = `<div class="ad-row body ${priorityColors[document.querySelector('#ad-priority').value]}">
      <div class="ad-row-edge">

      </div>
      <div class="col-1">
        ${document.querySelector('#ad-name').value}
      </div>
      <div class="col-2">
        ${document.querySelector('#ad-clicks').value}
      </div>
      <div class="col-3">
        ${document.querySelector('#ad-priority').value}
      </div>
      <div class="col-4">
        ${document.querySelector('#ad-impressions').value}
      </div>
      <button type="button" name="button" class="delete-button"></button>

    </div>`.trim();
    return temp.content.firstElementChild;
  })();

  document.querySelector('.ads-table').appendChild(newRow);

  closeModalEx(event);
  event.target.reset();
}

const resetFormOnModalClose = function(event) {
  if (event.target.classList.contains('modal-close-button'))
  {
    event.target.closest('.modal').querySelector('form').reset();
    for (let i = 0; i < event.target.closest('.modal').querySelectorAll('.text-box').length; i++) {
      event.target.closest('.modal').querySelectorAll('.text-box')[i].classList.remove('error');
    }
  }

  // if (event.target.classList.contains('modal-container'))  {
  //   event.target.querySelector('.modal > form').reset();
  //   for (let i = 0; i < event.target.querySelectorAll('.text-box').length; i++) {
  //     event.target.querySelectorAll('.text-box')[i].classList.remove('error');
  //   }
  // }

}

for (let i = 0; i < document.querySelectorAll('.modal-close-button').length; i++) {
  document.querySelectorAll('.modal-close-button')[i].addEventListener('click', resetFormOnModalClose);

  document.querySelectorAll('.modal-container')[i].addEventListener('click', resetFormOnModalClose);
}

const searchFunction = function (term) {
  let rows = document.querySelectorAll('.body');
  rows.forEach((row) => {
    // row.style.display = 'none';
    let textContents = [];
    for (let i = 1; i < row.children.length-1; i++) {
      textContents.push(row.children[i].textContent.trim());
    }
    if (textContents.some((text) => {
      let regex = new RegExp(term.trim(), 'i');
      return regex.test(text);
    })) {
    row.style.display = 'flex';
    }
  });
}

const search = function (event, term) {
  let rows = document.querySelectorAll('.body');
  rows.forEach((row) => {
    row.style.display = 'none';
    let textContents = [];
    for (let i = 1; i < row.children.length-1; i++) {
      textContents.push(row.children[i].textContent.trim());
    }
    if (textContents.some((text) => {
      let regex = new RegExp(event.target.value.trim(), 'i');
      return regex.test(text);
    })) {
    row.style.display = 'flex';
    }
  });

}

// document.querySelector('.button-notification').textContent = Object.values(priorityColors).length;

// console.log(priorityColors.values);

document.querySelector('.search > .text-box-input').addEventListener('keyup', search);


const showFilter = function(event) {

  console.log(!document.querySelector('.filter-dropdown').classList.contains('filter-open'));
  if (!document.querySelector('.filter-dropdown').classList.contains('filter-open')) {
    document.querySelector('.filter-dropdown').classList.add('filter-open');
    event.target.style.backgroundImage = 'url(input-style-assets/arrow-point-up.svg)';
  }
  else {
    document.querySelector('.filter-dropdown').classList.remove('filter-open');
    event.target.style.backgroundImage = 'url(input-style-assets/arrow-point-to-down.svg)';
  }
}

document.querySelector('.filter').onclick = showFilter;

const populateFilter = function() {
  let contentList = [];
  let temp = document.querySelectorAll('.col-3');
  for (let i = 1; i < temp.length; i++) {
    if(!contentList.includes(temp[i].textContent.trim())) {
      contentList.push(temp[i].textContent.trim());
    }
  }
  contentList.sort((a,b) => {
    return +a - +b;
  });
  for (let item of contentList) {
    let filterItem = document.createElement('div');
    filterItem.innerHTML = `<label for="${item}" class="filter-label">
      <input type="checkbox" name="${item}" value="" id="${item}"><span class="filter-checkbox"></span>${item}
    </label>`

    document.querySelector('.filter-dropdown').appendChild(filterItem.firstElementChild);
  }

}

populateFilter();

const filterRows = function(event) {
  if (!event.target.parentElement.classList.contains('checked')) {
    event.target.parentElement.classList.add('checked');
  }

  else {
    event.target.parentElement.classList.remove('checked');
  }

  let rows = document.querySelectorAll('.body');
  rows.forEach((row) => {
    row.style.display = 'none';});
  for (let i = 0; i < document.querySelectorAll('.filter-label > input[type=checkbox]:checked').length; i++) {
    searchFunction(document.querySelectorAll('.filter-label.checked')[i].textContent.trim());
  }

  if (document.querySelectorAll('.checked').length <= 0) {
    rows.forEach((row) => {
      row.style.display = 'flex';});
  }
   if (document.querySelectorAll('.checked').length > 0) {
      document.querySelector('.button-notification').textContent = document.querySelectorAll('.checked').length;
   }
   else {
     document.querySelector('.button-notification').textContent = '';
   }

}

for (let i = 0; i < document.querySelectorAll('.filter-label > input[type=checkbox]').length; i++) {
    document.querySelectorAll('.filter-label > input[type=checkbox]')[i].addEventListener('click', filterRows);
}

document.querySelector('form').addEventListener('submit', createAd);
