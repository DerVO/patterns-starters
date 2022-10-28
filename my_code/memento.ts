//todo: text editor should support undo
class TextEditor {
    private _content: string = "";

    addContent(newContent: string) {
        this._content += " " + newContent;
    }

    highlight(word: string) {
        this._content = this._content.split(word).join(`<b>${word}</b>`);
    }

    render() {
        console.log(this._content);
    }
}

class UndoableTextEditor extends TextEditor {
    private _predecessor?: UndoableTextEditor

    constructor() {
        super();
    }

    private savePredecessor() {
        this._predecessor = structuredClone(this)
    }

    addContent(newContent: string) {
        this.savePredecessor()
        super.addContent(newContent)
    }

    highlight(word: string) {
        this.savePredecessor()
        super.highlight(word)
    }

    render() {
        console.log(this._predecessor)
        super.render()
    }

    undo() {
        this._predecessor.render()
    }
}

const editor = new UndoableTextEditor();



editor.addContent("some content");
editor.render();

editor.addContent("some more content");
editor.render();

editor.highlight("some");
editor.render();

editor.undo();
editor.render();
