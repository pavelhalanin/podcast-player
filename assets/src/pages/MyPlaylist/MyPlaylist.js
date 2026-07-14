class MyPlaylist {
  static getPlaylistArray() {
    const PLAYLIST = localStorage.getItem("playlist");
    if (!PLAYLIST) {
      localStorage.setItem("playlist", "[]");
    }

    const LIST = localStorage.getItem("playlist");
    let arr = [];
    try {
      arr = JSON.parse(LIST);
    } catch (exception) {
      arr = [];
    }

    return arr;
  }

  static setPlaylistArray(arr) {
    const JSON_LIST = JSON.stringify(arr);
    localStorage.setItem("playlist", JSON_LIST);
  }

  static like(obj) {
    let arr = this.getPlaylistArray();

    const ID = obj.id;
    arr = arr.filter((e) => e.id !== ID);
    arr.push(obj);

    this.setPlaylistArray(arr);
  }

  static unlikeById(id) {
    let arr = this.getPlaylistArray();

    arr = arr.filter((e) => e.id !== id);

    this.setPlaylistArray(arr);
  }

  static isInPlaylistById(id) {
    let arr = this.getPlaylistArray();

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return true;
      }
    }

    return false;
  }

  static render() {
    const ARRAY = this.getPlaylistArray();

    if (ARRAY.length === 0) {
      return `
        <p>My Playlist</p>
        <p>You are not add podcast</p>
      `;
    }

    return `
      <p>My Playlist</p>
      <ul class="episodes__list">
        ${ARRAY.map((e) => {
          const SRC = e.audio;
          const START_SECONDS = AudioHelper.getAudioDuration(SRC);
          const START_MINUTES_STR = AudioHelper.formatTime(START_SECONDS);
          return `
            <li>
              <div class="episodes__image">
                <img src="${e.image}" alt="" >
              </div>
              <div class="episodes__text_block">
                <div>${e.title}</div>
                <div>
                  <button
                    class="episodes__button" style="color: red; width: 300px;"
                    onclick="
                      MyPlaylist.unlikeById('${e.id}');
                      App.render();
                    "
                  >
                    Remove from playlist
                  </button>
                </div>
                <p>Start playlist on: ${START_MINUTES_STR} (${START_SECONDS} seconds)</p>
                <div>
                  <button
                    class="episodes__button"
                    onclick="
                      AudioHelper.setUrl('${e.audio}');
                      AudioHelper.togglePlay();
                    "
                  >
                    Start audio
                  </button>
                </div>
              </div>
            </li>
          `;
        }).join("")}
      </ul>
    `;
  }
}
