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

  static foo(str) {
    return `${str}`.replaceAll('"', `\\'`);
  }

  static async render() {
    const SEARCH = Search.getLocalStorageSearch() || "";
    if (SEARCH) {
      return "";
    }

    const DATA = await this.fetch();

    return `
      <ul class="cards__list">
        ${DATA.podcasts
          .map((e) => {
            const IS_LIKE = MyFavoriteEdisodes.isInFavoriteById(e.id);

            const DISLIKE = `
              <button
                style="position: absolute; top: 0; right: 0;"
                class="episodes__button"
                onclick="
                  MyFavoriteEdisodes.unlikeById('${e.id}');
                  this.remove();
                "
              >
                🗑️
              </button>
            `;

            const LIKE = `
              <button
                style="position: absolute; top: 0; right: 0;"
                class="episodes__button"
                onclick="
                  MyFavoriteEdisodes.like({
                    id: '${e.id}',
                    title: '${this.foo(e.title)}',
                    image: '${e.image}',
                    publisher: '${this.foo(e.publisher)}',
                  });
                  this.remove();
                "
              >
                ❤️
              </button>
            `;

            return `
              <li style="position: relative;">
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
                ${IS_LIKE ? DISLIKE : LIKE}
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
  }
}
