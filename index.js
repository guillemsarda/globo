$(document).ready(() => {
  const $imgPicker = $('#image-picker');
  const $imgInput = $('#image-input');
  const $nameInput = $('#name-input');
  const $signInput = $('#signature-input');
  const $datePicker = $('#date-picker');
  const $downloadButton = $('#download-button');
  const $reverseButton = $('#reverse-card-button');
  const $frontCard = $('#front-card');
  const $backCard = $('#back-card');

  $datePicker.attr('max', new Date().toISOString().split('T')[0]);

  /* EVENT BINDERS*/
  $('#name-input').on('input', (e) => $signInput.val(e.target.value));
  $reverseButton.on('click', () => {
    if ($backCard.hasClass('opacity-0')) {
      $backCard.removeClass('opacity-0');
      $frontCard.addClass('opacity-0');
    } else {
      $frontCard.removeClass('opacity-0');
      $backCard.addClass('opacity-0');
    }
  });

  $imgPicker.on('click', () => $imgInput.trigger('click'));

  $downloadButton.on('click', () => {
    const userName = $nameInput.val().trim().toLowerCase().replace(/\s+/g, '-');
    const opt = {
      /* margin per side (mm) = (page width - card size)/2
       margin per side = (210 - 160)/2 = 25mm */
      margin: [10, 25, 0, 0],
      filename: userName + '.pdf',
    };
    // * We need to do this in VanillaJS since the html2pdf package requires it.
    const main = document.createElement('main');
    const space = document.createElement('br');

    // Making a deep copy of the nodes to not modify the original ones.
    const frontCardCopy = document.querySelector('#front-card').cloneNode(true);
    const backCardCopy = document.querySelector('#back-card').cloneNode(true);

    frontCardCopy.classList.remove('absolute');
    backCardCopy.classList.remove('absolute');

    main.appendChild(frontCardCopy);
    main.appendChild(space);
    main.appendChild(space);
    main.appendChild(backCardCopy);

    html2pdf(main, opt);
  });

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

// style="background-image: url('./media/bg.svg')" bg-no-repeat bg-center bg-cover
