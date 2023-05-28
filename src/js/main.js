jQuery.validator.addMethod("fio", function (value, element) {
  let chunks = value.trim().split(' ')

  return chunks.length === 3 && chunks.indexOf('') === -1;
}, "ФИО должно состоять из трех слов, разделенных пробелами");

jQuery.validator.addMethod("phone", function (value, element) {
  if (value.startsWith('+375')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value);
  } else if (value.startsWith('+7')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value);
  } else {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(value);
  }
}, "Введите полный номер");

$.validator.messages.required = 'Пожалуйста, введите данные';

if (document.getElementById('phone')) {
  let phone = document.getElementById('phone')

  let phoneMask = IMask(phone, {
    mask: [
      {
        mask: '+{375} (00) 000 00 00',
        startsWith: '375',
        overwrite: true,
        lazy: false,
        placeholderChar: '_',
      },
      {
        mask: '+{7} (000) 000 00 00',
        startsWith: '7',
        overwrite: true,
        lazy: false,
        placeholderChar: '_',
      },
      {
        mask: '0000000000000',
        startsWith: '',
        country: 'unknown'
      }
    ],

    dispatch: function (appended, dynamicMasked) {
      let number = (dynamicMasked.value + appended).replace(/\D/g, '');

      return dynamicMasked.compiledMasks.find(function (m) {
        return number.indexOf(m.startsWith) === 0;
      });
    }
  })
}

$(document).on("click", ".mfp-link", function () {
  var a = $(this);

  $.magnificPopup.open({
    items: { src: a.attr("data-href") },
    type: "ajax",
    overflowY: "scroll",
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    ajax: {
      tError: "Error. Not valid url",
    },
    callbacks: {
      open: function () {
        setTimeout(function(){
          $('.mfp-wrap').addClass('not_delay');
          $('.mfp-popup').addClass('not_delay');
        },700);
      }
    },

    callbacks: {
      open: function() {
        document.documentElement.style.overflow = 'hidden'
      },

      close: function() {
        document.documentElement.style.overflow = ''
      }
    }
  });
  return false;
});