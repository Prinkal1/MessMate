import { useState } from "react";
import { Input } from "../pages/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdNotification() {
  const registerNotification = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:4000/pages/addNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user: user._id, title, description: desc}),
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Notification Added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        });
    } else {
      toast.error("Notification registration failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        });
    }
  };



  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function titleChange(e) {
    setTitle(e.target.value);
  }
  function descChange(e) {
    setDesc(e.target.value);
  }

  const notificationTitle = {
    name: "notification title",
    placeholder: "Title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center  max-h-screen overflow-y-auto">
      <h1 className="text-white font-bold text-5xl mt-5 pb-[4rem] ">Add Notifications</h1>
      <form
        method="POST"
        onSubmit={registerNotification}
        className="md:w-[35vw] h-[25rem] w-full py-5 pb-7 pt-5 px-10 bg-neutral-950 rounded-lg shadow-xl flex flex-col gap-5"
      >
        <Input field={notificationTitle} />
        <div>
          <label
            htmlFor="notification"
            className="block mb-4 text-xl font-medium text-white "
          >
            Your Notification description
          </label>
          <textarea
            name="notification"
            placeholder="Notifications..."
            className="border sm:text-xl rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={descChange}
            value={desc}
          ></textarea>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 mt-10 text-center"
          >
            Add Notification
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
      />
    </div>
  );
}

export default AdNotification;


