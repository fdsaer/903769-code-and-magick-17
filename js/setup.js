'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_SIMILAR_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizardForm = document.querySelector('.setup');
var wizardList = wizardForm.querySelector('.setup-similar-list');
var wizardFormOpener = document.querySelector('.setup-open');
var wizardFormShutter = wizardForm.querySelector('.setup-close');
var documentFragment = document.createDocumentFragment();
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardNameInput = wizardForm.querySelector('.setup-user-name');
var wizardsCoat = wizardForm.querySelector('.setup-wizard .wizard-coat');
var wizardsEyes = wizardForm.querySelector('.setup-wizard .wizard-eyes');
var wizardsFireBall = wizardForm.querySelector('.setup-fireball-wrap');
var wizardCoatColorFormField = wizardForm.querySelector('input[name=coat-color]');
var wizardEyesColorFormField = wizardForm.querySelector('input[name=eyes-color]');
var wizardFireBallColorFormField = wizardForm.querySelector('input[name=fireball-color]');

var currentWizardProperties = {
  coatColor: {
    color: wizardsCoat.style.fill,
    index: ''
  },
  eyesColor: {
    color: wizardsEyes.style.fill ? wizardsEyes.style.fill : 'black',
    index: ''
  },
  fireballColor: {
    color: wizardsFireBall.style.backgroundColor ? wizardsFireBall.style.backgroundColor : '#ee4830',
    index: ''
  },
};

var getRandomItem = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

var getRandomWizard = function () {
  var randomNumber = Math.floor(Math.random() * 2);
  var firstPart = getRandomItem(WIZARD_NAMES);
  var secondPart = getRandomItem(WIZARD_SURNAMES);
  return {
    'name': randomNumber ? (firstPart + ' ' + secondPart) : (secondPart + ' ' + firstPart),
    'coatColor': getRandomItem(COAT_COLORS),
    'eyesColor': getRandomItem(EYES_COLORS)
  };
};

var getWizardCard = function () {
  var wizard = getRandomWizard();
  var wizardCard = wizardTemplate.cloneNode(true);
  wizardCard.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardCard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardCard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardCard;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== wizardNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  wizardForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  wizardForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var getCurrentIndex = function (arr, item) {
  var index;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      index = i;
    }
  }
  if (index === undefined) {
    index = arr.length;
  }
  return index;
};

var getNextIndex = function (arr, item) {
  var next;
  if (item === arr.length - 1) {
    next = 0;
  } else {
    next = item + 1;
  }
  return next;
};

var putColor = function (property, sourse, destination, type, field) {
  var colorIndex;
  if (property.index !== '') {
    colorIndex = getNextIndex(sourse, property.index);
  } else {
    colorIndex = getNextIndex(sourse, getCurrentIndex(sourse, property.color));
  }
  destination.style[type] = sourse[colorIndex];
  property.color = destination.style.type;
  property.index = colorIndex;
  field.value = sourse[colorIndex];
};

for (var i = 0; i < NUMBER_OF_SIMILAR_WIZARDS; i++) {
  documentFragment.appendChild(getWizardCard());
}

wizardList.appendChild(documentFragment);
wizardForm.querySelector('.setup-similar').classList.remove('hidden');

wizardFormOpener.addEventListener('click', function () {
  openPopup();
});

wizardFormOpener.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

wizardFormShutter.addEventListener('click', function () {
  closePopup();
});

wizardFormShutter.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardNameInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
  }
});

wizardsCoat.addEventListener('click', function () {
  putColor(currentWizardProperties.coatColor, COAT_COLORS, wizardsCoat, 'fill', wizardCoatColorFormField);
});

wizardsEyes.addEventListener('click', function () {
  putColor(currentWizardProperties.eyesColor, EYES_COLORS, wizardsEyes, 'fill', wizardEyesColorFormField);
});

wizardsFireBall.addEventListener('click', function () {
  putColor(currentWizardProperties.fireballColor, FIREBALL_COLORS, wizardsFireBall, 'backgroundColor', wizardFireBallColorFormField);
});
