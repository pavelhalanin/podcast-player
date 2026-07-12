class Search {
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
    const DATA = await this.fetch(SEARCH);
    alert(`Найдено: ${DATA.results.length} шт. Смотри лог.`);
    console.log(DATA);
  }

  static render() {
    return `
      <form onSubmit="event.preventDefault(); ${this.name}.onSubmit()">
        <input
          id="search"
          type="search"
        >
      </form>
    `;
  }
}
