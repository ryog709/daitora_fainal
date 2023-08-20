jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  //画面幅に応じたカード型レイアウトスライダー
  const swiper = new Swiper(".swiper", {
    autoplay: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  function updateSwiper() {
    const width = window.innerWidth;
    let slidesPerView;
    let spaceBetween;
    let paddingLeft;

    if (width <= 375) {
      slidesPerView = 1.23;
      spaceBetween = 20;
    } else if (width >= 1280) {
      slidesPerView = 2.8;
      spaceBetween = 40;
    } else {
      // 375px〜1280pxの範囲で線形補間
      const t = (width - 375) / (1280 - 375);
      slidesPerView = 1.23 + (2.8 - 1.23) * t;
      spaceBetween = 20 + (40 - 20) * t;
    }

    swiper.params.slidesPerView = slidesPerView;
    swiper.params.spaceBetween = spaceBetween;
    swiper.update();
  }

  // 最初に一度呼び出す
  updateSwiper();

  // 画面サイズが変わった時に再度呼び出す
  window.addEventListener("resize", updateSwiper);

  // アコーディオンメニュー
  $(function () {
    /*タイトルをクリックすると*/
    $(".js-accordion__list-title").on("click", function () {
      /*クリックした隣の要素を開閉する*/
      $(this).next().slideToggle(400);
      /*タイトルにopenクラスの追加、削除を行って矢印の向きを変える*/
      $(this).toggleClass("open", 400);
    });
  });
});
