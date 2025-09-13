"use client";

import { useState } from "react";

// Mock admin data
const mockPendingQuests = [
  {
    id: 1,
    userId: "user1",
    userName: "Priya Sharma",
    questTitle: "Basics Form",
    submittedAt: "2024-01-15T10:30:00Z",
    evidenceUrl: "/evidence/basics-form.pdf",
    status: "pending"
  },
  {
    id: 2,
    userId: "user2", 
    userName: "Raj Kumar",
    questTitle: "Sales Log",
    submittedAt: "2024-01-15T09:15:00Z",
    evidenceUrl: "/evidence/sales-log.xlsx",
    status: "pending"
  },
  {
    id: 3,
    userId: "user3",
    userName: "Sunita Devi", 
    questTitle: "Shop Photo",
    submittedAt: "2024-01-14T16:45:00Z",
    evidenceUrl: "/evidence/shop-photo.jpg",
    status: "pending"
  }
];

const mockUsers = [
  { id: "user1", name: "Priya Sharma", village: "Village A", level: 1, score: 45, completedQuests: 2 },
  { id: "user2", name: "Raj Kumar", village: "Village B", level: 2, score: 68, completedQuests: 4 },
  { id: "user3", name: "Sunita Devi", village: "Village A", level: 1, score: 38, completedQuests: 1 }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("quests");
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);

  const handleApproveQuest = (questId: number) => {
    // TODO: Implement API call to approve quest
    console.log("Approving quest:", questId);
    setSelectedQuest(null);
  };

  const handleRejectQuest = (questId: number) => {
    // TODO: Implement API call to reject quest
    console.log("Rejecting quest:", questId);
    setSelectedQuest(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage quests and user progress</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "quests", name: "Pending Quests", count: mockPendingQuests.length },
                { id: "users", name: "All Users", count: mockUsers.length },
                { id: "analytics", name: "Analytics", count: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                  {tab.count !== null && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "quests" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Pending Quest Reviews</h3>
                <div className="space-y-4">
                  {mockPendingQuests.map((quest) => (
                    <div key={quest.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h4 className="font-semibold text-gray-900">{quest.questTitle}</h4>
                              <p className="text-sm text-gray-600">Submitted by {quest.userName}</p>
                              <p className="text-xs text-gray-500">Submitted: {formatDate(quest.submittedAt)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <a
                            href={quest.evidenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            View Evidence
                          </a>
                          <button
                            onClick={() => setSelectedQuest(quest.id)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">All Users</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Village
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quests
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.village}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              L{user.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.score}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.completedQuests}/8</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Analytics</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {mockUsers.length}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Total Users</h4>
                    <p className="text-gray-600">Registered entrepreneurs</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {mockUsers.filter(u => u.score >= 70).length}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Loan-Ready</h4>
                    <p className="text-gray-600">Score ≥ 70%</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {Math.round(mockUsers.reduce((acc, u) => acc + u.completedQuests, 0) / mockUsers.length)}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Avg Quests</h4>
                    <p className="text-gray-600">Completed per user</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quest Review Modal */}
      {selectedQuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Review Quest</h3>
              <button
                onClick={() => setSelectedQuest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Review the submitted evidence and approve or reject this quest.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleRejectQuest(selectedQuest)}
                className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
              >
                Reject
              </button>
              <button
                onClick={() => handleApproveQuest(selectedQuest)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
