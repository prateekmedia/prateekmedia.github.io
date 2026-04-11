function loadBlog(mdPath) {
  var container = document.getElementById('blog-content');

  fetch(mdPath)
    .then(function(r) {
      if (!r.ok) throw new Error('Not found');
      return r.text();
    })
    .then(function(md) {
      container.innerHTML = renderMarkdown(md);
      buildToc(container);
    })
    .catch(function() {
      container.innerHTML = '<p>Post not found.</p>';
    });

  function parseFrontmatter(src) {
    var meta = {};
    if (src.startsWith('---\n')) {
      var end = src.indexOf('\n---', 4);
      if (end !== -1) {
        src.substring(4, end).split('\n').forEach(function(l) {
          var idx = l.indexOf(':');
          if (idx !== -1) meta[l.substring(0, idx).trim()] = l.substring(idx + 1).trim();
        });
        src = src.substring(end + 4).replace(/^\n+/, '');
      }
    }
    return { meta: meta, body: src };
  }

  function renderMarkdown(src) {
    var parsed = parseFrontmatter(src);
    var meta = parsed.meta;
    var lines = parsed.body.split('\n');
    var html = '';
    var inList = false;
    var inCode = false;
    var codeBlock = '';

    if (meta.title) {
      html += '<h1>' + escapeHtml(meta.title) + '</h1>';
    }
    if (meta.date) {
      html += '<p class="blog-meta">' + escapeHtml(meta.date) + '</p>';
    }

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      if (line.trimStart().startsWith('```')) {
        if (inCode) {
          html += '<pre><code>' + escapeHtml(codeBlock) + '</code></pre>';
          codeBlock = '';
          inCode = false;
        } else {
          if (inList) { html += '</ul>'; inList = false; }
          inCode = true;
        }
        continue;
      }

      if (inCode) {
        codeBlock += (codeBlock ? '\n' : '') + line;
        continue;
      }

      if (inList && !line.match(/^- /)) {
        html += '</ul>';
        inList = false;
      }

      if (line.match(/^# /)) {
        var text = line.slice(2);
        html += '<h1 id="' + slugify(text) + '">' + inline(text) + '</h1>';
        continue;
      }
      if (line.match(/^## /)) {
        var text = line.slice(3);
        html += '<h2 id="' + slugify(text) + '">' + inline(text) + '</h2>';
        continue;
      }
      if (line.match(/^### /)) {
        var text = line.slice(4);
        html += '<h3 id="' + slugify(text) + '">' + inline(text) + '</h3>';
        continue;
      }

      if (line.match(/^- /)) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += '<li>' + inline(line.slice(2)) + '</li>';
        continue;
      }

      if (line.trim() === '') continue;

      html += '<p>' + inline(line) + '</p>';
    }

    if (inList) html += '</ul>';
    if (inCode) html += '<pre><code>' + escapeHtml(codeBlock) + '</code></pre>';

    return html;
  }

  function inline(text) {
    text = escapeHtml(text);
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return text;
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function buildToc(container) {
    var headings = container.querySelectorAll('h1, h2');
    if (headings.length < 3) return;

    var toc = document.createElement('nav');
    toc.className = 'blog-toc';
    var first = true;

    for (var i = 0; i < headings.length; i++) {
      var h = headings[i];
      if (first && h.tagName === 'H1') { first = false; continue; }

      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      if (h.tagName === 'H2') a.className = 'toc-sub';
      toc.appendChild(a);
    }

    var anchor = container.querySelector('.blog-meta') || container.querySelector('h1');
    if (anchor && anchor.nextSibling) {
      container.insertBefore(toc, anchor.nextSibling);
    } else if (anchor) {
      container.appendChild(toc);
    }
  }
}
