$(document).ready(() => {
  const $imgPckr = $('#image-picker');
  const $imgInput = $('#image-input');
  $imgPckr.on('click', () => $imgInput.trigger('click'));
  $imgPckr.hover(
    () => {
      $('#button-title').removeClass('hidden');
    },
    () => {
      $('#button-title').addClass('hidden');
    }
  );
});
