/**
 * Class representing a content item element (.cat-item)
 */
export class ContentItem {
  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.cat-item)
   * @param {PreviewItem} previewItemInstance - PreviewItem (.preview__item)
   */

  // DOM elements
  DOM = {
    // main element (.cat-item)
    el: null,
    // title (.cat-item-title)
    title: null,
    // title inner (.cat-item-title > .oh__inner)
    titleInner: null,
    // imgWrap (.cat-item-imgwrap)
    imgWrap: null,
    // image (.cat-item-img)
    img: null,
    // caption (.cat-item-caption)
    caption: null,
    // explore CTA (.cat-item__explore)
    exploreCTA: null,
  };

  constructor(DOM_el) {
    this.previewItem = null;
    this.DOM.el = DOM_el;
    this.DOM.title = this.DOM.el.querySelector(".cat-item-title");
    this.DOM.titleInner = this.DOM.title.querySelector(".oh__inner");
    this.DOM.imgWrap = this.DOM.el.querySelector(".cat-item-img-wrap");
    this.DOM.img = this.DOM.el.querySelector(".cat-item-img");
    this.DOM.caption = this.DOM.el.querySelector(".cat-item-caption");
    this.DOM.exploreCTA = this.DOM.el.querySelector(".cat-item__explore");
  }

  updatePreviewItem(previewItemInstance) {
    this.previewItem = previewItemInstance;
  }
}
