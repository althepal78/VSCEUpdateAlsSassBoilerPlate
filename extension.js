const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "alsboilerplate" is now active!');

	const htmlContent = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Als Boiler Plate</title>
    <script src="./src/js/site.js" defer></script>
    <link rel="stylesheet" href="./src/css/site.css">
</head>
<body>
    <div class="container">
        You can delete this but test first
	  <p>Make sure you get the extension live sass compiler</p>
    </div>
</body>
</html>
`;
const scssContent = 
`
/*
    if you want to use a partial scss file you must start the name with
    an underscore, for example "_nav" so the file name will be "_nav.scss"
    don't forget that part
*/
*{
    padding:0;
    margin:0;
    box-sizing: border-box;
}
.container{
    color:white;
    background-color: purple;
    margin: 25px;
    font-size: xx-large;
}
`;

const cssContent="";
const jsContent = 
`
const div = document.querySelector('.container');

div.addEventListener('click', function(){
    div.innerHTML = 'yo son it worked'
})
`;
		let disposable = vscode.commands.registerCommand('alsboilerplate.createAlsBoilerPlates', function () {
		const folderPath = vscode.workspace.workspaceFolders[0].uri['fsPath'];
		// console.log(folderPath)

		// creates the index.html file
		fs.writeFile(path.join(folderPath,"index.html"),htmlContent, err =>{
			if(err){
				
				return vscode.window.showErrorMessage('Can not create index.html')
			}
			
		});

		// creates the src or source folder/directory

		fs.mkdir(folderPath + "\\src", function (err){
			if (err){
				console.log("can not create src folder/directory")
			}
		})	

		// setting a 1 second timeout because it allows the js folder to be created, sometimes it has issues
		setTimeout(() => {
			console.log('')
		}, 1000);


		// creates the js folder inside the src folder
		fs.mkdir(folderPath + "\\src\\js", function (err){
			if (err){
				console.log("can't create folder js inside src folder/directory")
			}
		})
	
		// creates the the path so that I can create the content into a file		
		const jsPath = folderPath + '/src/js'

		// creates the js file site.js with the content inside 
		fs.writeFile(path.join(jsPath,"/site.js"),jsContent, err =>{
			if(err){
				
				return vscode.window.showErrorMessage("can't create file site.js")
			}
			
		});
			
		// creates the scss folder inside the src or source folder
		fs.mkdir(folderPath + "\\src\\scss", function (err){
			if (err){
				console.log("not working" + err)
			}
		})

		// creates the the path so that I can create the content into a file
		const scssPath = folderPath + '/src/scss'
		
		// same thing as js file with scss content inside and the scss file 
		fs.writeFile(path.join(scssPath,"/site.scss"),scssContent, err =>{
			if(err){
				
				return vscode.window.showErrorMessage("can't create file site.scss")
			}
		});

		// mimics everything in the sass but just css 
		fs.mkdir(folderPath + "\\src\\css", function (err){
			if (err){
				console.log("not working" + err)
			}
		})
		const cssPath = folderPath + '/src/css'

		fs.writeFile(path.join(cssPath,"/site.css"),cssContent, err =>{
			if(err){
				
				return vscode.window.showErrorMessage("can't create file site.scss")
			}
		});
		vscode.window.showInformationMessage('The package installed correctly')
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
