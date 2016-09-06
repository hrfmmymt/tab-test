"use strict";

module.exports = {

  'Test WAI-ARIA tabs UI' : function (browser) {
    browser
      .url("http://localhost:9100/")
      .pause(1000)
      .assert.title("tab-test")
      .assert.containsText("#section1", "タブ UI を実装してみました。")
      .end();
  }

};