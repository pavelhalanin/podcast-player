class Error404Page {
  static render() {
    return `
      <div align="center">
        <img src="https://images.ctfassets.net/12phxmr4hjo6/5coe3ktsUuXiRO8Vr2TXJQ/e9c479cd2706181eb5e7ed9da713e380/404.webp" alt="" />
      </div>
      <p>Welcome to the 404 page! You are here because you entered the address of a page that no longer exists.</p>

      <p>Most likely, this happened for one of the following reasons:</p>

      <ul>
        <li>The page has been deleted (due to information becoming outdated);</li>
        <li>The page has been moved to another location;</li>
        <li>Perhaps you missed a letter when entering the address (honestly, this happens to us quite often too);</li>
        <li>You simply enjoy exploring 404 pages.</li>
      </ul>
    `;
  }
}
