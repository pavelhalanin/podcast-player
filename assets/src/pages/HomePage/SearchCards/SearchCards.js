class SearchCards {
  static async render() {
    const SEARCH = Search.getLocalStorageSearch() || "";
    if (!SEARCH) {
      return "";
    }
    const DATA = await Search.fetch(SEARCH);
    console.log(DATA);

    return `
      <ul class="cards__list">
        ${DATA.results
          .map((e) => {
            return `
          <li>
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
          </li>`;
          })
          .join("")}
      </ul>
    `;
  }
}
