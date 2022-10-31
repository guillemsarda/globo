$(document).ready(() => {
  const $imgPckr = $('#image-picker');
  const $imgInput = $('#image-input');
  $imgPckr.on('click', () => $imgInput.trigger('click'));
  $imgPckr.hover(
    () => {
      /* Since the parameter 'now' from the step function is inaccurate we have created 
      this 'animationStep' counter that will force the slideDown method to be called only once. */
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
      $('#upload-container').stop(true).animate({ height: 'hide' }); // stop removes all the animations on the given element
    }
  );
});

// bg-yellow-200/40
