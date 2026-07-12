class Search {
  static init() {
    const THIS = this;

    function debounce(fn, delay) {
      let timer = null;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, delay);
      };
    }

    const searchInput = document.getElementById("search");

    function performSearch(query) {
      console.log("Вы пытаетесь найти:", query);
      THIS.onSubmit(query);
    }

    const debouncedSearch = debounce(performSearch, 1000);

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.trim();
      if (value) {
        debouncedSearch(value);
      }
    });
  }

  static async fetch(search, page = 1) {
    const LIMIT = 10;

    const BACKEND_URL = "https://listen-api-test.listennotes.com/api/v2";

    const FETCH_URL = new URL(`${BACKEND_URL}/search`);
    FETCH_URL.searchParams.append("q", search);
    FETCH_URL.searchParams.append("type", "podcast");
    FETCH_URL.searchParams.append("offset", (page - 1) * LIMIT);
    const URI = FETCH_URL.toString();

    const RESPONSE = await fetch(URI, {
      method: "GET",
      headers: {
        "X-ListenAPI-Key": "",
      },
    });

    const HTTP_STATUS = RESPONSE.status;

    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  }

  static getSearch() {
    const INPUT = document.getElementById("search");
    if (!INPUT) {
      return "";
    }
    return INPUT.value;
  }

  static async onSubmit() {
    const SEARCH = this.getSearch();
    this.setLocalStorageSearch(SEARCH);
    App.render();
  }

  static setLocalStorageSearch(search) {
    localStorage.setItem("search", search);
  }

  static getLocalStorageSearch(search) {
    return localStorage.getItem("search");
  }

  static render() {
    const SEARCH = Search.getLocalStorageSearch() || "";

    return `
      <form
        class="search__wrapper"
        onSubmit="event.preventDefault(); ${this.name}.onSubmit()"
      >
        <input
          id="search"
          type="search"
          value="${SEARCH}"
        >
      </form>
    `;
  }
}
