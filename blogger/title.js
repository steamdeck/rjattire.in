 function getRandomPosition() {
      const x = Math.random() * (window.innerWidth - 150);
      const y = Math.random() * (window.innerHeight - 100);
      return { x, y };
    }

    function generateHTMLStringOnly() {
      const text = document.getElementById('sourceText')?.innerText || 'Default Text';
      const elements = [
        ['<p>', '</p>'],
        ['<b>', '</b>'],
        ['<u>', '</u>'],
        ['<i>', '</i>'],
        ['<h1>', '</h1>'],
        ['<h2>', '</h2>'],
        ['<h3>', '</h3>']
      ];

      let htmlContent = '';

      elements.forEach(tag => {
        const { x, y } = getRandomPosition();
        htmlContent += `<div style="position: absolute; top: ${y}px; left: ${x}px;">${tag[0]}${text}${tag[1]}</div>\n`;
      });

      const { x: xTable, y: yTable } = getRandomPosition();
      htmlContent += `<div style="position: absolute; top: ${yTable}px; left: ${xTable}px;">
        <table border="1" cellpadding="5">
          <tr><th>Title</th></tr>
          <tr><td>${text}</td></tr>
        </table>
      </div>\n`;

      const { x: xUl, y: yUl } = getRandomPosition();
      htmlContent += `<div style="position: absolute; top: ${yUl}px; left: ${xUl}px;">
        <ul>
          <li>${text} 1</li>
          <li>${text} 2</li>
          <li>${text} 3</li>
        </ul>
      </div>\n`;

      const { x: xOl, y: yOl } = getRandomPosition();
      htmlContent += `<div style="position: absolute; top: ${yOl}px; left: ${xOl}px;">
        <ol>
          <li>${text} A</li>
          <li>${text} B</li>
          <li>${text} C</li>
        </ol>
      </div>\n`;

      // ✅ Render HTML content instead of showing it as code
      document.getElementById('codeOutput').innerHTML = htmlContent;
    }

    window.onload = () => {
      if (document.getElementById('sourceText')) {
        generateHTMLStringOnly();
      }
    };
