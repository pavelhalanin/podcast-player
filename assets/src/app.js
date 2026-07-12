class App {
  static routes = {
    "#/": async () => await HomePage.render(),
    "#/about": () => AboutPage.render(),
    "#/post/id": () => PoscastByIdPage.render(),
    "#/404": () => Error404Page.render(),
  };

  static init() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-spa-link]");
      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        history.pushState(null, "", href);
        this.render();
      }
    });

    window.addEventListener("popstate", render);
  }

  static async render() {
    const path = window.location.hash;
    const app = document.getElementById("app");

    if (!app) {
      alert("Узел не найден: #app");
      return;
    }

    const page = this.routes[path]
      ? await this.routes[path]()
      : this.routes["#/404"]();

    app.innerHTML = page;
  }
}
