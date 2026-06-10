import { useState } from "react";
import API from "../services/api";

function FeedbackBox() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setMessage("Email is required");
      setEmailError(true);

      setTimeout(() => {
        setEmailError(false);
      }, 500);

      return;
    }

    try {
      await API.post("/feedback", {
        email,
        feedback,
      });

      setMessage("Feedback submitted successfully!");

      setEmail("");
      setFeedback("");
    } catch (error) {
      setMessage("Submission failed");
    }
  };

  return (
    <div className="mt-10 rounded-xl bg-white border p-6 shadow-sm w-1/3">
      <h2 className="text-xl font-bold mb-4">Help Us Improve</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false);
        }}
        className={`w-full border p-3 rounded mb-2 outline-none transition-all duration-200 ${
          emailError
            ? "border-red-500 ring-2 ring-red-300 animate-shake"
            : "border-gray-300 focus:border-blue-500"
        }`}
      />

      {emailError && (
        <p className="text-red-500 text-sm mb-2">Email is required</p>
      )}

      <textarea
        placeholder="Your feedback"
        rows={5}
        value={feedback}
        onChange={(e) => {
          setFeedback(e.target.value);
        }}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Send
      </button>

      {message && <p className="mt-3">{message}</p>}

      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }

          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

export default FeedbackBox;