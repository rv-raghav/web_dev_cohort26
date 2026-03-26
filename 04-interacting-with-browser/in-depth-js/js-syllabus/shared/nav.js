function show(n, total) {
    document.querySelectorAll('.section').forEach((s, i) => s.classList.toggle('visible', i === n));
    document.querySelectorAll('.nav-btn').forEach((b, i) => b.classList.toggle('active', i === n));
    const pct = Math.round(((n + 1) / total) * 100);
    const fill = document.getElementById('progress-fill');
    const label = document.getElementById('progress-label');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = (n + 1) + '/' + total;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}