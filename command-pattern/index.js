// Receiver
class TextEditor {
  constructor(text) {
    this.text = text;
  }

  append(text) {
    this.text += text;
  }

  delete(charCount) {
    this.text = this.text.slice(0, -charCount);
  }

  getText() {
    return this.text;
  }
}

// Command Interface
class Command {
  execute() {}
  undo() {}
}

// Concrete Command
class AppendCommand extends Command {
  constructor(receiver, text) {
    super();
    this.receiver = receiver;
    this.text = text;
  }

  execute() {
    this.receiver.append(this.text);
  }

  undo() {
    this.receiver.delete(this.text.length);
  }
}

// Invoker
class TextEditorInvoker {
  constructor() {
    this.commandHistory = [];
  }

  executeCommand(command) {
    command.execute();
    this.commandHistory.push(command);
  }

  undo() {
    const lastCommand = this.commandHistory.pop();
    if (lastCommand) {
      lastCommand.undo();
    }
  }
}

// Usage Demo
const editor = new TextEditor("");
const invoker = new TextEditorInvoker();

invoker.executeCommand(new AppendCommand(editor, "Hello"));
invoker.executeCommand(new AppendCommand(editor, " World"));

console.log(editor.getText()); // => "Hello World"

invoker.undo();
console.log(editor.getText()); // => "Hello"

invoker.undo();
console.log(editor.getText()); // => ""
