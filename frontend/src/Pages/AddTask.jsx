import { useState, useEffect } from "react";
import axios from "axios";

function AddTask() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showReadModal, setShowReadModal] = useState(false);
  const [readTask, setReadTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // GET TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:1000/api/v2/getTasks/${user._id}`
      );

      if (res.data.tasks) {
        setTasks(res.data.tasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, []);

  // ADD TASK
  const handleDone = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:1000/api/v2/addTask",
        {
          title,
          body,
          email: user.email,
        }
      );

      setTitle("");
      setBody("");
      setShowModal(false);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE TASK
  const handleUpdate = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.put(
        `http://localhost:1000/api/v2/updateTask/${editId}`,
        {
          title,
          body,
        }
      );

      setShowModal(false);
      setTitle("");
      setBody("");
      setEditId(null);
      setIsEditing(false);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:1000/api/v2/deleteTask/${id}`
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Navbar */}
      <nav className="px-10 pt-5">
        <h1 className="text-5xl font-bold">Todo App</h1>
      </nav>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="flex justify-center mt-16">
          <div className="bg-[#D9D9D9] rounded-3xl p-10 w-[600px] text-center">
            <h2 className="text-3xl font-bold">
              No Tasks Yet
            </h2>

            <p className="text-gray-600 mt-3 text-lg">
              You haven't created any tasks yet.
              Click the button below to add one.
            </p>
          </div>
        </div>
      )}

      {/* Tasks */}
      <div className="flex flex-col items-center mt-10 gap-8">
        {tasks.map((task) => (
          <div key={task._id} className="w-[608px]">
            <div className="bg-[#D9D9D9] rounded-[20px] p-6">
              <h2 className="text-3xl font-bold mb-4">
                {task.title}
              </h2>

             <p className="text-lg">
  {task.body && task.body.length > 100
    ? task.body.substring(0, 100) + "..."
    : task.body}
</p>
            </div>

            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => {
                  setReadTask(task);
                  setShowReadModal(true);
                }}
                className="w-10 h-10 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                📖
              </button>

              <button
                onClick={() => {
                  setShowModal(true);
                  setIsEditing(true);
                  setEditId(task._id);
                  setTitle(task.title);
                  setBody(task.body);
                }}
                className="w-10 h-10 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                ✏️
              </button>

              <button
                onClick={() => {
                  setDeleteId(task._id);
                  setShowDeleteModal(true);
                }}
                className="w-10 h-10 bg-gray-300 rounded hover:bg-red-300 transition"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setEditId(null);
            setTitle("");
            setBody("");
          }}
          className="w-[359px] h-[84px] bg-[#D9D9D9] rounded-xl text-3xl font-bold hover:bg-gray-300 transition cursor-pointer"
        >
          Add Task
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="w-[608px] min-h-[282px] bg-[#D9D9D9] rounded-[40px] p-8">
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

            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => {
                  setShowModal(false);
                  setTitle("");
                  setBody("");
                  setEditId(null);
                  setIsEditing(false);
                }}
                className="w-[116px] h-[52px] bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={
                  isEditing
                    ? handleUpdate
                    : handleDone
                }
                className="w-[116px] h-[52px] bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer"
              >
                {isEditing ? "Update" : "Done"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[350px] shadow-lg">
            <h2 className="text-2xl font-bold text-center">
              Delete Task
            </h2>

            <p className="text-center text-gray-600 mt-3">
              Are you sure you want to delete this task?
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleDelete(deleteId);
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showReadModal && readTask && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-[#D9D9D9] rounded-2xl p-6 w-[500px] shadow-lg">

            <h2 className="text-3xl font-bold mb-4">
              {readTask.title}
            </h2>

            <p className="text-lg whitespace-pre-wrap break-words">
              {readTask.body}
            </p>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowReadModal(false);
                  setReadTask(null);
                }}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;