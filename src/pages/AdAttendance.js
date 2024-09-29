import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import getAllStudents from "../utils/getAllStudents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from 'react-top-loading-bar';

function AdAttendance() {
  const [progress, setProgress] = useState(0);
  const [unmarkedStudents, setUnmarkedStudents] = useState([]);
  const [markedStudents, setMarkedStudents] = useState([]);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0); // New state for absent students
  const [unmarkedCount, setUnmarkedCount] = useState(0); // Unmarked count

  // Fetch all students and attendance
  const getALL = async () => {
    setProgress(30);
    const marked = await fetch("http://localhost:4000/pages/getAllAttendance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setProgress(40);
    const markedData = await marked.json();
    setProgress(50);

    if (markedData.success) {
      // Process marked students
      const markedStudents = markedData.attendance.map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        attendance: user.status === "present",
      }));

      setMarkedStudents(markedStudents);

      const data = await getAllStudents();
      const allStudents = data.user;

      // Filter unmarked students
      const unmarkedStudents = allStudents.filter(
        (user) => !markedStudents.find((markedStudent) => markedStudent.id === user._id)
      );
      
      setUnmarkedStudents(unmarkedStudents);
      
      // Set unmarked count
      setUnmarkedCount(unmarkedStudents.length);

      // Calculate present and absent counts
      const presentCount = markedStudents.filter((user) => user.attendance === true).length;
      const absentCount = markedStudents.filter((user) => user.attendance === false).length;

      setPresent(presentCount);
      setAbsent(absentCount);
    }
    setProgress(100);
  };

  // Mark attendance
  const markAttendance = async (id, isPresent) => {
    const response = await fetch(`http://localhost:4000/pages/markAttendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: id, status: isPresent ? "present" : "absent" }),
    });
    const result = await response.json();

    if (result.success) {
      toast.success("Attendance Marked Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      // Find the student that was just marked
      const markedStudent = unmarkedStudents.find((user) => user._id === id);

      if (markedStudent) {
        // Update marked and unmarked students list
        const updatedUnmarkedStudents = unmarkedStudents.filter((user) => user._id !== id);
        const updatedMarkedStudents = [...markedStudents, { ...markedStudent, attendance: isPresent }];

        setUnmarkedStudents(updatedUnmarkedStudents); // Update unmarked students
        setMarkedStudents(updatedMarkedStudents); // Add to marked students

        // Update counts
        if (isPresent) {
          setPresent((prev) => prev + 1);
        } else {
          setAbsent((prev) => prev + 1);
        }
        setUnmarkedCount(updatedUnmarkedStudents.length); // Decrease unmarked count
      }
    }
  };

  // Re-fetch attendance data on page load
  useEffect(() => {
    getALL();
  }, []);

  let date = new Date();
  date = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const labels = ["Present", "Absent", "Unmarked Students"];
  const graph = (
    <div className="flex flex-row-reverse items-center gap-3 h-64">
      <Doughnut
        datasetIdKey="id"
        data={{
          labels,
          datasets: [
            {
              label: "No. of Students",
              data: [present, absent, unmarkedCount],
              backgroundColor: ["#1D4ED8", "#F26916", "#808080"],
              barThickness: 20,
              borderRadius: 0,
              borderJoinStyle: "round",
              borderColor: "rgba(0,0,0,0)",
              hoverOffset: 10,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
      <ul className="text-white">
        <li className="flex gap-2">
          <span className="w-10 h-5 bg-orange-500 block"></span> Absent
        </li>
        <li className="flex gap-2">
          <span className="w-10 h-5 bg-blue-500 block"></span> Present
        </li>
        <li className="flex gap-2">
          <span className="w-10 h-5 bg-gray-500 block"></span> Unmarked
        </li>
      </ul>
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center xl:pt-0 md:pt-40 pt-64 mt-[5rem] overflow-auto max-h-screen">
      <LoadingBar color="#0000FF" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-white font-bold text-5xl">Attendance</h1>
      <p className="text-white text-xl mb-10">Date: {date}</p>
      <div className="flex gap-5 flex-wrap items-center justify-center">
        <>{graph}</>
        <div className="flow-root md:w-[400px] w-full bg-neutral-950 px-7 py-5 rounded-lg shadow-xl max-h-[250px] overflow-auto">
          <span className={`font-bold text-xl text-white ${unmarkedStudents.length ? "block" : "hidden"}`}>
            Unmarked Students
          </span>
          <ul role="list" className="divide-y divide-gray-700 text-white">
            {unmarkedStudents.length === 0
              ? "All students are marked!"
              : unmarkedStudents.map((user) =>
                  user.attendance === undefined ? (
                    <li className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 hover:scale-105 transition-all" key={user._id}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-white">{user.firstName}</p>
                          <p className="text-sm truncate text-gray-400">{user.email}</p>
                        </div>
                        <button className="hover:underline hover:text-green-600 hover:scale-125 transition-all" onClick={() => markAttendance(user._id, true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button className="hover:underline hover:text-red-600 hover:scale-125 transition-all" onClick={() => markAttendance(user._id, false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ) : (
                    ""
                  )
                )}
          </ul>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default AdAttendance;
