// 1-227 AB Deployment Guide — small, dependency-free interactivity.
(function () {
  "use strict";

  var accordions = Array.prototype.slice.call(document.querySelectorAll("details.accordion"));
  var sectionHeadings = Array.prototype.slice.call(document.querySelectorAll(".section-heading"));

  // Map each section heading to the accordions that follow it, up to the next heading.
  function headingGroups() {
    var groups = [];
    var current = null;
    Array.prototype.forEach.call(document.querySelector("main").children, function (el) {
      if (el.classList.contains("section-heading")) {
        current = { heading: el, items: [] };
        groups.push(current);
      } else if (el.matches && el.matches("details.accordion") && current) {
        current.items.push(el);
      }
    });
    return groups;
  }
  var groups = headingGroups();

  // ---- Expand all / Collapse all ----
  var expandBtn = document.getElementById("expand-all");
  var collapseBtn = document.getElementById("collapse-all");
  if (expandBtn) expandBtn.addEventListener("click", function () {
    accordions.forEach(function (d) { d.open = true; });
  });
  if (collapseBtn) collapseBtn.addEventListener("click", function () {
    accordions.forEach(function (d) { d.open = false; });
  });

  // ---- Search / filter ----
  var searchInput = document.getElementById("guide-search");
  var searchStatus = document.getElementById("search-status");
  var originalOpenState = new Map();
  accordions.forEach(function (d) { originalOpenState.set(d, d.open); });

  function clearHighlights(root) {
    var marks = root.querySelectorAll("mark.search-hit");
    marks.forEach(function (m) {
      var parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }

  function highlightText(node, term) {
    if (node.nodeType === Node.TEXT_NODE) {
      var idx = node.textContent.toLowerCase().indexOf(term);
      if (idx === -1) return false;
      var text = node.textContent;
      var frag = document.createDocumentFragment();
      frag.appendChild(document.createTextNode(text.slice(0, idx)));
      var mark = document.createElement("mark");
      mark.className = "search-hit";
      mark.textContent = text.slice(idx, idx + term.length);
      frag.appendChild(mark);
      frag.appendChild(document.createTextNode(text.slice(idx + term.length)));
      node.parentNode.replaceChild(frag, node);
      return true;
    }
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
      var found = false;
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (highlightText(child, term)) found = true;
      });
      return found;
    }
    return false;
  }

  var searchDebounce;
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(runSearch, 120);
    });
  }

  function runSearch() {
    var term = searchInput.value.trim().toLowerCase();
    var matches = 0;

    accordions.forEach(function (d) {
      clearHighlights(d);
    });

    if (!term) {
      accordions.forEach(function (d) { d.open = originalOpenState.get(d); d.style.display = ""; });
      sectionHeadings.forEach(function (h) { h.style.display = ""; });
      if (searchStatus) searchStatus.textContent = "";
      return;
    }

    accordions.forEach(function (d) {
      var text = d.textContent.toLowerCase();
      var hit = text.indexOf(term) !== -1;
      d.style.display = hit ? "" : "none";
      if (hit) {
        matches++;
        d.open = true;
        highlightText(d, term);
      }
    });

    groups.forEach(function (g) {
      var anyVisible = g.items.some(function (d) { return d.style.display !== "none"; });
      g.heading.style.display = anyVisible ? "" : "none";
    });

    if (searchStatus) {
      searchStatus.textContent = matches
        ? matches + " section" + (matches === 1 ? "" : "s") + " match “" + searchInput.value.trim() + "”"
        : "No matches for “" + searchInput.value.trim() + "”";
    }
  }

  // ---- Checklist persistence (per-device only, via localStorage) ----
  var checklist = document.getElementById("predeployment-checklist");
  if (checklist) {
    var boxes = Array.prototype.slice.call(checklist.querySelectorAll('input[type="checkbox"]'));
    var progressEl = document.getElementById("checklist-progress");
    var STORAGE_KEY = "attack-deployment-checklist-v1";

    function updateProgress() {
      var checked = boxes.filter(function (b) { return b.checked; }).length;
      if (progressEl) {
        progressEl.textContent = checked + " of " + boxes.length + " items checked";
      }
    }

    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      boxes.forEach(function (b) {
        if (saved[b.id]) b.checked = true;
      });
    } catch (e) { /* private browsing / storage blocked — ignore */ }

    boxes.forEach(function (b) {
      b.addEventListener("change", function () {
        updateProgress();
        try {
          var state = {};
          boxes.forEach(function (bb) { if (bb.checked) state[bb.id] = true; });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) { /* ignore */ }
      });
    });

    var resetBtn = document.getElementById("checklist-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        boxes.forEach(function (b) { b.checked = false; });
        updateProgress();
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
      });
    }

    updateProgress();
  }

  // ---- Print buttons on fillable forms ----
  Array.prototype.slice.call(document.querySelectorAll("[data-print-target]")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.print();
    });
  });

  // ---- Footer year ----
  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
