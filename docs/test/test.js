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
    const tabindex = tab1.get("tabindex");
    assert(tabindex >= 0);
  });
});