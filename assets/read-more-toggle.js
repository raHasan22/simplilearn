class ReadMoreToggle {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      charLimit: options.charLimit || 300,
      readMoreText: options.readMoreText || "Read More",
      readLessText: options.readLessText || "Read Less",
      ...options,
    };

    this.init();
  }

  init() {
    const contentElement = this.container.querySelector(
      ".nxt-course__description-content"
    );
    const toggleButton = this.container.querySelector(".nxt-course__readMore");

    if (!contentElement || !toggleButton) return;

    this.originalText = contentElement.textContent.trim();
    this.isExpanded = false;

    // Only apply read more if text is longer than limit
    if (this.originalText.length > this.options.charLimit) {
      this.truncatedText =
        this.originalText.substring(0, this.options.charLimit) + "...";

      // Set initial state
      contentElement.textContent = this.truncatedText;
      toggleButton.textContent = this.options.readMoreText;

      // Add click event
      toggleButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggle(contentElement, toggleButton);
      });
    } else {
      // Hide button if text is short enough
      toggleButton.style.display = "none";
    }
  }

  toggle(contentElement, toggleButton) {
    if (this.isExpanded) {
      // Collapse
      contentElement.textContent = this.truncatedText;
      toggleButton.textContent = this.options.readMoreText;
      this.isExpanded = false;
    } else {
      // Expand
      contentElement.textContent = this.originalText;
      toggleButton.textContent = this.options.readLessText;
      this.isExpanded = true;
    }
  }
}

// Initialize read more toggles when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const readMoreContainers = document.querySelectorAll(
    ".nxt-course__description"
  );

  readMoreContainers.forEach((container) => {
    // Get settings from data attributes
    const charLimit = parseInt(container.dataset.charLimit) || 300;
    const readMoreText = container.dataset.readMoreText || "Read More";
    const readLessText = container.dataset.readLessText || "Read Less";

    new ReadMoreToggle(container, {
      charLimit,
      readMoreText,
      readLessText,
    });
  });
});
