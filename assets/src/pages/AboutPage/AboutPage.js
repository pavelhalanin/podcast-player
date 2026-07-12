class AboutPage {
  static render() {
    return `
      <p>About page</p>
      <img src="https://app.rs.school/static/images/im-fine.svg" alt="" style="max-width: 200px;">
      <p>This project is living proof that it is possible to combine work,
          life, and serious development. And that RS School teaches real
          skills, not just a checkbox.</p>
      <div>
        <div>
          <p>What about you?</p>
          <p>
            If you also want to master JS and
            understand how modern frontend tools work, come to RS School.
          </p>
          <p>
            Enroll in the course:
            <a target="_blank" href="https://rs.school/" rel="noreferrer">
              https://rs.school/
            </a>
          </p>
          <p>
            Real projects, mentorship, a community, and a path that will make
            even a complex stack feel like home await you. Do not be afraid to
            start—I did it. And you can definitely do it too.
          </p>
        </div>
        <div>
          <img src="https://app.rs.school/static/svg/sloths/Expert.svg" alt="" style="max-width: 200px;" />
        </div>
      </div>
    `;
  }
}
