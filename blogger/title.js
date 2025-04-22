    function getRandomPosition() {
      const x = Math.random() * (window.innerWidth - 150);
      const y = Math.random() * (window.innerHeight - 50);
      return { x, y };
    }

    function generateHTML() {
      const text = 'Sample Text'; // Static default text
      const container = document.getElementById('outputContainer');
      const htmlOutput = document.getElementById('htmlOutput');
      container.innerHTML = '';
      htmlOutput.textContent = '';

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
        const elementHTML = `${tag[0]}${text}${tag[1]}`;
        const element = document.createElement('div');
        element.innerHTML = elementHTML;
        element.style.top = `${y}px`;
        element.style.left = `${x}px`;
        container.appendChild(element);

        htmlContent += `<div style="position: absolute; top: ${y}px; left: ${x}px;">${elementHTML}</div>\n`;
      });

      // Table
      const tableHTML = `
        <table border="1" cellpadding="5">
          <tr><th>Title</th></tr>
          <tr><td>${text}</td></tr>
        </table>
      `;
      const { x: xTable, y: yTable } = getRandomPosition();
      const table = document.createElement('div');
      table.innerHTML = tableHTML;
      table.style.top = `${yTable}px`;
      table.style.left = `${xTable}px`;
      container.appendChild(table);
      htmlContent += `<div style="position: absolute; top: ${yTable}px; left: ${xTable}px;">${tableHTML}</div>\n`;

      // Unordered List
      const ulHTML = `
        <ul>
          <li>${text} 1</li>
          <li>${text} 2</li>
          <li>${text} 3</li>
        </ul>
      `;
      const { x: xUl, y: yUl } = getRandomPosition();
      const ul = document.createElement('div');
      ul.innerHTML = ulHTML;
      ul.style.top = `${yUl}px`;
      ul.style.left = `${xUl}px`;
      container.appendChild(ul);
      htmlContent += `<div style="position: absolute; top: ${yUl}px; left: ${xUl}px;">${ulHTML}</div>\n`;

      // Ordered List
      const olHTML = `
        <ol>
          <li>${text} A</li>
          <li>${text} B</li>
          <li>${text} C</li>
        </ol>
      `;
      const { x: xOl, y: yOl } = getRandomPosition();
      const ol = document.createElement('div');
      ol.innerHTML = olHTML;
      ol.style.top = `${yOl}px`;
      ol.style.left = `${xOl}px`;
      container.appendChild(ol);
      htmlContent += `<div style="position: absolute; top: ${yOl}px; left: ${xOl}px;">${olHTML}</div>\n`;

      htmlOutput.textContent = htmlContent;
    }

    // Auto-run on reload
    window.onload = generateHTML;
  
