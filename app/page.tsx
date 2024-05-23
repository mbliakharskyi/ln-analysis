// pages/index.tsx
"use client";

import React, { useState } from "react";
import UploadFile from "./components/UploadFile";
import { uploadProfiles } from "./utils/api";

const Home: React.FC = () => {
  const [scores, setScores] = useState<number[]>([]);

  const handleDataUpload = async (data: any[]) => {
    const tempData = [
      {
        name: 'John Doe',
        profile_picture: "url_to_picture",
        headline: "Software Developer",
        summary: "Experienced in Flask and React",
        work_experience: ["Company A", "Company B"],
        education: ["University X"],
        skills: ["Python", "Flask"],
        endorsements: 10,
        recent_posts: ["Post 1", "Post 2"],
        followers: 500,
        recommendations: 5,
      },
    ];
    try {
      const response = await uploadProfiles(tempData);
      setScores(response.scores);
    } catch (error) {
      console.error("Error scoring profiles:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-black">
        LinkedIn Profile Analysis Tool
      </h1>
      <UploadFile onDataUpload={handleDataUpload} />
      {scores.length > 0 && (
        <div className="mt-6 w-full max-w-2xl text-black">
          <h2 className="text-xl font-semibold mb-4">Profile Scores</h2>
          <ul className="list-disc list-inside">
            {scores.map((score, index) => (
              <li key={index} className="mb-2">
                Profile {index + 1}: {score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
