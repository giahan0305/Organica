const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000; // You can change this to any port you prefer
const route = require("./router/index.js");
const connectDB = require("./models/config.js");
const Handlebars = require("handlebars"); // Import Handlebars here
// Set up Handlebars with .hbs extension
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      formatCurrency(value) {
        if (typeof value !== "number") return value;
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      formatDauCoveInfo: function (content) {
        const lines = content.trim().split("\n");
        const modifiedLine = lines.map((line) => {
          if (line === line.toUpperCase()) {
            return `<h2 class="mt-3">${line}:</h2>`;
          } else {
            return `<p>${line}</p>`;
          }
        });

        const formattedInfo = modifiedLine.join("");
        // // Formatthe information into an HTML string
        // const formattedInfo = sections
        //   .map((section) => {
        //     const lines = section.trim().split("\n");
        //     const title = lines.shift(); // Extract title from the first line
        //     const content = lines.join("<br>"); // Join remaining lines as content
        //     return `
        //     <div class="section">
        //       <p>${title}</p>
        //       <p>${content}</p>
        //     </div>
        //   `;
        //   })
        //   .join("");

        // Return the formatted HTML string
        return new Handlebars.SafeString(formattedInfo);
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//Configure
connectDB();

// Define a route
route(app);

// Start the server
app.listen(port, () => {
  console.log(`Organica app listening at http://localhost:${port}`);
});
