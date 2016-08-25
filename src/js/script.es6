$(() => {

  const container = ".tabs";

  /*
   * key down control
   */

  $("[role='tab']").on("keydown", function(e) {

    const el = $(this),
          tabPrev = $(this).parents("li").prev().children("[role='tab']"),
          tabNext = $(this).parents("li").next().children("[role='tab']");

    let tabTarget;

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
    $("#" + $(document.activeElement).attr("aria-controls")).attr("aria-hidden", null);
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
    $("#" + $(this).attr("aria-controls")).attr("aria-hidden", null);
  });

});