 <script>
    function getRandomPosition() {
      const x = Math.random() * (window.innerWidth - 150);
      const y = Math.random() * (window.innerHeight - 100);
      return { x, y };
    }

    function generateHTML() {
      // Get the text from the HTML element
      const text = document.getElementById('sourceText')?.innerText || 'Default Text';
      console.log('Fetched text:', text); // Log the fetched text to debug

      // Clear the previous output to avoid duplication
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

      // Loop through each element and create it at a random position
      elements.forEach(tag => {
        const { x, y } = getRandomPosition();
        const elementHTML = `${tag[0]}${text}${tag[1]}`;
        
        // Create a new div for each element
        const element = document.createElement('div');
        element.innerHTML = elementHTML;
        element.style.position = 'absolute';
        element.style.top = `${y}px`;
        element.style.left = `${x}px`;

        // Append the element to the container
        container.appendChild(element);

        // Build the corresponding HTML output for display
        htmlContent += `<div style="position: absolute; top: ${y}px; left: ${x}px;">${elementHTML}</div>\n`;
      });

      // Add a table with the dynamic text
      const tableHTML = `
        <table border="1" cellpadding="5">
          <tr><th>Title</th></tr>
          <tr><td>${text}</td></tr>
        </table>
      `;
      const { x: xTable, y: yTable } = getRandomPosition();
      const table = document.createElement('div');
      table.innerHTML = tableHTML;
      table.style.position = 'absolute';
      table.style.top = `${yTable}px`;
      table.style.left = `${xTable}px`;
      container.appendChild(table);
      htmlContent += `<div style="position: absolute; top: ${yTable}px; left: ${xTable}px;">${tableHTML}</div>\n`;

      // Add an unordered list (UL) with the dynamic text
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
      ul.style.position = 'absolute';
      ul.style.top = `${yUl}px`;
      ul.style.left = `${xUl}px`;
      container.appendChild(ul);
      htmlContent += `<div style="position: absolute; top: ${yUl}px; left: ${xUl}px;">${ulHTML}</div>\n`;

      // Add an ordered list (OL) with the dynamic text
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
      ol.style.position = 'absolute';
      ol.style.top = `${yOl}px`;
      ol.style.left = `${xOl}px`;
      container.appendChild(ol);
      htmlContent += `<div style="position: absolute; top: ${yOl}px; left: ${xOl}px;">${olHTML}</div>\n`;

      // Display the HTML content
      htmlOutput.textContent = htmlContent;
    }

    // Auto-generate on load
    window.onload = () => {
      if (document.getElementById('sourceText')) {
        generateHTML();
      }
    };
  </script>
