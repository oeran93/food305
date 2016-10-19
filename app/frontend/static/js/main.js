$(window).scroll(function () {
  if ($(window).scrollTop() >= $('#banner').height()) {
    $('#menu').addClass('affix')
    $('#menu').css('top', '0')
  } else {
    $('#menu').removeClass('affix')
  }
})
