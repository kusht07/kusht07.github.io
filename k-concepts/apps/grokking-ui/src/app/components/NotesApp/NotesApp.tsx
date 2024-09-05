import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HomeButton from '../HomeButton/HomeButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Note {
  id: number;
  title: string;
  content: string;
  timestamp: Date;
  language: string;
}

const CodeSnippet: React.FC<{ content: string; language: string }> = ({ content, language }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} className="rounded-md">
      {content}
    </SyntaxHighlighter>
  );
};

const loadNotesFromStorage = (): Note[] => {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    return JSON.parse(savedNotes);
  }
  return [{
    "id": 1725422637082,
    "title": "UseMemo() Hook In React",
    "content": "import { useState, useMemo } from \"react\";\nimport ReactDOM from \"react-dom/client\";\n\nconst App = () => {\n  const [count, setCount] = useState(0);\n  const [todos, setTodos] = useState([]);\n  const calculation = useMemo(() => expensiveCalculation(count), [count]);\n\n  const increment = () => {\n    setCount((c) => c + 1);\n  };\n  const addTodo = () => {\n    setTodos((t) => [...t, \"New Todo\"]);\n  };\n\n  return (\n    <div>\n      <div>\n        <h2>My Todos</h2>\n        {todos.map((todo, index) => {\n          return <p key={index}>{todo}</p>;\n        })}\n        <button onClick={addTodo}>Add Todo</button>\n      </div>\n      <hr />\n      <div>\n        Count: {count}\n        <button onClick={increment}>+</button>\n        <h2>Expensive Calculation</h2>\n        {calculation}\n      </div>\n    </div>\n  );\n};\n\nconst expensiveCalculation = (num) => {\n  console.log(\"Calculating...\");\n  for (let i = 0; i < 1000000000; i++) {\n    num += 1;\n  }\n  return num;\n};\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<App />);",
    "timestamp": "2024-09-04T04:03:57.082Z",
    "language": "javascript"
  }];
};

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(loadNotesFromStorage());
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNoteTitle.trim() !== '' && newNoteContent.trim() !== '') {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title: newNoteTitle,
          content: newNoteContent,
          timestamp: new Date(),
          language: codeLanguage,
        },
      ]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setCodeLanguage('javascript');
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const sendNoteToEmail = (note: Note) => {
    const subject = encodeURIComponent(note.title);
    const body = encodeURIComponent(`${note.content}\n\nLanguage: ${note.language}\nCreated on: ${note.timestamp.toLocaleString()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-4xl w-full">
        <HomeButton />
        <h1 className="text-3xl font-bold mb-6 text-center text-primary-400">
          {t('notesApp.title')}
        </h1>
        <div className="mb-6">
          <input
            type="text"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            placeholder={t('notesApp.titlePlaceholder')}
            className="w-full p-2 border rounded mb-2 bg-gray-700 text-white"
          />
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder={t('notesApp.contentPlaceholder')}
            className="w-full p-2 border rounded h-32 resize-none mb-2 bg-gray-700 text-white"
          />
          <div className="flex items-center mb-2">
            <label htmlFor="codeLanguage" className="mr-2 text-white">Language:</label>
            <select
              id="codeLanguage"
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
              className="p-2 border rounded bg-gray-700 text-white"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          <button
            onClick={addNote}
            className="mt-2 w-full bg-primary-500 text-white p-2 rounded hover:bg-primary-600 transition-colors"
          >
            {t('notesApp.addNote')}
          </button>
        </div>
        <div className="space-y-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-gray-700 p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-white">
                  {note.title}
                </h2>
                <div>
                  <button
                    onClick={() => sendNoteToEmail(note)}
                    className="text-blue-400 hover:text-blue-300 mr-4"
                  >
                    {t('notesApp.sendToEmail')}
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    {t('notesApp.delete')}
                  </button>
                </div>
              </div>
              <CodeSnippet content={note.content} language={note.language} />
              <p className="text-sm text-gray-400 mt-2">
                {note.timestamp.toLocaleString()} | {note.language}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;