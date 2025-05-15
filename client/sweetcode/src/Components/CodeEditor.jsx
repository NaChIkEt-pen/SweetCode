import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

function CodeEditor({ language, code, setCode }) {
  return (
    <div className="code-editor">
      <AceEditor
        mode={language}
        theme="monokai"
        value={code}
        onChange={(val) => setCode(val)}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="390px"
      />
    </div>
  );
}
export default CodeEditor;
