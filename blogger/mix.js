 function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function generateHTMLStringOnly() {
    const text = document.getElementById('sourceText')?.innerText || 'Default Text';
    const elements = shuffleArray([
      `<p class="item">${text}</p>`,
      `<b class="item">${text}</b>`,
      `<u class="item">${text}</u>`,
      `<i class="item">${text}</i>`,
      `<h1 class="item">${text}</h1>`,
      `<h2 class="item">${text}</h2>`,
      `<h3 class="item">${text}</h3>`,
      `<div class="item"><table><tr><th>Title</th></tr><tr><td>${text}</td></tr></table></div>`,
      `<div class="item"><ul><li>${text} 1</li><li>${text} 2</li><li>${text} 3</li></ul></div>`,
      `<div class="item"><ol><li>${text} A</li><li>${text} B</li><li>${text} C</li></ol></div>`
    ]);
    const withJitter = elements.map(el => {
      const offset = Math.floor(Math.random() * 20) - 10;
      return el.replace('class="item"', `class="item" style="left: ${offset}px"`);
    });
    document.getElementById('codeOutput').innerHTML = withJitter.join('\n');
  }

  document.addEventListener("DOMContentLoaded", function () {
    generateHTMLStringOnly();

    const sheetID = "1mEvctcgkjIY7_Z_rdnpxUcWGVf8ePWQAVrJVVhFooJo";
    const tabName = "Sheet1";
    const url = `https://opensheet.elk.sh/${sheetID}/${tabName}`;

    function shuffle(array) {
      const arr = array.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const texts = data.filter(row => row.Text).map(row => row.Text);
        const urls = data.filter(row => row.URL).map(row => row.URL);
        const images = data.filter(row => row.IMGURL);

        const getRandomText = () => texts[Math.floor(Math.random() * texts.length)];
        const getRandomURL = () => urls[Math.floor(Math.random() * urls.length)];

        const blocks = [];

        const liCount = getRandomInt(5, 11);
        const liItems = [];
        for (let i = 0; i < liCount; i++) {
          liItems.push(`<li><a href="${getRandomURL()}">${getRandomText()}</a></li>`);
        }
        blocks.push(`<ul>${liItems.join("")}</ul>`);

        for (let i = 0; i < 3; i++) {
          blocks.push(`<blockquote><em>${getRandomText()}</em> - <a href="${getRandomURL()}">Read more</a></blockquote>`);
        }

        for (let i = 0; i < getRandomInt(2, 5); i++) {
          blocks.push(`<p><strong><a href="${getRandomURL()}" target="_blank">${getRandomText()}</a></strong></p>`);
        }

        for (let i = 0; i < getRandomInt(2, 5); i++) {
          blocks.push(`<p><em>${getRandomText()}</em> — <a href="${getRandomURL()}">Explore</a></p>`);
        }

        blocks.push(`<article><header><h3>${getRandomText()}</h3></header><footer><a href="${getRandomURL()}">Visit</a></footer></article>`);

        blocks.push(`<h1><a href="${getRandomURL()}">${getRandomText()}</a></h1>`);

        for (let i = 0; i < getRandomInt(2, 5); i++) {
          blocks.push(`<h2><a href="${getRandomURL()}">${getRandomText()}</a></h2>`);
        }

        for (let i = 0; i < getRandomInt(2, 5); i++) {
          blocks.push(`<h3><a href="${getRandomURL()}">${getRandomText()}</a></h3>`);
        }

        const tableRows = [];
        for (let i = 0; i < getRandomInt(2, 9); i++) {
          tableRows.push(`<tr><td><a href="${getRandomURL()}">${getRandomText()}</a></td></tr>`);
        }
        blocks.push(`<table>${tableRows.join("")}</table>`);

        const imageBlocks = [];
        while (imageBlocks.length < 4 && images.length > 0) {
          const imgRow = images[Math.floor(Math.random() * images.length)];
          imageBlocks.push(`<a href="${getRandomURL()}" target="_blank">
                              <img src="${imgRow.IMGURL}" alt="${imgRow.Text}" title="${imgRow.Text}">
                            </a>`);
        }
        imageBlocks.forEach(img => {
          blocks.splice(Math.floor(Math.random() * (blocks.length + 1)), 0, img);
        });

        const sourceText = document.getElementById('sourceText')?.outerHTML || "";
        const h2Text = document.querySelector('h2')?.outerHTML || "";
        const codeOutput = document.getElementById('codeOutput')?.outerHTML || "";

        blocks.splice(Math.floor(Math.random() * (blocks.length + 1)), 0, sourceText);
        blocks.splice(Math.floor(Math.random() * (blocks.length + 1)), 0, h2Text);
        blocks.splice(Math.floor(Math.random() * (blocks.length + 1)), 0, codeOutput);

        const finalHTML = shuffle(blocks).join("\n");
        document.getElementById("randomArticle").innerHTML = finalHTML;
      })
      .catch(err => {
        console.error("Error:", err);
        document.getElementById("randomArticle").innerHTML = "Failed to load content.";
      });
  });
