'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_OF_SIMILAR_WIZARDS = 4;

  var wizardSetup = document.querySelector('.setup');
  var wizardForm = wizardSetup.querySelector('form');
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

  var getWizardCard = function (wizard) {
    var wizardCard = wizardTemplate.cloneNode(true);
    wizardCard.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardCard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardCard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardCard;
  };

  var successHandler = function (wizards) {
    for (var i = 0; i < NUMBER_OF_SIMILAR_WIZARDS; i++) {
      documentFragment.appendChild(getWizardCard(getRandomItem(wizards)));
    }
    wizardList.appendChild(documentFragment);
    wizardForm.querySelector('.setup-similar').classList.remove('hidden');
  };

  var saveSuccess = function (response) {
    if (response) {
      wizardSetup.classList.add('hidden');
    }
  };

  var errorHandler = function (message) {
    var errorBlock = document.querySelector('.error-message');
    if (errorBlock) {
      errorBlock.textContent = message;
    } else {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-flign: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.width = '1000px';
      node.style.minHeight = '100px';
      node.style.left = '0';
      node.style.right = '0';
      node.style.top = '150px';
      node.style.fontSize = '30px';
      node.textContent = message;
      node.classList.add('error-message');
      document.body.insertAdjacentElement('afterbegin', node);
    }
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

  window.backend.load(successHandler, errorHandler);

  wizardsCoat.addEventListener('click', function () {
    setElementColor('coatColorIndex', COAT_COLORS, wizardsCoat, 'fill', wizardCoatColorFormField);
  });

  wizardsEyes.addEventListener('click', function () {
    setElementColor('eyesColorIndex', EYES_COLORS, wizardsEyes, 'fill', wizardEyesColorFormField);
  });

  wizardsFireBall.addEventListener('click', function () {
    setElementColor('fireballColorIndex', FIREBALL_COLORS, wizardsFireBall, 'backgroundColor', wizardFireBallColorFormField);
  });

  wizardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(wizardForm), saveSuccess, errorHandler);
  });
})();
