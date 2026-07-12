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
      <ul>
        ${DATA.episodes
          .map((e, i) => {
            console.log(e);
            return `
            <li>
              <div>${e.title}</div>
             <div>
                <img
                  src="${e.image}"
                  alt=""
                  style="max-width: 100px; max-height: 100px; width: auto; height: auto;"
                />
              </div>
              <a href="${e.audio}">Слушать</a>
              <button onclick="
                AudioHelper.setUrl('${e.audio}');
                AudioHelper.togglePlay();
              ">Слушать</button>
            </li>
          `;
          })
          .join("")}
      </ul>
    `;
  }
}
