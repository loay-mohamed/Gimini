import axios from "axios";
import React, { useState } from "react";

const Gimini = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    if (question.trim() === "") {
      setAnswer("Please enter a question.");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDmDPSYZVHc021h8y8dQv_KvSJluajYZCs",
        {
          contents: [
            {
              parts: [
                {
                  text: question,
                },
              ],
            },
          ],
        }
      );

      const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnswer(result || "No answer received.");
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-between px-4 py-4">
      <h1 className="text-4xl font-bold text-purple-400 mb-6 text-center">Gimini Assistant</h1>
      
      {answer && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <p className="text-purple-300 font-semibold">Answer:</p>
          <p className="text-gray-200 mt-1 whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-4 flex justify-center items-center gap-4 shadow-lg">
        <div className="w-full max-w-2xl flex items-center gap-4">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={generateAnswer}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gimini;
