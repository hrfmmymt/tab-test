"use strict";
import injectBrowser from "testium/mocha";
import assert from "power-assert";

describe("index.html", function() {
  before(injectBrowser());
  beforeEach(function() {
    this.browser.navigateTo("/");
  });

  it("tab1 on click", function() {
    const tab1 = this.browser.getElement("#tab1");
    // click
    tab1.click();
    // assert
    const tabindex = tab1.get("tabindex"),
          section1 = this.browser.getElement("#section1").get("aria-hidden");
    assert(tabindex >= 0);
    assert(section1 === null);
  });

  it("tab2 on click", function() {
    const tab2 = this.browser.getElement("#tab2");
    // click
    tab2.click();
    // assert
    const tabindex = tab2.get("tabindex"),
          section2 = this.browser.getElement("#section2").get("aria-hidden");
    assert(tabindex >= 0);
    assert(section2 === null);
  });

  it("tab3 on click", function() {
    const tab3 = this.browser.getElement("#tab3");
    // click
    tab3.click();
    // assert
    const tabindex = tab3.get("tabindex"),
          section3 = this.browser.getElement("#section3").get("aria-hidden");
    assert(tabindex >= 0);
    assert(section3 === null);
  });

  it("tab4 on click", function() {
    const tab4 = this.browser.getElement("#tab4");
    // click
    tab4.click();
    // assert
    const tabindex = tab4.get("tabindex"),
          section4 = this.browser.getElement("#section4").get("aria-hidden");
    assert(tabindex >= 0);
    assert(section4 === null);
  });

});