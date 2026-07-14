class SearchCards {
  static foo(str) {
    return `${str}`.replaceAll('"', `\\'`);
  }

  static async render() {
    const SEARCH = Search.getLocalStorageSearch() || "";
    if (!SEARCH) {
      return "";
    }
    const DATA = await Search.fetch(SEARCH);

    return `
      <ul class="cards__list">
        ${DATA.results
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
                    title: '${this.foo(e.title_original)}',
                    image: '${e.image}',
                    publisher: '',
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
                      ${e.title_original}
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
