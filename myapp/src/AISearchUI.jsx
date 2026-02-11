import { useState } from "react";

export default function AISearchUI() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [searched, setSearched] = useState(false);

  const sendMsg = () => {
    if (!msg.trim()) return;

    setSearched(true);

    setChat([...chat, { user: msg, bot: "Thinking..." }]);
    setMsg("");

    setTimeout(() => {
      setChat(prev =>
        prev.map((c, i) =>
          i === prev.length - 1
            ? { ...c, bot: "Response for: " + c.user }
            : c
        )
      );
    }, 1000);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col transition-all duration-700">

      {/* TITLE */}
      <div className={`text-center transition-all duration-700 ${searched ? "mt-4 text-xl" : "mt-40 text-3xl font-bold"}`}>
        🚀 PickMyAI
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {chat.map((c, i) => (
          <div key={i} className="space-y-1">
            <div className="text-right text-blue-400">{c.user}</div>
            <div className="text-left text-gray-300">{c.bot}</div>
          </div>
        ))}
      </div>

      {/* SEARCH BAR */}
      <div className={`transition-all duration-700 flex gap-2 px-4 ${searched ? "pb-4" : "justify-center mb-40"}`}>
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 max-w-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none p-3 rounded-xl"
        />
        <button
          onClick={sendMsg}
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-semibold"
        >
          Search
        </button>
      </div>
    </div>
  );
}
