class PoscastByIdPage {
  static async fetchById(id) {
    const URI = `https://listen-api-test.listennotes.com/api/v2/podcasts/${id}`;
    const RESPONSE = await fetch(URI);

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      throw new Error(`HTTP ${HTTP_STATUS}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  }

  static getDateByIntNum(intNum) {
    const D = new Date(intNum);

    const YYYY = D.getFullYear();
    const MM = `${D.getMonth() + 1}`.padStart(2, "0");
    const DD = `${D.getDate()}`.padStart(2, "0");

    const HH = `${D.getHours()}`.padStart(2, "0");
    const MI = `${D.getHours()}`.padStart(2, "0");
    const SS = `${D.getSeconds()}`.padStart(2, "0");

    return `${DD}.${MM}.${YYYY}`;
  }

  static async render(props = { id: "" }) {
    const DATA = await this.fetchById(props.id);
    console.log(DATA);
    return `
      <h2>${DATA.title}</h2>
      <p>${DATA.description}</p>
      <p>Country: ${DATA.country}</p>
      <p>Email: <a href="mailto:${DATA.email}">${DATA.email}</a></p>
      <p>Publisher: ${DATA.publisher}</p>
      <p>Total episodes: ${DATA.total_episodes}</p>
      <div>
        <img
          src="${DATA.image}"
          alt=""
          style="max-width: 300px; max-height: 300px; width: auto; height: auto;"
        />
      </div>
      <ul class="episodes__list">
        ${DATA.episodes
          .map((e, i) => {
            console.log(e);
            const SECONDS = e.audio_length_sec;
            const TIME = AudioHelper.formatTime(SECONDS);
            const DATE_PUBLIC = this.getDateByIntNum(e.pub_date_ms);

            return `
            <li>
              <div class="episodes__image">
                <img src="${e.image}" alt="" >
              </div>
              <div class="episodes__text_block">
                <div>${e.title}</div>
                <div>Audio duration: ${TIME} (${SECONDS} seconds)</div>
                <div>Publication date: ${DATE_PUBLIC}</div>
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
            </li>
          `;
          })
          .join("")}
      </ul>
    `;
  }
}
