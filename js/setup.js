'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_SIMILAR_WIZARDS = 4;

var wizardForm = document.querySelector('.setup');
var wizardList = wizardForm.querySelector('.setup-similar-list');
var documentFragment = document.createDocumentFragment();
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomItem = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

var getRandomWizard = function () {
  var randomNumber = Math.floor(Math.random() * 2);
  var firstPart = getRandomItem(WIZARD_NAMES);
  var secondPart = getRandomItem(WIZARD_SURNAMES);
  return {'name': [randomNumber ? (firstPart + ' ' + secondPart) : (secondPart + ' ' + firstPart)],
    'coatColor': [getRandomItem(COAT_COLORS)],
    'eyesColor': [getRandomItem(EYES_COLORS)]
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

for (var i = 0; i < NUMBER_OF_SIMILAR_WIZARDS; i++) {
  documentFragment.appendChild(getWizardCard());
}

wizardForm.classList.remove('hidden');
wizardList.appendChild(documentFragment);
wizardForm.querySelector('.setup-similar').classList.remove('hidden');
