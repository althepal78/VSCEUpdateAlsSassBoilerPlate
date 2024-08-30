const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(
    'Congratulations, your extension "alsboilerplate" is now active!'
  );

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AlThePal78's SASS Boiler Plate</title>
    <script src="./src/js/site.js" defer></script>
    <link rel="stylesheet" href="./src/css/site.css">
</head>
<body>
<header>
<nav>
<ul>
  <a href="#hero"><li>hero</li></a>
  <a href="#about"><li>about</li></a>
  <a href="#youtube"><li>youtube</li></a>
</ul>  
</nav>
</header>

<main>
<section aria-labelledby="hero">
  <h2 id="hero">Hero Section</h2>
</section>
<section aria-labelledby="about">
  <h2 id="about">About Section</h2>
</section>
<section aria-labelledby="youtube">
  <h2 id="youtube">Youtube Section</h2>
</section>
</main>

<footer>
  Footer
</footer>

    <div class="container">
        You can delete this but test first
	  <p>Make sure you get the extension live sass compiler</p>
    </div>
</body>
</html>
`;

  const scssContent = `
@use 'base';
@use 'components';
@use 'layouts';
`;

  const resetContent = `
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin and padding */
 *{
  margin: 0;
  padding:0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul,
ol {
  list-style: none;
}
/* remove text decorations from anchor tags*/
a{
 text-decoration: none;
}

/* Set core root defaults */
html {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  line-height: 1.6;
   font-family: 'Roboto', sans-serif;
}


/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
  .container{
      color:white;
      background-color: purple;
      margin: 25px;
      font-size: xx-large;
  }
  `;
  const fontfaceContent = `
@font-face {
  font-family: 'Roboto';
  src: url('path/to/Roboto-Regular.woff') format('woff'),
       url('path/to/Roboto-Regular.ttf') format('truetype');
  font-weight: 400; /* Regular weight */
}
`;
  const cssContent = "";
  const jsContent = `
const div = document.querySelector('.container');

div.addEventListener('click', function(){
    div.innerHTML = 'yo son it worked'
})
`;

  const indexBase = `
@forward 'reset';
@forward 'font-face';
`;
  const indexComponents = `
@forward "nav";
@forward "button";
@forward "label";
`;
  const indexLayouts = `
@forward 'header';
@forward 'main';
@forward 'footer';
`;
  const indexAbstracts = `
@forward 'colors';
@forward 'breakpoints';
@forward 'mixins';
`;

  let disposable = vscode.commands.registerCommand(
    "alsboilerplate.createAlsBoilerPlates",
    function () {
      const folderPath = vscode.workspace.workspaceFolders[0].uri["fsPath"];
      // console.log(folderPath)

      // creates the index.html file
      fs.writeFile(path.join(folderPath, "index.html"), htmlContent, (err) => {
        if (err) {
          return vscode.window.showErrorMessage("Can not create index.html");
        }
      });

      // creates the src or source folder/directory

      fs.mkdir(folderPath + "\\src", function (err) {
        if (err) {
          console.log("can not create src folder/directory");
        }
      });

      // creates the js folder inside the src folder
      fs.mkdir(folderPath + "\\src\\js", function (err) {
        if (err) {
          console.log("can't create folder js inside src folder/directory");
        }
      });

      // creates the the path so that I can create the content into a file
      const jsPath = folderPath + "/src/js";

      // creates the js file site.js with the content inside
      fs.writeFile(path.join(jsPath, "/site.js"), jsContent, (err) => {
        if (err) {
          return vscode.window.showErrorMessage("can't create file site.js");
        }
      });

      // creates a css folder and then adds a file site.css
      fs.mkdir(folderPath + "\\src\\css", function (err) {
        if (err) {
          console.log("not working" + err);
        }
      });
      const cssPath = folderPath + "/src/css";

      fs.writeFile(path.join(cssPath, "/site.css"), cssContent, (err) => {
        if (err) {
          return vscode.window.showErrorMessage("can't create file site.scss");
        }
      });

      // creates the scss folder inside the src or source folder then add other model folders
      fs.mkdir(folderPath + "\\src\\scss", function (err) {
        if (err) {
          console.log("not working" + err);
        }
      });

      //creating or the sub folders for scss folder+

      fs.mkdir(folderPath + "\\src\\scss\\base", function (err) {
        if (err) {
          console.log("not working" + err);
        }
      });
      fs.mkdir(folderPath + "\\src\\scss\\components", function (err) {
        if (err) {
          console.log("not working" + err);
        }
      });
      fs.mkdir(folderPath + "\\src\\scss\\layouts", function (err) {
        if (err) {
          console.log("not working" + err);
        }
      });
      fs.mkdir(folderPath + "\\src\\scss\\abstracts", function (err) {
        if (err) {
          console.log("not working" + err);
        }
      });

      // creates the the path so that I can create the content and files int he perspective folders
      const scssPath = folderPath + "/src/scss";

      // all scss creating and adding to the proper folder
      // first file is site.css where everything will be called from besides abstracts
      fs.writeFile(path.join(scssPath, "/site.scss"), scssContent, (err) => {
        if (err) {
          return vscode.window.showErrorMessage("can't create file site.scss");
        }
      });

      //******************************************************************************************** */
      // next is the base folder files index.scss reset.scss and font-face.scssto give me all the info inside the folder
      const basePath = scssPath + "/base";

      fs.writeFile(path.join(basePath, "/_index.scss"), indexBase, (err) => {
        if (err) {
          return vscode.window.showErrorMessage(
            "can't create file index.scss inside of base"
          );
        }
      });

      fs.writeFile(path.join(basePath, "/_reset.scss"), resetContent, (err) => {
        if (err) {
          return vscode.window.showErrorMessage(
            "can't create file reset.scss inside of base"
          );
        }
      });

      fs.writeFile(
        path.join(basePath, "/_font-face.scss"),fontfaceContent, (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file fontface.scss inside of base"
            );
          }
        }
      );

      // ********************************************************************************
      // now we will creating the components files
      const componentsPath = scssPath + "/components";

      fs.writeFile(
        path.join(componentsPath, "/_index.scss"),
        indexComponents,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _index.scss inside of components"
            );
          }
        }
      );
      fs.writeFile(
        path.join(componentsPath, "/_nav.scss"),
        cssContent,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _nav.scss inside of components"
            );
          }
        }
      );
      fs.writeFile(
        path.join(componentsPath, "/_button.scss"),
        cssContent,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _button.scss inside of components"
            );
          }
        }
      );
      fs.writeFile(
        path.join(componentsPath, "/_label.scss"),
        cssContent,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _label.scss inside of components"
            );
          }
        }
      );
      // ********************************************************************************
      // now we will creating the layouts files and folder

      const layoutsPath = scssPath + "/layouts";
      fs.writeFile(
        path.join(layoutsPath, "/_index.scss"),
        indexLayouts,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _index.scss inside of layouts"
            );
          }
        }
      );

      fs.writeFile(
        path.join(layoutsPath, "/_header.scss"),
        cssContent,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _header.scss inside of layouts"
            );
          }
        }
      );
      fs.writeFile(path.join(layoutsPath, "/_main.scss"), cssContent, (err) => {
        if (err) {
          return vscode.window.showErrorMessage(
            "can't create file _main.scss inside of layouts"
          );
        }
      });
      fs.writeFile(
        path.join(layoutsPath, "/_footer.scss"),
        cssContent,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _footer.scss inside of layouts"
            );
          }
        }
      );

      // ********************************************************************************
      // now we will creating the abstracts files and folder
      const abstractsPath = scssPath + "/abstracts";

	  fs.writeFile(
        path.join(abstractsPath, "/_index.scss"),
        indexAbstracts,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _index.scss inside of abstracts"
            );
          }
        }
      );

	
	  fs.writeFile(
        path.join(abstractsPath, "/_colors.scss"),
        cssContent,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _colors.scss inside of abstracts"
            );
          }
        }
      );
	  fs.writeFile(
        path.join(abstractsPath, "/_breakpoints.scss"),
        cssContent,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _breakpoints.scss inside of abstracts"
            );
          }
        }
      );

	  fs.writeFile(
        path.join(abstractsPath, "/_mixins.scss"),
        cssContent,
        (err) => {
          if (err) {
            return vscode.window.showErrorMessage(
              "can't create file _breakpoints.scss inside of abstracts"
            );
          }
        }
      );
	

      vscode.window.showInformationMessage("The package installed correctly");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
