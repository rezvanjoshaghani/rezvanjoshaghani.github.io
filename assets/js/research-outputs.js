(function () {
  const sectionMap = {
    publications: 'publications-list',
    code: 'code-list',
    slides: 'slides-list',
    demos: 'demos-list',
    datasets: 'datasets-list'
  };

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderCard(item) {
    const title = escapeHTML(item.title || 'Untitled');
    const description = escapeHTML(item.description || '');
    const authors = escapeHTML(item.authors || '');
    const venue = escapeHTML(item.venue || '');
    const year = escapeHTML(item.year || '');
    const url = item.url ? `<p><a href="${escapeHTML(item.url)}">View resource</a></p>` : '';

    return `
      <article class="output-card">
        <h3>${title}</h3>
        ${authors ? `<p><strong>Authors:</strong> ${authors}</p>` : ''}
        ${venue ? `<p><strong>Venue:</strong> ${venue}</p>` : ''}
        ${year ? `<p><strong>Year:</strong> ${year}</p>` : ''}
        ${description ? `<p>${description}</p>` : ''}
        ${url}
      </article>
    `;
  }

  function renderSection(items, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!Array.isArray(items) || items.length === 0) {
      container.innerHTML = '<p>No entries available yet.</p>';
      return;
    }

    container.innerHTML = items.map(renderCard).join('');
  }

  fetch('data/research-outputs.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Unable to load research outputs data.');
      }
      return response.json();
    })
    .then(function (data) {
      Object.keys(sectionMap).forEach(function (key) {
        renderSection(data[key], sectionMap[key]);
      });
    })
    .catch(function () {
      Object.values(sectionMap).forEach(function (containerId) {
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = '<p>Research outputs could not be loaded. Please try again later.</p>';
        }
      });
    });
})();
