 const sheetID = "1mEvctcgkjIY7_Z_rdnpxUcWGVf8ePWQAVrJVVhFooJo";
  const tabName = "Sheet1";
  const url = `https://opensheet.elk.sh/${sheetID}/${tabName}`;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function randomWrap(text, url) {
    const wrappers = [
      t => `<p><strong><a href="${url}" target="_blank">${t}</a></strong></p>`,
      t => `<blockquote><em>${t}</em> - <a href="${url}">Read more</a></blockquote>`,
      t => `<ul><li><a href="${url}">${t}</a></li></ul>`,
      t => `<p><b><u><a href="${url}">${t}</a></u></b></p>`,
      t => `<h2><a href="${url}">${t}</a></h2>`,
      t => `<table><tr><td><a href="${url}">${t}</a></td></tr></table>`,
      t => `<p><i>${t}</i> — <a href="${url}">Explore</a></p>`,
      t => `<article><header><h3>${t}</h3></header><footer><a href="${url}">Visit</a></footer></article>`
    ];
    const pick = wrappers[Math.floor(Math.random() * wrappers.length)];
    return pick(text);
  }

  // Function to fetch random image from the XML sitemap
  function fetchRandomImage() {
    return fetch("https://rjattire.in/sitemap_products_2.xml?from=9612373819639&to=9638349537527")
      .then(response => response.text())
      .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        // Extract all image URLs from <image:loc> tags
        const imageElements = xmlDoc.getElementsByTagName("image:loc");
        const imageUrls = Array.from(imageElements).map(el => el.textContent);

        // Pick a random image URL
        return imageUrls[Math.floor(Math.random() * imageUrls.length)];
      })
      .catch(() => "https://rjattire.in/cdn/shop/files/rj_attire_logo.png?v=1724412913&width=400"); // Fallback image in case of error
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const texts = shuffle(data.map(row => row["Text"]).filter(Boolean));
      const links = shuffle(data.map(row => row["URL"]).filter(Boolean));

      console.log("Fetched Texts:", texts); // Debug

      const count = Math.min(texts.length, links.length, 10);
      const sentenceLength = Math.floor(Math.random() * 4) + 5;
      const sentenceWords = texts.slice(0, sentenceLength);
      const randomSentence = sentenceWords.join(" ") + ".";

      // Generate HTML
      let html = `<section><h4>Today's Highlight:</h4><p>${randomSentence}</p></section><main>`;
      const articles = [];

      // Loop through and prepare articles with random images
      const articlePromises = [];
      for (let i = 0; i < count; i++) {
        const text = texts[i];
        const link = links[i];

        // Fetch a random image for each article
        const articlePromise = fetchRandomImage().then(image => {
          // Generate HTML for the article
          html += randomWrap(text, link);

          // Prepare JSON-LD article structure
         // Prepare JSON-LD article structure
articles.push({
  "@type": "Article",
  "headline": text,
  "mainEntityOfPage": link,
  "url": link, // Adding the "url" field
  "image": image,
  "author": {
    "@type": "Person",
    "name": "RJ Attire",
    "url": "https://rjattire.in" // Add the URL for the author (website of RJ Attire)
  },
  "publisher": {
    "@type": "Organization",
    "name": "RJ Attire",
    "url": "https://rjattire.in", // Add the URL for the publisher (website of RJ Attire)
    "logo": {
      "@type": "ImageObject",
      "url": "https://rjattire.in/cdn/shop/files/rj_attire_logo.png?v=1724412913&width=400"
    }
  }
});

        });

        articlePromises.push(articlePromise);
      }

      // Wait for all images to be fetched and articles to be processed
      Promise.all(articlePromises).then(() => {
        html += "</main>";

        // Inject the content into the page
        document.getElementById("randomArticle").innerHTML = html;

        // Inject JSON-LD schema
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.innerHTML = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Random Articles",
          "description": "A curated list of insightful, fun, or inspirational articles refreshed randomly.",
          "mainEntity": articles
        });
        document.head.appendChild(script);
      });
    })
    .catch(err => {
      console.error("Error fetching sheet data:", err);
      document.getElementById("randomArticle").innerHTML = "Could not load content.";
    });
