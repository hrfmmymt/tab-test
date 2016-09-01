"use strict";
import injectBrowser from "testium/mocha";
import assert from "power-assert";

describe("Test WAI-ARIA tabs UI", () => {
  before(injectBrowser());

  let browser;
  beforeEach(function() {
    browser = this.browser;
    browser.navigateTo("/");
  });

  it("tab1 on click", () => {
    const tab1 = browser.getElement("#tab1");
    // click
    tab1.click();
    // assert
    const tabIndex = tab1.get("tabindex"),
          ariaHidden = browser.getElement("#section1").get("aria-hidden");
    assert(tabIndex >= 0);
    assert(ariaHidden === null);
  });

  it("tab2 on click", () => {
    const tab2 = browser.getElement("#tab2");
    // click
    tab2.click();
    // assert
    const tabIndex = tab2.get("tabindex"),
          ariaHidden = browser.getElement("#section2").get("aria-hidden");
    assert(tabIndex >= 0);
    assert(ariaHidden === null);
  });

  it("tab3 on click", () => {
    const tab3 = browser.getElement("#tab3");
    // click
    tab3.click();
    // assert
    const tabIndex = tab3.get("tabindex"),
          ariaHidden = browser.getElement("#section3").get("aria-hidden");
    assert(tabIndex >= 0);
    assert(ariaHidden === null);
  });

  it("tab4 on click", () => {
    const tab4 = browser.getElement("#tab4");
    // click
    tab4.click();
    // assert
    const tabIndex = tab4.get("tabindex"),
          ariaHidden = browser.getElement("#section4").get("aria-hidden");
    assert(tabIndex >= 0);
    assert(ariaHidden === null);
  });

});