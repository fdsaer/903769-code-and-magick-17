'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var COLUMN_X = 155;
var COLUMN_Y = 250;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var COLUMN_MAX_HEIGHT = 150;
var TEXT_GAP = 30;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var searchMax = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderColumn = function (ctx, name, time, x, k) {
  var columnHeight = -COLUMN_MAX_HEIGHT * time / k;
  var columnColor = 'rgb(0, 0, ' + Math.floor(Math.random() * (255 + 1)) + ')';
  ctx.fillStyle = '#000';
  ctx.fillText(name, x, CLOUD_HEIGHT);
  ctx.fillText(Math.round(time), x, CLOUD_HEIGHT - TEXT_GAP + columnHeight);
  ctx.fillStyle = columnColor;
  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }
  ctx.fillRect(x, COLUMN_Y, COLUMN_WIDTH, columnHeight);
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', COLUMN_X, CLOUD_Y + TEXT_GAP);
  ctx.fillText('Список результатов:', COLUMN_X, CLOUD_Y + TEXT_GAP + 20);

  var maxTime = searchMax(times);

  for (var i = 0; i < names.length; i++) {
    renderColumn(ctx, names[i], times[i], COLUMN_X, maxTime);
    COLUMN_X = COLUMN_X + COLUMN_WIDTH + COLUMN_GAP;
  }
};
