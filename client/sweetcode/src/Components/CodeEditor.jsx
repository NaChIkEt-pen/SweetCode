import { React, useEffect, useState } from "react";
import AceEditor from "react-ace";
import { useAtom } from "jotai";
import {
  problemDescription,
  generatedCode,
  genCodeLangauge,
} from "../atoms/global";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

function CodeEditor({ language, code, setCode, selectedValue }) {
  const [reframedQuestion, setReframedQuestion] = useAtom(problemDescription);
  const [genCode, setGenCode] = useAtom(generatedCode);
  const [alert, setAlert] = useState("");
  const [genCodeLang, setGenCodeLang] = useAtom(genCodeLangauge);
  const [codeText, setCodeText] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  // const generateCode = async () => {
  //   console.log("Generating Code");
  //   try {
  //     const payload = {
  //       formatted_question: reframedQuestion,
  //     };
  //     // console.log("Payload:", payload);
  //     const response = await fetch(`${apiUrl}/codegen`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // "X-User-ID": userId,
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     let result = await response.text();

  //     result = JSON.parse(result); // first parse, gets a string again
  //     result = JSON.parse(result);
  //     if (response.ok) {
  //       console.log("API Response:", result);
  //     } else {
  //       setAlert(result.message);
  //     }
  //   } catch (error) {
  //     console.error("Submission error", error);
  //     setAlert("Error submitting form");
  //   }
  // };
  useEffect(() => {
    console.log(codeText);
  }, [genCode]);
  let readOnly = true;
  if (selectedValue == "Practice") {
    readOnly = false;
  }
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
        readOnly={readOnly}
      />
    </div>
  );
}
export default CodeEditor;
