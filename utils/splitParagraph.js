function splitParagraph(paragraph) {
  // Define the headings
  const headings = ["CÔNG DỤNG", "CÁCH SỬ DỤNG", "LƯỢNG DÙNG", "CÁCH BẢO QUẢN"];

  // Create a regular expression to match these headings
  const regex = new RegExp(`(${headings.join("|")})`, "g");

  // Split the paragraph based on the headings
  const parts = paragraph.split(regex);

  // Initialize an object to hold the sections
  const sections = {};

  // Iterate over the parts to build the sections object
  let currentHeading = "";
  parts.forEach((part) => {
    part = part.trim();
    if (headings.includes(part)) {
      currentHeading = part;
      sections[currentHeading] = "";
    } else if (currentHeading) {
      sections[currentHeading] += part;
    }
  });

  // Return the sections object
  return sections;
}
module.exports = splitParagraph;
