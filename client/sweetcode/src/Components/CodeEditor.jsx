import { useEffect, useState, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useAtom } from "jotai";
import {
  problemDescription,
  generatedCode,
  genCodeLangauge,
} from "../atoms/global";

function CodeEditor({ language, code, setCode, selectedValue }) {
  const [reframedQuestion] = useAtom(problemDescription);
  const [genCode] = useAtom(generatedCode);
  const [genCodeLang] = useAtom(genCodeLangauge);
  const editorRef = useRef(null);
  const [readOnly, setReadOnly] = useState(true);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Bind Cmd/Ctrl + A (Select All)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyA, () => {
      editor.trigger("keyboard", "selectAll", null);
    });

    // Bind Cmd/Ctrl + C (Copy)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => {
      document.execCommand("copy");
    });

    // Bind Cmd/Ctrl + V (Paste)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      document.execCommand("paste");
    });

    // Bind Cmd/Ctrl + Z (Undo)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {
      editor.trigger("keyboard", "undo", null);
    });

    // Bind Cmd/Ctrl + Shift + Z (Redo)
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ,
      () => {
        editor.trigger("keyboard", "redo", null);
      }
    );
  };

  // Toggle readonly based on selectedValue
  useEffect(() => {
    if (selectedValue === "Practice") {
      setReadOnly(false);
    } else {
      setReadOnly(true);
    }
  }, [selectedValue]);

  // Update code when generatedCode changes
  useEffect(() => {
    const newCode = genCode["cppcode"];
    if (newCode !== undefined) {
      setCode(newCode);
    }
  }, [genCode, setCode]);

  return (
    <div className="code-editor">
      <Editor
        height="390px"
        language={language || "cpp"}
        theme="vs-dark"
        value={code}
        onChange={(val) => setCode(val || "")}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}

export default CodeEditor;
