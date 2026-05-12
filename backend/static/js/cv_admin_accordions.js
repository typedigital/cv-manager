(function () {
    'use strict';

    /* ── General Tab: Felder in Sektionen gruppieren ────────────────────────── */

    var GENERAL_SECTIONS = [
        {
            label: 'Persönliche Daten',
            fields: ['field-slug', 'field-first_name', 'field-last_name', 'field-label', 'field-image'],
        },
        {
            label: 'Kontakt',
            fields: ['field-email', 'field-website', 'field-summary', 'field-experience'],
        },
        {
            label: 'Adresse',
            fields: ['field-address', 'field-postal_code', 'field-city', 'field-country_code'],
        },
        {
            label: 'Design',
            fields: ['field-primary_color', 'field-accent_color'],
        },
    ];

    function initGeneralAccordions() {
        var tab = document.getElementById('general-tab');
        if (!tab) return;

        var container = tab.querySelector('.p-5');
        if (!container) return;

        GENERAL_SECTIONS.forEach(function (section, idx) {
            var fieldEls = section.fields
                .map(function (cls) { return container.querySelector('.' + cls); })
                .filter(Boolean);

            if (!fieldEls.length) return;

            var startOpen = idx === 0;

            var wrapper = document.createElement('div');
            wrapper.className = 'cv-section' + (startOpen ? '' : ' cv-section-collapsed');

            var header = document.createElement('div');
            header.className = 'cv-section-header';
            header.innerHTML =
                '<span class="cv-section-icon">▼</span>' +
                '<span>' + section.label + '</span>';

            header.addEventListener('click', function () {
                wrapper.classList.toggle('cv-section-collapsed');
            });

            var content = document.createElement('div');
            content.className = 'cv-section-content';

            fieldEls[0].parentNode.insertBefore(wrapper, fieldEls[0]);
            wrapper.appendChild(header);
            wrapper.appendChild(content);
            fieldEls.forEach(function (el) { content.appendChild(el); });
        });
    }

    /* ── Inline-Accordions (Work Experiences, Educations, Skill Categories) ─── */

    function hasErrors(el) {
        return !!el.querySelector('.errorlist, .has-error');
    }

    function setupInlineAccordion(item, startOpen) {
        if (item.dataset.accordionInit) return;

        var h3 = item.querySelector('h3.djn-drag-handler');
        // Alle direkten Kinder außer h3 und hidden inputs (z.B. FK-Felder) einsammeln
        var contentEls = Array.from(item.children).filter(function (child) {
            return child.tagName !== 'H3' &&
                !(child.tagName === 'INPUT' && child.type === 'hidden');
        });

        if (!h3 || !contentEls.length) return;

        item.dataset.accordionInit = 'true';

        // Chevron-Icon als erstes Kind in h3 einfügen
        var icon = document.createElement('span');
        icon.className = 'cv-inline-icon';
        icon.textContent = '▼';
        h3.insertBefore(icon, h3.firstChild);

        // Bei Validierungsfehlern immer aufklappen
        var open = startOpen || hasErrors(item);

        if (!open) {
            contentEls.forEach(function (el) { el.style.display = 'none'; });
            icon.classList.add('cv-inline-icon--collapsed');
        }

        h3.addEventListener('click', function (e) {
            // Klick auf Delete-Checkbox nicht abfangen
            if (e.target.closest('.delete, .djn-delete-handler')) return;

            var isHidden = contentEls[0].style.display === 'none';
            contentEls.forEach(function (el) { el.style.display = isHidden ? '' : 'none'; });
            icon.classList.toggle('cv-inline-icon--collapsed', !isHidden);
        });
    }

    function initInlineAccordions() {
        ['work-experiences-tab', 'educations-tab', 'skill-categorys-tab'].forEach(function (tabId) {
            var tab = document.getElementById(tabId);
            if (!tab) return;

            tab.querySelectorAll('.djn-inline-form.has_original').forEach(function (item) {
                setupInlineAccordion(item, false); // bestehende Einträge: eingeklappt
            });
        });
    }

    /* ── Neu hinzugefügte Inlines beobachten ────────────────────────────────── */

    function observeNewInlines() {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                m.addedNodes.forEach(function (node) {
                    if (node.nodeType !== 1) return;
                    if (
                        node.classList.contains('djn-inline-form') &&
                        !node.classList.contains('djn-empty-form') &&
                        !node.classList.contains('empty-form')
                    ) {
                        // Neu angelegte Einträge starten aufgeklappt
                        setupInlineAccordion(node, true);
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    /* ── Init ───────────────────────────────────────────────────────────────── */

    // window.load statt DOMContentLoaded: django-nested-admin initialisiert
    // verschachtelte Inlines (Skill Items) erst nach DOMContentLoaded, was
    // unsere Click-Handler überschreiben würde.
    window.addEventListener('load', function () {
        initGeneralAccordions();
        initInlineAccordions();
        observeNewInlines();
    });

}());
