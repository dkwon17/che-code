// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as axios from 'axios';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(_: vscode.ExtensionContext) {
    const result = await axios.default.get<any>('https://che-dogfooding.apps.che-dev.x6e0.p1.openshiftapps.com/workspace288b5c029f6d4f95/dev/2999');
    console.log('HERE IS THE RESULT!');
    console.log(JSON.stringify(result.data, null, 2));
}

// this method is called when your extension is deactivated
export function deactivate() {}
