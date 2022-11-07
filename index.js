$(document).ready(() => {
  /* CARDS */
  const $frontCard = $('#front-card');
  const $backCard = $('#back-card');
  /* FRONT CARD INPUTS */
  const $imgInput = $('#image-input');
  const $nameInput = $('#name-input');
  const $signInput = $('#signature-input');
  const $imgPicker = $('#image-picker');
  const $datePicker = $('#date-picker');
  /* BUTTONS */
  const $downloadButton = $('#download-button');
  const $reverseButton = $('#reverse-card-button');

  // Setting dynamically maximum date available.
  $datePicker.attr('max', new Date().toISOString().split('T')[0]);

  /* EVENT BINDERS */
  $('#name-input').on('input', (e) => $signInput.val(e.target.value));

  $reverseButton.on('click', () => {
    if ($backCard.hasClass('opacity-0')) {
      $backCard.removeClass('opacity-0');
      $frontCard.addClass('opacity-0');
      // We add and remove the z-index to not being able to write when we show the other part.
      $frontCard.removeClass('z-50');
    } else {
      $frontCard.removeClass('opacity-0');
      $frontCard.addClass('z-50');
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
      jsPDF: { format: 'a4' },
    };

    // * We need to do this in VanillaJS since the html2pdf package requires it.
    const main = document.createElement('main');
    const space = document.createElement('br');

    // Making a deep copy of the nodes to not modify the original ones.
    const frontCardCopy = document.querySelector('#front-card').cloneNode(true);
    const backCardCopy = document.querySelector('#back-card').cloneNode(true);

    frontCardCopy.classList.remove('absolute');
    backCardCopy.classList.remove('absolute');
    backCardCopy.classList.contains('opacity-0')
      ? backCardCopy.classList.remove('opacity-0')
      : frontCardCopy.classList.remove('opacity-0');

    main.appendChild(frontCardCopy);
    main.appendChild(space);
    main.appendChild(space);
    main.appendChild(backCardCopy);

    html2pdf()
      .from(main)
      .set(opt)
      .save()
      .catch((e) => console.log(e));
  });

  $datePicker.on('change', (e) => {
    /* If the input date is bigger than today's we force the user to input at least another year.
     **Does not cover edge cases like invalid dates. */
    if (Date.now() < +new Date(e.target.value)) {
      const noYearDate = e.target.value.split('-').slice(1).join('-');
      $datePicker.val('1980-' + noYearDate);
    }
  });

  /* Function to read the selected image and place it in the background.
   Source: https://stackoverflow.com/a/12368976. */
  $imgInput.on('change', (e) => {
    const file = e.originalEvent.srcElement.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      $imgPicker.css('background-image', 'url(' + reader.result + ')');
    };

    reader.readAsDataURL(file);
  });

  // Disable hover in mobile devices
  if (screen.width > 640) {
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
  }
});
