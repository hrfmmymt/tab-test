$(() => {

  /* 
   * init settings
   */

  const container = ".tabs";

  $(container + " ul").attr("role", "tablist");
  $(container + " [role='tablist'] li").attr("role", "presentation");
  $("[role='tablist'] a").attr({
    "tabindex" : "-1",
    "role" : "tab"
  });

  $("[role='tablist'] a").each(function() {
    $(this).attr("aria-controls", $(this).attr("href").substring(1));
  });

  $("[role='tablist'] li:first-child a").attr({
    "tabindex" : 0,
    "aria-selected" : true
  });

  $(container + " section").attr({
    "role" : "tabpanel"
  });

  $(container + " section > *:first-child").attr({
    "tabindex" : 0
  });

  $("[role='tabpanel']:not(:first-of-type)").attr({
    "aria-hidden" : true
  });

  /*
   * key down control
   */

  $("[role='tab']").on("keydown", function(e) {

    let el = $(this),
        tabPrev = $(this).parents("li").prev().children("[role='tab']"),
        tabNext = $(this).parents("li").next().children("[role='tab']"),
        tabTarget;

    switch(e.keyCode) {
      case 37:
        tabTarget = tabPrev;
      break;
      case 39:
        tabTarget = tabNext;
      break;
      default:
        tabTarget = false
      break;
    }

    if(tabTarget.length) {
      el.attr({
        "tabindex" : "-1",
        "aria-selected" : null
      });
      tabTarget.attr({
        "tabindex" : 0,
        "aria-selected" : true
      }).focus();
    }
    $(container + " [role='tabpanel']").attr("aria-hidden", true);
    $("#" + $(document.activeElement).attr("href").substring(1)).attr("aria-hidden", null);
  });

  /*
   * click tabs
   */

  $("[role='tab']").on("click", function(e) {
    e.preventDefault();
    $("[role='tab']").attr({
      "tabindex" : "-1",
      "aria-selected" : null
    });
    $(this).attr({
      "tabindex" : 0,
      "aria-selected" : true
    });
    $(container + " [role='tabpanel']").attr("aria-hidden", true);
    $("#" + $(this).attr("href").substring(1)).attr("aria-hidden", null);
  });

});