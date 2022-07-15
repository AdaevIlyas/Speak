// active slider
document.addEventListener('DOMContentLoaded', () => {
  new ItcSimpleSlider('#slider-one', {
    loop: true,
    autoplay: false,
    interval: 5000,
    swipe: true,
  });
});

// TABS

document.addEventListener('DOMContentLoaded', function () {
  // console.log(document.querySelectorAll('.how-we-work__step'))
  document.querySelectorAll('.step').forEach(function (tabsBtn) {
    // console.log(tabsBtn)
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.tabs-info').forEach(function (tabContent) {
        tabContent.classList.remove('tabs-info-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('tabs-info-active')
    })
  })
  $(function () {
    $('#step-one').click(function () {
      $('#step-one').addClass('step-active');
      $('#step-two').removeClass('step-active');
      $('#step-three').removeClass('step-active');
      $('#step-four').removeClass('step-active');
    });
    $('#step-two').click(function () {
      $('#step-two').addClass('step-active');
      $('#step-one').removeClass('step-active');
      $('#step-three').removeClass('step-active');
      $('#step-four').removeClass('step-active');
    });
    $('#step-three').click(function () {
      $('#step-three').addClass('step-active');
      $('#step-one').removeClass('step-active');
      $('#step-two').removeClass('step-active');
      $('#step-four').removeClass('step-active');
    });
    $('#step-four').click(function () {
      $('#step-four').addClass('step-active');
      $('#step-one').removeClass('step-active');
      $('#step-two').removeClass('step-active');
      $('#step-three').removeClass('step-active');
    });
  });
})