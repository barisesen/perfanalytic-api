class PerfAnalytics {
  constructor(BASE_API_URL) {
    this.BASE_API_URL = BASE_API_URL;

    setTimeout(() => this.init(), 0);
  }

  getFirstContentfulPaintTime() {
    return performance.getEntriesByName('first-contentful-paint')[0].startTime;
  }

  getTimeToFirstByteTime() {
    return performance.timing.responseStart - performance.timing.requestStart;
  }

  getDomLoadTime() {
    return performance.timing.domContentLoadedEventEnd - performance.timing.connectStart;
  }

  getWindowLoadTime() {
    return performance.timing.loadEventEnd - performance.timing.connectStart;
  }

  init() {
    fetch(this.BASE_API_URL, {
      method: 'POST',
      headers: {
        'Accept-type': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ttfb: this.getTimeToFirstByteTime(),
        fcp: this.getFirstContentfulPaintTime(),
        dom_load: this.getDomLoadTime(),
        window_load: this.getWindowLoadTime(),
      }),
    });
  }
}
