$(document).ready(() => {
  const $imgPicker = $('#image-picker');
  const $imgInput = $('#image-input');
  const $datePicker = $('#date-picker');

  $datePicker.attr('max', new Date().toISOString().split('T')[0]);

  /* EVENT BINDERS*/
  $imgPicker.on('click', () => $imgInput.trigger('click'));

  $datePicker.on('change', (e) => {
    /* If the input date is bigger than today's we force the user to input at least another year.
     **Does not cover edge cases like invalid dates. */
    if (Date.now() < +new Date(e.target.value)) {
      const noYearDate = e.target.value.split('-').slice(1).join('-');
      $datePicker.val('1980-' + noYearDate);
    }
  });
  // Source of the following function: https://stackoverflow.com/a/12368976
  $imgInput.on('change', (e) => {
    const file = e.originalEvent.srcElement.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      $imgPicker.css('background-image', 'url(' + reader.result + ')');
    };

    reader.readAsDataURL(file);
  });

  $imgPicker.hover(
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
