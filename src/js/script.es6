$(function() {

  var $container = ".tabs";

  $($container + " ul").attr("role", "tablist");
  $($container + " [role='tablist'] li").attr("role", "presentation");
  $("[role='tablist'] a").attr({
    "role" : "tab",
    "tabindex" : "-1"
  });

  $("[role='tablist'] a").each(function() {
    $(this).attr(
      "aria-controls", $(this).attr("href").substring(1)
    );
  });

  $("[role='tablist'] li:first-child a").attr({
    "aria-selected" : true,
    "tabindex" : 0
  });

  $($container + " section").attr({
    "role" : "tabpanel"
  });

  $($container + " section > *:first-child").attr({
    "tabindex" : 0
  });

  $("[role='tabpanel']:not(:first-of-type)").attr({
    "aria-hidden" : true
  });

  $("[role='tab']").on("keydown", function(e) {

    var el = $(this);
    var $prev = $(this).parents("li").prev().children("[role='tab']");
    var $next = $(this).parents("li").next().children("[role='tab']");
    var $target;

    switch(e.keyCode) {
      case 37:
        $target = $prev;
      break;
      case 39:
        $target = $next;
      break;
      default:
        $target = false
      break;
    }

    if($target.length) {
      el.attr({
        "tabindex" : "-1",
        "aria-selected" : null
      });
      $target.attr({
        "tabindex" : 0,
        "aria-selected" : true
      }).focus();
    }
    $($container + " [role='tabpanel']").attr("aria-hidden", true);
    $("#" + $(document.activeElement).attr("href").substring(1)).attr("aria-hidden", null);
  });

  $("[role='tab']").on("click", function(e) {
    e.preventDefault();
    $("[role='tab']").attr({
      "tabindex" : "-1",
      "aria-selected" : null
    });
    $(this).attr({
      "aria-selected" : true,
      "tabindex" : 0
    });
    $($container + " [role='tabpanel']").attr("aria-hidden", true);
    $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", null);
  });

});