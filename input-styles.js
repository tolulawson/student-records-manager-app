const setSelectListText = function(event) {
  if(event.target.className === 'select-item') {
    event.target.closest('.text-box').classList.remove('error');
    for (let i = 0; i<event.target.parentElement.children.length; i++) {
      event.target.parentElement.children.item(i).innerHTML = event.target.parentElement.children.item(i).innerHTML.replace(/(<([^>]+)>)/ig,'');
    }
    if(event.target.parentElement.classList.contains('dropdown')) {
      event.target.closest('.text-box').getElementsByTagName('input')[0].removeAttribute('readonly');
    }
    event.target.closest('.text-box').getElementsByTagName('input')[0].value = event.target.innerHTML.replace(/(<([^>]+)>)/ig,'');

    if(event.target.parentElement.classList.contains('dropdown')) {
      setTimeout(event.target.closest('.text-box').getElementsByTagName('input')[0].setAttribute('readonly', 'readonly'),50);
    }
  }
}

const showSelectList = function (event) {
  if(event.target.parentElement.classList.contains('autocomplete')) {
    event.target.parentElement.getElementsByClassName('select-list')[0].style.visibility = 'visible';
  }
}

const hideSelectList = function (event) {
  if(event.target.parentElement.classList.contains('autocomplete')) {
    function hide() {
      event.target.parentElement.getElementsByClassName('select-list')[0].style.visibility = 'hidden';
    }
    setTimeout(hide, 110);
  }
}

const highlightTyped = function(event) {

  if(event.target.parentElement.classList.contains('autocomplete')) {
      let collection = event.target.parentElement.lastElementChild.firstElementChild.children;
      for (let i = 0; i < collection.length; i++) {


        let regex = new RegExp(event.target.value,'i');
        event.target.parentElement.querySelectorAll('.select-item')[i].innerHTML = collection[i].textContent.replace(regex, `<span class="autocomplete-highlight">$&</span>`);


          document.querySelectorAll('.select-item')[i].style.display = 'block';
          if (!regex.test(document.querySelectorAll('.select-item')[i].innerHTML)) {
            document.querySelectorAll('.select-item')[i].style.display = 'none';

        }
      }
  }
}

for (let i = 0; i < document.querySelectorAll('.select-item').length; i++) {
  document.querySelectorAll('.select-item')[i].addEventListener('click',setSelectListText);
}

for (let i = 0; i < document.querySelectorAll('.autocomplete').length; i++) {
  document.querySelectorAll('.autocomplete')[i].children[1].addEventListener('focus',showSelectList);
  document.querySelectorAll('.autocomplete')[i].children[1].addEventListener('blur',hideSelectList);
  document.querySelectorAll('.autocomplete')[i].children[1].addEventListener('keyup',highlightTyped);
}

document.addEventListener('click', function(event) {
  if (event.target != document.activeElement && !event.target.classList.contains('text-box-inner-button'))
  document.activeElement.blur()});

const increaseOrDecreaseValue = function(event) {
  event.target.parentElement.querySelector('.text-box-input').focus();
  if (event.target.classList.contains('right')) {
      if (!isNaN(event.target.parentElement.querySelector('.text-box-input').value))
      event.target.parentElement.querySelector('.text-box-input').value = (+event.target.parentElement.querySelector('.text-box-input').value + 1);
  }

  if (event.target.classList.contains('left')) {
      if (+event.target.parentElement.querySelector('.text-box-input').value > 0) {
      event.target.parentElement.querySelector('.text-box-input').value = (+event.target.parentElement.querySelector('.text-box-input').value - 1);
    }
  }
}


for (let i = 0; i < document.querySelectorAll('.text-box-inner-button').length; i++) {
  document.querySelectorAll('.text-box-inner-button')[i].addEventListener('click',increaseOrDecreaseValue);
}

const closeModal = function(event) {
  if (event.target.classList.contains('modal-close-button') || event.target.classList.contains('modal-container')) {
  event.target.closest('.modal-container').classList.remove('modal-reveal');
    event.target.closest('.modal-container').classList.add('modal-close');
  }
}

const closeModalEx = function (event) {
  event.target.closest('.modal-container').classList.remove('modal-reveal');
    event.target.closest('.modal-container').classList.add('modal-close');
}

const removeCloseModal = function(event) {
  for (let i = 0; i < document.querySelectorAll('.modal-container').length; i++) {
    document.querySelectorAll('.modal-container')[i].classList.remove('modal-close');
  }
}

for (let i = 0; i < document.querySelectorAll('.show-modal').length; i++) {
  document.querySelectorAll('.show-modal')[i].addEventListener('click', removeCloseModal);
}

for (let i = 0; i < document.querySelectorAll('.modal-close-button').length; i++) {
  document.querySelectorAll('.modal-close-button')[i].addEventListener('click', closeModal);
  document.querySelectorAll('.modal-container')[i].addEventListener('click', closeModal);
}

const checkEmptyField = function (element) {
  return element.value.trim().length <= 0 &&  element.parentElement.classList.contains('validate');
}

const checkUnemptyField = function (element) {
  return element.value.trim().length > 0 && element.parentElement.classList.contains('validate');
}

const checkNotNumberField = function (element) {
  return (element.value.length <= 0 ||isNaN(+element.value)) && element.parentElement.classList.contains('validate-number');
}

const checkIsNumberField = function (element) {
  return (element.value.length > 0 && !isNaN(+element.value)) && element.parentElement.classList.contains('validate-number');
}

const validateField = function (event) {
  let fields = event.target.querySelectorAll('.text-box-input');
  for (let i = 0; i < fields.length; i++) {
    if (checkEmptyField(fields[i])) {
      event.preventDefault();
      event.stopImmediatePropagation();
      fields[i].closest('.text-box').classList.add('error');
    }

    if (checkNotNumberField(fields[i])) {
      event.preventDefault();
      event.stopImmediatePropagation();
      fields[i].closest('.text-box').classList.add('error');
    }
  }
}

const removeError = function(event) {
  if(checkUnemptyField(event.target)) {
    event.target.parentElement.classList.remove('error');
  }

  if(checkIsNumberField(event.target)) {
    event.target.parentElement.classList.remove('error');
  }
}

for (let i = 0; i < document.querySelectorAll('form').length; i++) {
  document.querySelectorAll('form')[i].addEventListener('submit', validateField);
}

for (let i = 0; i < document.querySelectorAll('.text-box-input').length; i++) {
  document.querySelectorAll('.text-box-input')[i].oninput =removeError;
}
