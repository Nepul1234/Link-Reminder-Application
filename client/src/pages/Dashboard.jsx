import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LinkCard from '../components/LinkCard';
import Button from '../components/Button';
import Modal from '../components/Modal';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, linkId: null });
  const navigate = useNavigate();

  // Mock data - replace with API call later
  useEffect(() => {
    const mockLinks = [
      {
        id: 1,
        title: "Physics Lab 3 - Motion",
        url: "https://limewire.example.com/physics-lab3",
        description: "Lab report on projectile motion and velocity calculations",
        dateAdded: "2024-01-15"
      },
      {
        id: 2,
        title: "Chemistry Assignment 2",
        url: "https://limewire.example.com/chem-assign2",
        description: "Organic chemistry reactions and mechanisms study",
        dateAdded: "2024-01-10"
      }
    ];
    
    setTimeout(() => {
      setLinks(mockLinks);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEdit = (linkId) => {
    navigate(`/edit-link/${linkId}`);
  };

  const handleDelete = (linkId) => {
    setDeleteModal({ isOpen: true, linkId });
  };

  const confirmDelete = () => {
    setLinks(links.filter(link => link.id !== deleteModal.linkId));
    setDeleteModal({ isOpen: false, linkId: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, linkId: null });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-gray-600">Loading your links...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Lab Links</h1>
            <p className="text-gray-600 mt-1">
              Manage your saved lab documents and resources
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/add-link')}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Link
          </Button>
        </div>

        {/* Links Grid */}
        {links.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No links saved yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first lab link</p>
            <Button
              variant="primary"
              onClick={() => navigate('/add-link')}
            >
              Add Your First Link
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={cancelDelete}
        title="Delete Link"
        message="Are you sure you want to delete this link? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default Dashboard;