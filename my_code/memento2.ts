interface Memento {
    updatedAt: string;
    getState(): string;
}

interface Originator {
    save(): Memento;
    restore(memento: Memento): void;
}

class CareTaker {
    private mementos: Array<Memento>;
    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator;
        this.mementos = [];
    }

    backup() {
        console.log('Creating backup');
        this.mementos.push(this.originator.save());
    }

    undo(): void {
        console.log('Restoring backup');
        if (this.mementos.length < 2) return;
        // const memento =
        this.mementos.pop(); // delete the last one
        this.originator.restore(this.mementos.at(-1))
    }

    showHistory(): void {
        console.log('showHistory: ')
        this.mementos.forEach(m => { console.log(m.getState()) });
    }
}

class TextEditorMemento implements Memento {
    private readonly content: string;
    public readonly updatedAt: string;

    constructor(content: string) {
        this.content = content;
        this.updatedAt = new Date().toISOString();
    }

    getState(): string {
        return this.content;
    }
}

class TextEditor implements Originator {
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

    save(): Memento {
        return new TextEditorMemento(this._content);
    }
    restore(memento: Memento): void {
        this._content = memento.getState();
    }
}

const editor = new TextEditor();
const careTaker = new CareTaker(editor);

editor.addContent("some content");
careTaker.backup();
editor.render();

editor.addContent("some more content");
careTaker.backup();
editor.render();

editor.highlight("some");
careTaker.backup();
editor.render();

//careTaker.showHistory();

careTaker.undo();
editor.render();
careTaker.undo();
editor.render();