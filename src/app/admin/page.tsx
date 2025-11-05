"use client";

import { useEffect, useState } from 'react';
import { apiFetch, getToken } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ArticleRow = { 
  id: string; 
  title: string; 
  status: string; 
  authorName: string; 
  authorEmail: string; 
  abstract?: string;
  keywords?: string[];
  createdAt: string;
};

type EditorialMember = {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  email?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  isActive: boolean;
  orderIndex: number;
  createdAt: string;
};

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string;
};

type DashboardStats = {
  totalArticles: number;
  pendingArticles: number;
  approvedArticles: number;
  rejectedArticles: number;
  publishedArticles: number;
  totalUsers: number;
  totalContacts: number;
};

type Tab = 'dashboard' | 'articles' | 'editorial' | 'users' | 'contacts';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articleStatus, setArticleStatus] = useState<string>('PENDING');
  const [selectedArticle, setSelectedArticle] = useState<ArticleRow | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  
  // Editorial Board states
  const [editorialMembers, setEditorialMembers] = useState<EditorialMember[]>([]);
  const [loadingEditorial, setLoadingEditorial] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: '',
    title: '',
    affiliation: '',
    email: '',
    bio: '',
    photoUrl: '',
    orderIndex: 0,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [memberError, setMemberError] = useState<string | null>(null);
  const [memberSuccess, setMemberSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.push('/auth/login');
      return;
    }
    loadDashboardData();
  }, [router, articleStatus]);

  useEffect(() => {
    if (activeTab === 'editorial') {
      loadEditorialMembers();
    }
  }, [activeTab]);

  async function loadDashboardData() {
    setLoading(true);
    try {
      // Load articles based on status
      const articlesRes = await apiFetch<{ articles: ArticleRow[] }>(
        `/api/admin/articles?status=${articleStatus}&limit=50`
      );
      setArticles(articlesRes.articles || []);
      
      // Load stats (we'll need to create this endpoint or calculate from articles)
      // For now, we'll calculate from the articles we have
      if (activeTab === 'dashboard') {
        calculateStats();
      }
      } catch (e: any) {
      setError(e.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
  }

  async function calculateStats() {
    try {
      const statsData = await apiFetch<{
        totalArticles: number;
        pendingArticles: number;
        approvedArticles: number;
        rejectedArticles: number;
        publishedArticles: number;
        totalUsers: number;
        totalContacts: number;
      }>('/api/admin/stats');
      
      setStats({
        totalArticles: statsData.totalArticles || 0,
        pendingArticles: statsData.pendingArticles || 0,
        approvedArticles: statsData.approvedArticles || 0,
        rejectedArticles: statsData.rejectedArticles || 0,
        publishedArticles: statsData.publishedArticles || 0,
        totalUsers: statsData.totalUsers || 0,
        totalContacts: statsData.totalContacts || 0,
      });
    } catch (e: any) {
      console.error('Failed to load stats:', e);
      // Set zero stats on error
      setStats({
        totalArticles: 0,
        pendingArticles: 0,
        approvedArticles: 0,
        rejectedArticles: 0,
        publishedArticles: 0,
        totalUsers: 0,
        totalContacts: 0,
      });
    }
  }

  async function approveArticle(id: string) {
    try {
    await apiFetch(`/api/admin/articles/${id}/approve`, { method: 'PATCH' });
      setArticles((s) => s.filter((x) => x.id !== id));
      if (stats) {
        setStats({
          ...stats,
          pendingArticles: Math.max(0, stats.pendingArticles - 1),
          approvedArticles: stats.approvedArticles + 1,
        });
      }
    } catch (e: any) {
      alert('Failed to approve: ' + (e.message || 'Unknown error'));
    }
  }

  async function rejectArticle() {
    if (!selectedArticle || !rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    try {
      await apiFetch(`/api/admin/articles/${selectedArticle.id}/reject`, {
        method: 'PATCH',
        body: JSON.stringify({ rejectionReason: rejectionReason.trim() }),
      });
      setArticles((s) => s.filter((x) => x.id !== selectedArticle.id));
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedArticle(null);
      if (stats) {
        setStats({
          ...stats,
          pendingArticles: Math.max(0, stats.pendingArticles - 1),
          rejectedArticles: stats.rejectedArticles + 1,
        });
      }
    } catch (e: any) {
      alert('Failed to reject: ' + (e.message || 'Unknown error'));
    }
  }

  function openRejectModal(article: ArticleRow) {
    setSelectedArticle(article);
    setRejectionReason('');
    setShowRejectModal(true);
  }

  async function loadEditorialMembers() {
    setLoadingEditorial(true);
    try {
      const res = await apiFetch<{ members: EditorialMember[] }>(
        `/api/editorial-board?includeInactive=true`
      );
      setEditorialMembers(res.members || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load editorial members');
    } finally {
      setLoadingEditorial(false);
    }
  }

  async function handlePhotoUpload() {
    if (!photoFile) return null;
    
    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('file', photoFile);
      
      const res = await apiFetch<{ success: boolean; photo_url: string }>(
        `/api/editorial-board/upload`,
        { method: 'POST', body: formData }
      );
      
      return res.photo_url;
    } catch (e: any) {
      throw new Error('Failed to upload photo: ' + (e.message || 'Unknown error'));
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleAddMember(e: React.FormEvent) {
    e.preventDefault();
    setMemberError(null);
    setMemberSuccess(null);

    if (!memberForm.name || !memberForm.title || !memberForm.affiliation) {
      setMemberError('Name, title, and affiliation are required');
      return;
    }

    try {
      let photoUrl: string | null = memberForm.photoUrl || null;
      
      // Upload photo if provided
      if (photoFile) {
        photoUrl = await handlePhotoUpload();
      }

      const memberData = {
        name: memberForm.name,
        title: memberForm.title,
        affiliation: memberForm.affiliation,
        email: memberForm.email || undefined,
        bio: memberForm.bio || undefined,
        photoUrl: photoUrl || undefined,
        orderIndex: memberForm.orderIndex || 0,
      };

      const res = await apiFetch<{ success: boolean; member: EditorialMember }>(
        `/api/editorial-board`,
        {
          method: 'POST',
          body: JSON.stringify(memberData),
        }
      );

      setMemberSuccess('Editorial board member added successfully!');
      setEditorialMembers([...editorialMembers, res.member]);
      
      // Reset form
      setMemberForm({
        name: '',
        title: '',
        affiliation: '',
        email: '',
        bio: '',
        photoUrl: '',
        orderIndex: 0,
      });
      setPhotoFile(null);
      
      setTimeout(() => {
        setShowAddMemberModal(false);
        setMemberSuccess(null);
      }, 1500);
    } catch (e: any) {
      setMemberError(e.message || 'Failed to add member');
    }
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'articles', label: 'Articles', icon: '📄' },
    { id: 'editorial', label: 'Editorial Board', icon: '👥' },
    { id: 'contacts', label: 'Contact Messages', icon: '📧' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Admin Dashboard</h1>
            <p className="text-xl text-white/90">Manage your journal platform</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'articles') loadDashboardData();
                }}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-700 text-primary-700'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          {error && (
            <div className="card p-6 mb-6 border-red-200 bg-red-50">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Pending Articles</p>
                      <p className="text-3xl font-bold text-primary-700">
                        {stats?.pendingArticles ?? '-'}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-2xl">⏳</span>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Approved Articles</p>
                      <p className="text-3xl font-bold text-green-600">
                        {stats?.approvedArticles ?? '-'}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-2xl">✅</span>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Published Articles</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {stats?.publishedArticles ?? '-'}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-2xl">📖</span>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
            <div>
                      <p className="text-sm text-gray-600 mb-1">Rejected Articles</p>
                      <p className="text-3xl font-bold text-red-600">
                        {stats?.rejectedArticles ?? '-'}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-2xl">❌</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-display font-semibold text-primary-800 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href="/submit"
                    className="card p-4 hover:shadow-lg transition-all text-center group"
                  >
                    <span className="text-3xl mb-2 block">📝</span>
                    <p className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                      Submit Article
                    </p>
                  </Link>
                  <button
                    onClick={() => setActiveTab('editorial')}
                    className="card p-4 hover:shadow-lg transition-all text-center group"
                  >
                    <span className="text-3xl mb-2 block">👥</span>
                    <p className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                      Manage Editorial Board
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab('contacts')}
                    className="card p-4 hover:shadow-lg transition-all text-center group"
                  >
                    <span className="text-3xl mb-2 block">📧</span>
                    <p className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                      View Messages
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Articles Tab */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              {/* Status Filter */}
              <div className="card p-4">
                <div className="flex flex-wrap gap-2">
                  {['PENDING', 'APPROVED', 'REJECTED', 'PUBLISHED', 'ALL'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setArticleStatus(status === 'ALL' ? '' : status);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        (status === 'ALL' && articleStatus === '') ||
                        (status !== 'ALL' && articleStatus === status)
                          ? 'bg-primary-700 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles List */}
              {loading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
                  <p className="mt-4 text-gray-600">Loading articles...</p>
                </div>
              )}

              {!loading && articles.length === 0 && (
                <div className="card p-12 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    No {articleStatus || 'articles'} found
                  </h3>
                  <p className="text-gray-600">Try selecting a different status filter.</p>
                </div>
              )}

              {!loading && articles.length > 0 && (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div key={article.id} className="card p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-display text-xl font-semibold text-primary-800">
                              {article.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              article.status === 'APPROVED' || article.status === 'PUBLISHED'
                                ? 'bg-green-100 text-green-700'
                                : article.status === 'REJECTED'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {article.status}
                            </span>
                          </div>
                          
                          {article.abstract && (
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {article.abstract}
                            </p>
                          )}
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <span>
                              <strong>Author:</strong> {article.authorName}
                            </span>
                            <span>
                              <strong>Email:</strong> {article.authorEmail}
                            </span>
                          </div>
                          
                          <p className="text-xs text-gray-500">
                            Submitted: {new Date(article.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          
                          {article.keywords && article.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {article.keywords.slice(0, 5).map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {article.status === 'PENDING' && (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => approveArticle(article.id)}
                              className="btn btn-primary whitespace-nowrap"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => openRejectModal(article)}
                              className="btn btn-outline whitespace-nowrap"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        
                        <Link
                          href={`/articles/${article.id}`}
                          className="btn btn-outline whitespace-nowrap"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Editorial Board Tab */}
          {activeTab === 'editorial' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-primary-800">
                    Editorial Board Management
                  </h2>
                  <p className="text-gray-600 mt-1">Add and manage editorial board members</p>
                </div>
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="btn btn-primary"
                >
                  + Add Member
                </button>
              </div>

              {loadingEditorial && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
                  <p className="mt-4 text-gray-600">Loading members...</p>
                </div>
              )}

              {!loadingEditorial && editorialMembers.length === 0 && (
                <div className="card p-12 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    No Editorial Members
                  </h3>
                  <p className="text-gray-600 mb-6">Get started by adding your first editorial board member.</p>
                  <button
                    onClick={() => setShowAddMemberModal(true)}
                    className="btn btn-primary"
                  >
                    Add First Member
                  </button>
                </div>
              )}

              {!loadingEditorial && editorialMembers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {editorialMembers.map((member) => (
                    <div key={member.id} className="card p-6">
                      <div className="text-center">
                        {member.photoUrl ? (
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-primary-100 mb-4"
                          />
                        ) : (
                          <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-display font-bold mb-4">
                            {member.name.charAt(0)}
                          </div>
                        )}
                        <h3 className="text-lg font-display font-semibold text-primary-800 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-primary-700 font-medium text-sm mb-1">{member.title}</p>
                        <p className="text-gray-600 text-sm mb-3">{member.affiliation}</p>
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-primary-700 hover:text-primary-800 text-sm font-medium transition-colors inline-flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {member.email}
                          </a>
                        )}
                        {member.bio && (
                          <p className="text-xs text-gray-600 mt-3 line-clamp-3">{member.bio}</p>
                        )}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                          <span className={`px-2 py-1 rounded-full ${
                            member.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-gray-500">
                            Order: {member.orderIndex}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="card p-6">
              <h2 className="text-2xl font-display font-semibold text-primary-800 mb-4">
                Contact Messages
              </h2>
              <p className="text-gray-600">
                Contact form submissions will be displayed here. This feature requires a contact submissions API endpoint.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                💡 Tip: Create an API endpoint at <code>/api/admin/contacts</code> to fetch contact submissions.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Rejection Modal */}
      {showRejectModal && selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full p-6">
            <h3 className="text-xl font-display font-semibold text-primary-800 mb-4">
              Reject Article
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting: <strong>{selectedArticle.title}</strong>
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="input w-full h-32 mb-4"
              required
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedArticle(null);
                }}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={rejectArticle}
                className="btn btn-primary flex-1"
                disabled={!rejectionReason.trim()}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="card max-w-2xl w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-semibold text-primary-800">
                Add Editorial Board Member
              </h3>
              <button
                onClick={() => {
                  setShowAddMemberModal(false);
                  setMemberForm({
                    name: '',
                    title: '',
                    affiliation: '',
                    email: '',
                    bio: '',
                    photoUrl: '',
                    orderIndex: 0,
                  });
                  setPhotoFile(null);
                  setMemberError(null);
                  setMemberSuccess(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {memberError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{memberError}</p>
              </div>
            )}

            {memberSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{memberSuccess}</p>
              </div>
            )}

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    className="input w-full"
                    placeholder="Dr. John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={memberForm.title}
                    onChange={(e) => setMemberForm({ ...memberForm, title: e.target.value })}
                    className="input w-full"
                    placeholder="Professor, Editor, etc."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Affiliation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={memberForm.affiliation}
                  onChange={(e) => setMemberForm({ ...memberForm, affiliation: e.target.value })}
                  className="input w-full"
                  placeholder="University Name, Institution, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    className="input w-full"
                    placeholder="member@university.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={memberForm.orderIndex}
                    onChange={(e) => setMemberForm({ ...memberForm, orderIndex: parseInt(e.target.value) || 0 })}
                    className="input w-full"
                    placeholder="0"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Biography
                </label>
                <textarea
                  value={memberForm.bio}
                  onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                  className="input w-full h-24"
                  placeholder="Brief biography and expertise..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photo
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                    className="input w-full"
                  />
                  {uploadingPhoto && (
                    <span className="text-sm text-gray-600">Uploading...</span>
                  )}
                </div>
                {photoFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {photoFile.name}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG, or WEBP (max 5MB)
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddMemberModal(false);
                    setMemberForm({
                      name: '',
                      title: '',
                      affiliation: '',
                      email: '',
                      bio: '',
                      photoUrl: '',
                      orderIndex: 0,
                    });
                    setPhotoFile(null);
                    setMemberError(null);
                    setMemberSuccess(null);
                  }}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={uploadingPhoto}
                >
                  {uploadingPhoto ? 'Uploading...' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
