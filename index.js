$(document).ready(() => {
  const $imgPckr = $('#image-picker');
  const $imgInput = $('#image-input');

  /* EVENT BINDERS*/
  $imgPckr.on('click', () => $imgInput.trigger('click'));

  // Source of the followinf function: https://stackoverflow.com/a/12368976
  $imgInput.on('change', (e) => {
    const file = e.originalEvent.srcElement.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      $imgPckr.css('background-image', 'url(' + reader.result + ')');
    };

    reader.readAsDataURL(file);
  });

  $imgPckr.hover(
    () => {
      /* Since the parameter 'now' from the step function is inaccurate we have created 
      this 'animationStep' counter that will force the 'slideDown' method to be called only once. */
      let animationStep = 0;
      $('#upload-container').animate(
        { height: 'show' },
        {
          duration: 300,
          step: () => {
            animationStep == 10 && $('#upload-header').slideDown('fast');
            animationStep++;
          },
        }
      );
    },
    () => {
      $('#upload-header').hide();
      // The 'stop' method removes all the animations on the given element.
      $('#upload-container').stop(true).animate({ height: 'hide' });
    }
  );
});
