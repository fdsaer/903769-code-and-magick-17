'use strict';

(function () {

  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_OF_SIMILAR_WIZARDS = 4;

  var wizardForm = document.querySelector('.setup');
  var wizardList = wizardForm.querySelector('.setup-similar-list');
  var documentFragment = document.createDocumentFragment();
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardsCoat = wizardForm.querySelector('.setup-wizard .wizard-coat');
  var wizardsEyes = wizardForm.querySelector('.setup-wizard .wizard-eyes');
  var wizardsFireBall = wizardForm.querySelector('.setup-fireball-wrap');
  var wizardCoatColorFormField = wizardForm.querySelector('input[name=coat-color]');
  var wizardEyesColorFormField = wizardForm.querySelector('input[name=eyes-color]');
  var wizardFireBallColorFormField = wizardForm.querySelector('input[name=fireball-color]');
  var currentWizardColorIndexes = {
    coatColorIndex: 0,
    eyesColorIndex: 0,
    fireballColorIndex: 0
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

  var getNextIndex = function (arr, item) {
    return (item === arr.length - 1) ? 0 : item + 1;
  };

  var setElementColor = function (name, source, destination, type, field) {
    var colorIndex;
    colorIndex = getNextIndex(source, currentWizardColorIndexes[name]);
    destination.style[type] = source[colorIndex];
    currentWizardColorIndexes[name] = colorIndex;
    field.value = source[colorIndex];
  };

  wizardsCoat.addEventListener('click', function () {
    setElementColor('coatColorIndex', COAT_COLORS, wizardsCoat, 'fill', wizardCoatColorFormField);
  });

  wizardsEyes.addEventListener('click', function () {
    setElementColor('eyesColorIndex', EYES_COLORS, wizardsEyes, 'fill', wizardEyesColorFormField);
  });

  wizardsFireBall.addEventListener('click', function () {
    setElementColor('fireballColorIndex', FIREBALL_COLORS, wizardsFireBall, 'backgroundColor', wizardFireBallColorFormField);
  });

  for (var i = 0; i < NUMBER_OF_SIMILAR_WIZARDS; i++) {
    documentFragment.appendChild(getWizardCard());
  }

  wizardList.appendChild(documentFragment);
  wizardForm.querySelector('.setup-similar').classList.remove('hidden');
})();
