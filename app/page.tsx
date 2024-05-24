// pages/index.tsx
"use client";

import React, { useState, useEffect  } from "react";
import UploadFile from "./components/UploadFile";

const ITEMS_PER_PAGE = 10; 

const Home: React.FC = () => {
  const [profilesWithScores, setProfilesWithScores] = useState<any[]>([]);
  const [sortedProfiles, setSortedProfiles] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleDataUpload = async (data: any) => {
    setProfilesWithScores(data);
  };

  useEffect(() => {
    const sortedData = [...profilesWithScores].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });
    setSortedProfiles(sortedData);
    setCurrentPage(1); // Reset to the first page whenever data or sort order changes
  }, [profilesWithScores, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(sortedProfiles.length / ITEMS_PER_PAGE);
  const paginatedProfiles = sortedProfiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 text-black">
      <h1 className="text-2xl font-bold mb-6">Upload an Excel File</h1>
      <UploadFile onUploadSuccess={handleDataUpload} />
      {sortedProfiles.length > 0 && (
        <div className="mt-6 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Profile Scores</h2>
          <button
            onClick={toggleSortOrder}
            className="mb-4 bg-gray-500 text-white p-2 rounded"
          >
            Sort by Score ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 border px-4">Full Name</th>
                <th className="py-2 border px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProfiles.map((profile, index) => (
                <tr key={index}>
                  <td className="py-2 border px-4">{profile.full_name}</td>
                  <td className="py-2 border px-4">{profile.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 border ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
