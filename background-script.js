function notify(message) {
  browser.notifications.create({
    "type": "basic",
    "title": "Блокер хабрапереводов",
    "message": message
  });
}
browser.runtime.onMessage.addListener(notify);
