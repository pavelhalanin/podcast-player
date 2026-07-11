class App {
  static render() {
    const DIV = document.getElementById("root");

    if (!DIV) {
      const MESSAGE = `Узел не найден: #root`;
      console.error(MESSAGE);
      alert(MESSAGE);
      return;
    }

    DIV.innerHTML = `
      <div id="cards" class="cards__root"></div>
    `;
  }
}
