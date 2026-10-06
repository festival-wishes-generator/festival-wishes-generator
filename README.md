# Festival Wishes Generator 🪔✨

An open-source collection of reusable festival greeting templates, examples, historical context, and a simple personalized greeting generator with name and photo support.

## Features

- **Personalized Greeting Generator**: Enter your name, optionally upload a photo, choose from stunning festival templates, preview in real-time, and download your greeting image.
- **WhatsApp Integration**: Easily share your customized wishes via standard WhatsApp share URLs.
- **Festival Guides**: Informative pages for major festivals and occasions with history, cultural significance, and message examples.
- **Open Source & Lightweight**: Built with pure HTML, CSS, and vanilla JavaScript—zero bloat, no forced redirects, and 100% compatible with GitHub Pages.

---

## Live Demo

A live personalized festival wishing experience is available at:

https://shubhkamna.in/

---

## Project Structure

```text
festival-wishes-generator/
│
├── index.html
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── assets/
│   ├── images/
│   └── icons/
├── css/
│   └── style.css
├── js/
│   └── app.js
└── festivals/
    ├── diwali.html
    ├── holi.html
    ├── navratri.html
    ├── dussehra.html
    ├── raksha-bandhan.html
    ├── janmashtami.html
    ├── buddha-purnima.html
    ├── christmas.html
    ├── eid.html
    └── birthday.html
```

---

## How to Use It Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/yourusername/festival-wishes-generator.git
   ```
2. Open `index.html` in any modern web browser.
3. Or run a local static server:
   ```bash
   npx serve .
   ```

---

## How to Customize Templates

- Edit `css/style.css` to adjust color palettes, typography, and card designs.
- Modify templates or add new greeting layouts inside `js/app.js` or respective festival HTML files in the `festivals/` directory.

---

## How to Add a New Festival

1. Create a new HTML file in the `festivals/` folder (e.g., `pongal.html`).
2. Use the semantic HTML structure from existing festival pages (include H1, H2 headings, description, significance, and template examples).
3. Add the festival card to the homepage (`index.html`) and update `js/app.js` if necessary.

---

## How to Deploy on GitHub Pages

1. Push your repository to GitHub.
2. Go to your repository **Settings** > **Pages**.
3. Under **Source**, select **Deploy from a branch** (choose `main` and `/ (root)`).
4. Save and your site will be live at `https://<your-username>.github.io/festival-wishes-generator/`.

---

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to add new festival templates, improve accessibility, or fix bugs.

---

## License

Distributed under the [MIT License](LICENSE).
