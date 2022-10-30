$(document).ready(() => {
  const $h1 = $('<h1>');
  $h1.text('hello').addClass('text-3xl font-bold underline');
  $('.main').append($h1);
});
