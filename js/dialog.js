'use strict';

(function () {
  var wizardSetup = document.querySelector('.setup');
  var wizardFormOpener = document.querySelector('.setup-open');
  var wizardFormShutter = wizardSetup.querySelector('.setup-close');
  var wizardNameInput = wizardSetup.querySelector('.setup-user-name');
  var dialogHandler = wizardSetup.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== wizardNameInput) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    wizardSetup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    wizardSetup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    wizardSetup.style.left = '';
    wizardSetup.style.top = '';
  };

  var preventEvent = function (evt) {
    evt.preventDefault();
  };

  var makeDraggable = function (objectToMove, handler) {
    handler.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startingCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var dragged = false;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startingCoords.x - moveEvt.clientX,
          y: startingCoords.y - moveEvt.clientY
        };
        startingCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        objectToMove.style.left = (objectToMove.offsetLeft - shift.x) + 'px';
        objectToMove.style.top = (objectToMove.offsetTop - shift.y) + 'px';
        dragged = true;
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            handler.removeEventListener('click', onClickPreventDefault);
          };
          handler.addEventListener('click', onClickPreventDefault);
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  wizardFormOpener.addEventListener('click', function () {
    openPopup();
  });

  wizardFormOpener.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  wizardFormShutter.addEventListener('click', function () {
    closePopup();
  });

  wizardFormShutter.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  wizardNameInput.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, preventEvent);
  });

  makeDraggable(wizardSetup, dialogHandler);
})();


