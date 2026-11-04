/* JaysonSellsCars dwell reporter.
 * Include on pages on Jayson's own domains (trade-in site, tools pages,
 * Squarespace code blocks). The CRM adds ?jst=<sendId>.<linkIndex> to
 * own-domain links in tracked emails; this reads it and reports the
 * seconds spent on the page, once, when the visitor leaves. */
(function () {
  // Set to the Email Tracking Apps Script /exec URL after deployment.
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynZLVMiZCd8LCT_co_sKyua8AdXYJQpzv_ZgnT496m_iXwLB0ehZMoiQ3HpYfvSXrB0A/exec';
  var m = /[?&]jst=([A-HJ-NP-Z2-9]{10})\.(\d+)/.exec(location.search);
  if (!m) return;
  var start = Date.now();
  var sent = false;
  function report() {
    if (sent) return;
    sent = true;
    var secs = Math.round((Date.now() - start) / 1000);
    if (secs < 1) return;
    var url = SCRIPT_URL + '?kind=dwell&t=' + m[1] + '&i=' + m[2] + '&s=' + secs;
    if (navigator.sendBeacon) { navigator.sendBeacon(url); }
    else { fetch(url, { mode: 'no-cors', keepalive: true }).catch(function () {}); }
  }
  window.addEventListener('pagehide', report);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') report();
  });
})();
