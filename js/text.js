var icon = `<a class="social-link" href="https://www.facebook.com/dioxittdn.phucprobb"><i class="fa fa-facebook" aria-hidden="true"></i></a>
<a class="social-link" href="https://www.facebook.com/dioxittdn.phucprobb"><i class="fa fa-github" aria-hidden="true"></i></a>
<a class="social-link" href="https://www.facebook.com/dioxittdn.phucprobb"><i class="fa fa-google"></i></a>
<a class="social-link" href="https://www.facebook.com/dioxittdn.phucprobb"><i class="fa fa-slack" aria-hidden="true"></i></a>`
$(document).ready(function () {
  $(".sharer3").click(function () {
    console.log("ok jque");
    $(`.whisper`).append(icon);
    // $(this).delay(100 * i).fadeIn(500);
    $(`.social-link`).each(function (i) {
      $(this).delay(300 * i).animate({ opacity: 1 }, 700)
      console.log(this);
    })
  })
});
// $("#dropDownMenu li").each(function(i) {
//   $(this).delay(100 * i).fadeIn(500);
// });