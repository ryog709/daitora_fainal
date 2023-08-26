jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  // スクロールするとロゴの色変更
  $(function () {
    $(window).on("scroll", function () {
      const sliderHeight = $(".mv").height();
      if (sliderHeight - 30 < $(this).scrollTop()) {
        $(".js-header").addClass("headerColorScroll");
      } else {
        $(".js-header").removeClass("headerColorScroll");
      }
    });
  });

  // ハンバーガーメニュー
  $(function () {
    $(".js-hamburger,.mv,.js-drawer,.js-drawer a").click(function () {
      if ($(window).width() <= 767) {
        // 画面幅が767px以下の場合のみ処理を実行
        $(".js-hamburger,.mv, .js-drawer").toggleClass("is-current");
        $(".header").toggleClass("menu-open"); // ヘッダーにクラスを追加・削除
      }
    });
  });

  $(function () {
    // ヘッダーの高さ取得
    const headerHeight = $(".js-header").height();
    $('a[href^="#"]').click(function () {
      const speed = 600;
      let href = $(this).attr("href");
      let target = $(href == "#" || href == "" ? "html" : href);
      // ヘッダーの高さ分下げる
      let position = target.offset().top - headerHeight;
      $("body,html").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  });

  //画面幅に応じたカード型レイアウトスライダー
  const swiper = new Swiper(".swiper", {
    autoplay: true,
    speed: 5000,
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
      slidesPerView = 1.285;
      spaceBetween = 20;
    } else if (width >= 1280) {
      slidesPerView = 2.8;
      spaceBetween = 40;
    } else {
      // 375px〜1280pxの範囲で線形補間
      const t = (width - 375) / (1280 - 375);
      slidesPerView = 1.29 + (2.8 - 1.29) * t;
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

  // トップへ戻るボタン
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 80) {
        // スクロール位置が80を超えたら
        $(".to-top").fadeIn(300); // ボタンを表示する
      } else {
        $(".to-top").fadeOut(300); // ボタンを非表示にする
      }
    });

    $(".to-top").click(function () {
      $("body,html").animate(
        {
          scrollTop: 0, // スクロール位置をトップにする
        },
        500
      ); // スクロールにかかる時間を指定する
      return false;
    });
  });

  // gsapアニメーション
  const openingTL = gsap.timeline();
  openingTL
    .to(".opening__mask", {
      //幕が開く
      y: "-100%",
      duration: 2,
      ease: "power4.inOut",
    })
    .to(
      ".mv",
      {
        //背景画像が元の大きさへ戻る
        "--scale": 1,
        duration: 3,
        ease: "power4.out",
      },
      "<"
    )
    .to(
      ".js-textAnimation h1,.js-textAnimation span",
      {
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: { each: 0.15 },
      },
      "-=.5"
    )
    .to(".header", { y: 0, duration: 1, ease: "power3.out" }, "-=1");


  jQuery(function ($) {
    $(window).on("load scroll", function () {
      var box = $(".fadeIn");
      var animated = "animated";

      box.each(function () {
        var boxOffset = $(this).offset().top;
        var scrollPos = $(window).scrollTop();
        var wh = $(window).height();

        if (scrollPos > boxOffset - wh + 100) {
          $(this).addClass(animated);
        }
      });
    });
  });

  $(document).ready(function () {
    let $form = $("#js-form"); // フォームの変数を定義

    function checkRequired() {
      let allFilled = true;
      $(".required").each(function () {
        if ($(this).attr("type") === "checkbox") {
          if (!$(this).prop("checked")) {
            allFilled = false;
            return false; // ループを抜ける
          }
        } else {
          if ($(this).val() === "") {
            allFilled = false;
            return false; // ループを抜ける
          }
        }
      });
      return allFilled;
    }

    // GoogleForm 送信ボタン無効化と必須入力後色反転
    $(".required").on("input", function () {
      if (checkRequired()) {
        $(".submit-button").addClass("enabled");
        $(".submit-button").prop("disabled", false); // 送信ボタンを有効にする
      } else {
        $(".submit-button").removeClass("enabled");
        $(".submit-button").prop("disabled", true); // 送信ボタンを無効にする
      }
    });

    $form.submit(function (e) {
      if (!checkRequired()) {
        return false; // 必須項目が空白なら送信を中止
      }
      $form.find("input[type=submit]").prop("disabled", true); // 送信ボタンを無効にする
      $.ajax({
        url: $form.attr("action"),
        data: $form.serialize(),
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: function () {
            $form.find("input[type=submit]").prop("disabled", false); // 送信ボタンを有効にする
            $("#js-success").slideDown();
          },
          200: function () {
            $form.find("input[type=submit]").prop("disabled", false); // 送信ボタンを有効にする
            $("#js-error").slideDown();
          },
        },
      });
      return false;
    });
  });
});
