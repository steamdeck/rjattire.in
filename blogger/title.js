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
        `<div class="item">
          <table border="1" cellpadding="5">
            <tr><th>Title</th></tr>
            <tr><td>${text}</td></tr>
          </table>
        </div>`,
        `<div class="item">
          <ul>
            <li>${text} 1</li>
            <li>${text} 2</li>
            <li>${text} 3</li>
          </ul>
        </div>`,
        `<div class="item">
          <ol>
            <li>${text} A</li>
            <li>${text} B</li>
            <li>${text} C</li>
          </ol>
        </div>`
      ]);

      // Optionally add a slight horizontal "jitter" for style
      const withJitter = elements.map(el => {
        const offset = Math.floor(Math.random() * 20) - 10; // -10 to +10 px
        return el.replace('class="item"', `class="item" style="left: ${offset}px"`);
      });

      document.getElementById('codeOutput').innerHTML = withJitter.join('\n');
    }

    window.onload = () => {
      generateHTMLStringOnly();
    };
