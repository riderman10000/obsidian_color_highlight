import { validateHeaderName } from "http";
import { EventRef, Plugin, Events, Hotkey, Editor, MarkdownView} from "obsidian";

export default class ExamplePlugin extends Plugin{
	statusBarTextElement: HTMLSpanElement;
	keyEvent: KeyboardEvent;

	onload(){
		this.statusBarTextElement = this.addStatusBarItem().createEl('span');
		this.statusBarTextElement.textContent = "hello";

		// add commands 
		this.addCommand({
			id: "highlight-test",
			name: "highlight test",
			hotkeys: [{modifiers: ["Mod", "Shift"], key: "j"}],
			editorCallback: (editor: Editor, context: MarkdownView)=>{
				const selection = editor.getSelection();
				const context_selection = context.getViewData()
				// console.log(`Hey this is command your selection ${value} ${cursor_from.ch} ${cursor_from.line} , ${cursor_head} `);
				editor.replaceSelection("$\\color{red}{" + selection + "}$", selection)
				// context.contentEl
			} 
		});

		this.app.workspace.on('active-leaf-change', async ()=>{
			const file = this.app.workspace.getActiveFile();
			if(file){
				const content = await this.app.vault.read(file);
				// console.log(content);
				this.updateLineCount(content);
			} 
		});
		this.app.workspace.on('editor-change', editor => {
			const content = editor.getDoc().getValue();
			this.updateLineCount(content);
		});
	}
	private updateLineCount(fileContent: string) {
		const count = fileContent ? fileContent.split(/\r\n|\r|\n/).length: 0;
		const lineWord = count === 1 ? "line" : "lines";
		this.statusBarTextElement.textContent = `${count} ${lineWord}`;
	}
}


// export class Test extends 