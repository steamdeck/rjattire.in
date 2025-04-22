document.addEventListener("DOMContentLoaded", function() {
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
      const rows = shuffle(data.filter(row => row.Text && row.URL));
      const getRandomRow = () => rows[Math.floor(Math.random() * rows.length)];
      const blocks = [];

      // <li>
      const liCount = getRandomInt(5, 11);
      const liItems = [];
      for (let i = 0; i < liCount; i++) {
        liItems.push(`<li><a href="${getRandomRow().URL}">${getRandomRow().Text}</a></li>`);
      }
      blocks.push(`<ul>${liItems.join("")}</ul>`);

      // <blockquote>
      for (let i = 0; i < getRandomInt(3, 3); i++) {
        const row = getRandomRow();
        blocks.push(`<blockquote><em>${row.Text}</em> - <a href="${row.URL}">Read more</a></blockquote>`);
      }

      // <strong>
      for (let i = 0; i < getRandomInt(2, 5); i++) {
        const row = getRandomRow();
        blocks.push(`<p><strong><a href="${row.URL}" target="_blank">${row.Text}</a></strong></p>`);
      }

      // <em>
      for (let i = 0; i < getRandomInt(2, 5); i++) {
        const row = getRandomRow();
        blocks.push(`<p><em>${row.Text}</em> — <a href="${row.URL}">Explore</a></p>`);
      }

      // <article>
      const articleRow = getRandomRow();
      blocks.push(`<article><header><h3>${articleRow.Text}</h3></header><footer><a href="${articleRow.URL}">Visit</a></footer></article>`);

      // <h1>
      const h1Row = getRandomRow();
      blocks.push(`<h1><a href="${h1Row.URL}">${h1Row.Text}</a></h1>`);

      // <h2>
      for (let i = 0; i < getRandomInt(2, 5); i++) {
        const row = getRandomRow();
        blocks.push(`<h2><a href="${row.URL}">${row.Text}</a></h2>`);
      }

      // <h3>
      for (let i = 0; i < getRandomInt(2, 5); i++) {
        const row = getRandomRow();
        blocks.push(`<h3><a href="${row.URL}">${row.Text}</a></h3>`);
      }

      // <table>
      const tableRows = [];
      const trCount = getRandomInt(2, 9);
      for (let i = 0; i < trCount; i++) {
        const row = getRandomRow();
        tableRows.push(`<tr><td><a href="${row.URL}">${row.Text}</a></td></tr>`);
      }
      blocks.push(`<table>${tableRows.join("")}</table>`);

      // 4 clickable random images with random href
      const imageRows = [];
      while (imageRows.length < 4) {
        const row = getRandomRow();
        if (row.IMGURL) imageRows.push(row);
      }

      imageRows.forEach(imgRow => {
        const linkRow = getRandomRow();
        blocks.splice(
          Math.floor(Math.random() * (blocks.length + 1)),
          0,
          `<a href="${linkRow.URL}" target="_blank">
             <img src="${imgRow.IMGURL}" alt="${imgRow.Text}" title="${imgRow.Text}" 
             style="max-width:100%;height:auto;border-radius:12px;margin:10px 0;">
           </a>`
        );
      });

      // Final shuffle for true randomness in placement
      const finalHTML = shuffle(blocks).join("\n");
      document.getElementById("randomArticle").innerHTML = finalHTML;
    })
    .catch(err => {
      console.error("Error:", err);
      document.getElementById("randomArticle").innerHTML = "Failed to load content.";
    });
});
