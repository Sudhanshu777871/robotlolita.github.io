void (function() {
  function* cycle(list) {
    while (true) {
      for (const item of list) yield item;
    }
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  function doEach(items, fn) {
    for (const item of items) {
      Promise.resolve(fn(item)).catch(error => console.error(error));
    }
  }

  function shuffle(items) {
    return items.slice().sort(_ => Math.random() - 0.5);
  }

  async function rotating_greeting(container) {
    const greetings = cycle(
      shuffle(JSON.parse(container.getAttribute("data-greetings") || "[]"))
    );
    const itemDelay =
      (Number(container.getAttribute("data-delay")) || 5) * 1000;

    for (const greeting of greetings) {
      await delay(itemDelay);
      container.textContent = greeting;
    }
  }

  doEach(document.querySelectorAll(".rl-greeting"), rotating_greeting);
})();
