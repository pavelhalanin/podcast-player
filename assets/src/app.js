class App {
  static async render() {
    const DIV = document.getElementById("root");

    if (!DIV) {
      alert("Узел не найден: #root");
      return;
    }

    DIV.innerHTML = `
      <div class="app__wrapper">
        <div class="app__menu app__scroll_block">
          <ul>
            <li>
              <a data-spa-link href="#/">Home</a>
            </li>
            <li>
              <a data-spa-link href="#/about">About</a>
            </li>
            <li>
              <a data-spa-link href="#/404">404</a>
            </li>
          </ul>
        </div>
        <div class="app__content app__scroll_block">
          <div id="app"></div>
        </div>
      </div>
    `;

    App.renderRoute();
    App.init();
  }

  static init() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-spa-link]");
      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        history.pushState(null, "", href);
        this.renderRoute();
      }
    });

    window.addEventListener("popstate", this.renderRoute);
  }

  static async renderRoute() {
    const path = window.location.hash;
    const app = document.getElementById("app");

    if (!app) {
      alert("Узел не найден: #app");
      return;
    }

    switch (path) {
      case "":
      case "#/":
        app.innerHTML = await HomePage.render();
        Search.init();
        return;

      case "#/about":
        app.innerHTML = AboutPage.render();
        return;

      case "#/post/id":
        app.innerHTML = PoscastByIdPage.render();
        return;

      default:
        app.innerHTML = Error404Page.render();
        return;
    }
  }
}
