import React from "react";
import { useParams } from "react-router-dom";

const InfoForm: React.FC = () => {
  const { organizationId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Fill in Your Information
      </h1>
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Name"
        />
        <input
          type="email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Email"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Submit
        </button>
      </form>
      <p className="text-gray-500 mt-4">
        Organization ID: <span className="font-bold">{organizationId}</span>
      </p>
    </div>
  );
};

export default InfoForm;
