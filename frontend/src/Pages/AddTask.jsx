import { useState } from "react";

function AddTask() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleDone = () => {
    if (!title.trim() || !body.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      body,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setBody("");
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Navbar */}
      <nav className="px-12 pt-6">
        <h1 className="text-4xl font-bold">Todo App</h1>
      </nav>

      {/* Tasks List */}
      <div className="flex flex-col items-center mt-10 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="w-[608px]">
            <div className="bg-[#D9D9D9] rounded-[20px] p-6">
              <h2 className="text-3xl font-bold mb-4">
                {task.title}
              </h2>

              <p className="whitespace-pre-wrap break-words text-lg">
                {task.body}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-3">
              <button className="w-10 h-10 bg-gray-300 rounded">
                📖
              </button>

              <button className="w-10 h-10 bg-gray-300 rounded">
                ✏️
              </button>

              <button
                onClick={() => handleDelete(task.id)}
                className="w-10 h-10 bg-gray-300 rounded"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <div className="flex justify-center mt-24">
        <button
          onClick={() => setShowModal(true)}
          className="w-[359px] h-[84px] bg-[#D9D9D9] rounded-xl text-3xl font-bold cursor-pointer"
        >
          Add Task
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="w-[608px] min-h-[282px] bg-[#D9D9D9] rounded-[40px] p-8">
            
            {/* Title */}
            <textarea
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                autoResize(e);
              }}
              rows={1}
              placeholder="Title"
              className="w-full bg-transparent outline-none resize-none text-2xl border-b border-gray-500 pb-2"
            />

            {/* Body */}
            <textarea
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                autoResize(e);
              }}
              rows={2}
              placeholder="Body"
              className="w-full bg-transparent outline-none resize-none text-xl border-b border-gray-500 mt-8 pb-2"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setShowModal(false)}
                className="w-[116px] h-[52px] bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDone}
                className="w-[116px] h-[52px] bg-gray-300 rounded"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;