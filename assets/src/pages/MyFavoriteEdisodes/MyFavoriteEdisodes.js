class MyFavoriteEdisodes {
  static getEpisodesArray() {
    const PLAYLIST = localStorage.getItem("favoriteEpisodes");
    if (!PLAYLIST) {
      localStorage.setItem("favoriteEpisodes", "[]");
    }

    const LIST = localStorage.getItem("favoriteEpisodes");
    let arr = [];
    try {
      arr = JSON.parse(LIST);
    } catch (exception) {
      arr = [];
    }

    return arr;
  }

  static setEpisodesArray(arr) {
    const JSON_LIST = JSON.stringify(arr);
    localStorage.setItem("favoriteEpisodes", JSON_LIST);
  }

  static like(obj) {
    let arr = this.getEpisodesArray();

    const ID = obj.id;
    arr = arr.filter((e) => e.id !== ID);
    arr.push(obj);

    this.setEpisodesArray(arr);
  }

  static unlikeById(id) {
    let arr = this.getEpisodesArray();

    arr = arr.filter((e) => e.id !== id);

    this.setEpisodesArray(arr);
  }

  static isInFavoriteById(id) {
    let arr = this.getEpisodesArray();

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return true;
      }
    }

    return false;
  }

  static foo(str) {
    return `${str}`.replaceAll('"', `\\'`);
  }

  static render() {
    const ARRAY = this.getEpisodesArray();

    if (ARRAY.length === 0) {
      return `
        <p>My Favorite Publishers</p>
        <p>You are not add favorite puplisher</p>
      `;
    }

    return `
      <p>My Favorite Publishers</p>
      <ul class="cards__list">
        ${ARRAY.map((e) => {
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
                <button
                  style="position: absolute; top: 0; right: 0;"
                  class="episodes__button"
                  onclick="
                    MyFavoriteEdisodes.unlikeById('${e.id}');
                    App.render();
                  "
                >
                  🗑️
                </button>
              </li>
            `;
        }).join("")}
      </ul>
    `;
  }
}
