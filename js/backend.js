'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Во время загрузки данных других игроков произошла ошибка. Статус ответа ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Во время загрузки данных других игроков произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Во время загрузки данных других игроков произошла ошибка запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      xhr.timeout = 1000;
      xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Отправка формы не прошла. Статус ответа ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.open('POST', 'https://js.dump.academy/code-and-magick');
      xhr.send(data);
    }
  };
})();
