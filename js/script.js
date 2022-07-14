document.addEventListener('DOMContentLoaded', () => {
  new ItcSimpleSlider('#slider-one', {
    loop: true,
    autoplay: false,
    interval: 5000,
    swipe: true,
  });
});
