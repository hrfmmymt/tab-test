$(() => {

  const container = ".tabs",
        tabs = $("[role='tab']");

  /*
   * key down control
   */

  tabs.on("keydown", function(e) {

    const el = $(this),
          tabPrev = $(this).parents("li").prev().children(tabs),
          tabNext = $(this).parents("li").next().children(tabs);

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

  tabs.on("click", function(e) {
    e.preventDefault();
    tabs.attr({
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

// document.addEventListener('DOMContentLoaded', () => {
//   const tabs = document.querySelectorAll("a[role='tab']");

//   for(let i of tabs) {
//     console.log(i);
//     i.addEventListener("click", e => {
//       console.log(e.target);
//       e.preventDefault();
//       i.setAttribute("tabindex", "-1");
//       i.setAttribute("aria-selected", null);
//       e.target.setAttribute("tabindex", 0);
//       e.target.setAttribute("aria-selected", true);
//     }, false);
//   }

  // for(let i = 0; i < tab.length; i++) {
  //   tab[i].addEventListener("click", e => {
  //     e.preventDefault();
  //     tab[i].setAttribute("tabindex", "-1");
  //     tab[i].setAttribute("aria-selected", null);
  //     e.target.setAttribute("tabindex", 0);
  //     e.target.setAttribute("aria-selected", true);
  //   }, false);
  // }

  // tab.addEventListener("click", function(e) {
  //   console.log(this);
  //   e.preventDefault();
  //   tab.setAttributes({
  //     "tabindex" : "-1",
  //     "aria-selected" : null
  //   });
  //   this.setAttributes({
  //     "tabindex" : 0,
  //     "aria-selected" : true
  //   });
  // });
// });