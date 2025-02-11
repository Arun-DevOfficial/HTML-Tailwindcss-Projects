document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("markdown-input");
  const preview = document.getElementById("markdown-preview");

  input.addEventListener("input", () => {
    const markdownText = input.value;
    preview.innerHTML = marked(markdownText);
  });
});
