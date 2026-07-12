class HomePage {
  static async render() {
    return `
      ${Search.render()}
      ${await Cards.render()}
    `;
  }
}
