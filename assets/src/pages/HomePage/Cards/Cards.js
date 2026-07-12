class Cards {
  static async fetch() {
    const BACKEND_URL = "https://listen-api-test.listennotes.com/api/v2";

    const FETCH_URL = new URL(`${BACKEND_URL}/best_podcasts`);
    FETCH_URL.searchParams.append("sort", "recent_published_first");
    FETCH_URL.searchParams.append("page", "1");
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

  static async render() {
    const DATA = await this.fetch();

    return `
      <ul class="cards__list">
        ${DATA.podcasts
          .map((e) => {
            return `
          <li>
            <a data-spa-link href="#/posts/${e.id}">
              <div class="cards__card_image_block">
                <img src="${e.image}" alt=""/>
              </div>
              <div class="cards__text_block">
                <div class="cards__title_block">
                  ${e.title}
                </div>
                <div class="cards__publisher_block">
                  ${e.title === e.publisher ? "Solo podcast" : e.publisher}
                </div>
              </div>
            </a>
          </li>`;
          })
          .join("")}
      </ul>
    `;
  }
}
