# Kendre Lab website

Precision Medicine and Oncology Laboratory
Department of Life Science, National Institute of Technology Rourkela

Static HTML, CSS and JavaScript. No build step, no dependencies, no server. Open `index.html` in a browser and it works.

---

## Where things are

```
kendre-lab/
├── index.html          Homepage — hero, about, research areas, featured papers, news
├── research.html       Three research themes in detail + disease focus
├── pi.html             Dr. Gajanan Kendre's profile
├── team.html           Group members, with click-through biographies
├── publications.html   Full publication list, DOI-linked
├── positions.html      Prospective students, sponsored projects
├── gallery.html        Lab photographs
├── resources.html      Teaching and lab resources
├── contact.html        Address, map, contact details
├── 404.html            Shown for mistyped URLs
├── assets/
│   ├── css/style.css   Every style, in one commented file
│   ├── js/main.js      Navigation, slider, modals, image fallbacks
│   └── images/         Logo, team photos, gallery
├── DEPLOY.md           How to publish free on GitHub Pages
└── IMAGES-TODO.md      Which photos to add and where
```

---

## Editing

Each page is one self-contained HTML file. To change wording, open the file in any text editor and edit the text between the tags.

**Adding a team member:** open `team.html`, copy an existing `<button class="member">` block and its matching `<div class="modal">` block, then change the name, role, `data-modal-open` / `id` pair (they must match), image filename and initials.

**Adding a publication:** open `publications.html` and copy an `<article class="pub">` block.

**Adding news:** open `index.html` and copy a `<div class="news-item">` block.

**Changing colours:** every colour is defined once at the top of `assets/css/style.css` under `:root`. Change `--blue-600` and the accent colour there and it updates across all nine pages.

---

## Notes left for you

I flagged several things that need your judgement — a phone number that appeared as two different numbers, text that was copied from another lab's website, funding details worth verifying. These notes are hidden from visitors.

To read them, add `?notes` to any page URL:

```
index.html?notes
team.html?notes
contact.html?notes
```

They'll appear as yellow boxes. Once you've dealt with one, delete its `<div class="editor-note">...</div>` block from the HTML.

---

## Browser support

Works in current versions of Chrome, Firefox, Safari and Edge, on desktop and mobile. The navigation collapses to a slide-out menu below 900 px wide.

Accessibility: keyboard-navigable throughout, skip link, ARIA labels on interactive elements, and `prefers-reduced-motion` respected for the slideshow.

---

## Credit

The first version of this site was designed and built by **Diwakar Kumar**, a project student in the lab. This version keeps his content and structure, rebuilt on a new foundation.
