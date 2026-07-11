class App {
  static id_root_search = "search_root";
  static id_root_cards = "cards_root";

  static render() {
    const DIV = document.getElementById("root");

    if (!DIV) {
      const MESSAGE = `Узел не найден: #root`;
      console.error(MESSAGE);
      alert(MESSAGE);
      return;
    }

    DIV.innerHTML = `
      <div id="${this.id_root_search}" class="search__wrapper"></div>
      <div id="${this.id_root_cards}" class="cards__wrapper"></div>
    `;
  }
}
