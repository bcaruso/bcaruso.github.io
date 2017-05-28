
$(document).ready(function(){
// filter handling for a /dir/ OR /indexordefault.page
function filterPath(string) {
  return string
    .replace(/^\//, '')
    .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
    .replace(/\/$/, '');
}

$('a[href*="#"]').each(function () {
  inView(this.hash)
});

$('#work').scroll(function() {
  $('a[href*="#"]').each(function () {
     inView(this.hash)
})});

function inView(hash){
  var $target = $(hash), target = hash;
  var divtop = $target.position().top;
  var divbottom = $target.position().top + $target.outerHeight(true);

  var worktop = $('#work').offset().top - 10;
  var workbottom = worktop + $('#work').outerHeight(true)/4;

  if(divtop >= worktop &&  divtop <= workbottom){
    $('a[href*="'+hash+'"]').addClass("inview");
    $('a[href*="'+hash+'"]').siblings().removeClass("inview");
    return true;
  }
}

var locationPath = filterPath(location.pathname);
$('a[href*="#"]').each(function () {
  var thisPath = filterPath(this.pathname) || locationPath;
  var hash = this.hash;
  if ($("#" + hash.replace(/#/, '')).length) {
    if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
      var $target = $(hash), target = this.hash;
      if (target) {
        $(this).click(function (event) {
          event.preventDefault();
          $('html,body,#content,#work').animate({scrollTop: $('#work').scrollTop() + $target.offset().top}, 1000, function () {
            location.hash = target;
            $target.focus();
            if ($target.is(":focus")){
              return false;
            }else{
              //$target.attr('tabindex','-1'); //Adding tabindex for elements not focusable
              $target.focus(); //Setting focus
            };
          });
        });
      }
    }
  }
});
});
