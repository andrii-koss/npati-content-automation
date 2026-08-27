(function (blocks, element, components, blockEditor, i18n) {
  "use strict";
  if (!blocks || !element) return;
  const el = element.createElement,
    InspectorControls = blockEditor.InspectorControls;
  blocks.registerBlockType("npati/store-link", {
    title: i18n.__("NPATI Store Link", "npati-content-automation"),
    icon: "store",
    category: "widgets",
    attributes: {
      text: { type: "string", default: "View my store on NPATI" },
      newTab: { type: "boolean", default: true },
      style: { type: "string", default: "link" },
    },
    edit: function (p) {
      return el(
        "div",
        {},
        el(
          InspectorControls,
          {},
          el(
            components.PanelBody,
            { title: "NPATI" },
            el(components.TextControl, {
              label: "Text",
              value: p.attributes.text,
              onChange: (v) => p.setAttributes({ text: v }),
            }),
            el(components.ToggleControl, {
              label: "Open in new tab",
              checked: p.attributes.newTab,
              onChange: (v) => p.setAttributes({ newTab: v }),
            }),
          ),
        ),
        el("p", {}, p.attributes.text),
      );
    },
    save: function () {
      return null;
    },
  });
  blocks.registerBlockType("npati/listings", {
    title: i18n.__("NPATI Listings", "npati-content-automation"),
    icon: "grid-view",
    category: "widgets",
    attributes: {
      limit: { type: "number", default: 6 },
      category: { type: "string", default: "" },
      mode: { type: "string", default: "latest" },
    },
    edit: function (p) {
      return el(
        "div",
        {},
        el(
          InspectorControls,
          {},
          el(
            components.PanelBody,
            { title: "NPATI" },
            el(components.RangeControl, {
              label: "Listings",
              min: 1,
              max: 24,
              value: p.attributes.limit,
              onChange: (v) => p.setAttributes({ limit: v }),
            }),
            el(components.TextControl, {
              label: "Category slug",
              value: p.attributes.category,
              onChange: (v) => p.setAttributes({ category: v }),
            }),
          ),
        ),
        el(
          "p",
          {},
          i18n.__(
            "NPATI Listings (server-rendered)",
            "npati-content-automation",
          ),
        ),
      );
    },
    save: function () {
      return null;
    },
  });
})(
  window.wp.blocks,
  window.wp.element,
  window.wp.components,
  window.wp.blockEditor,
  window.wp.i18n,
);
