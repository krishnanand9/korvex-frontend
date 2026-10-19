import React, { useState, useEffect } from "react";
import {
  adminLogin,
  verifyAdminSession,
  fetchAdminStats,
  fetchAdminEnquiries,
  updateEnquiryStatus,
  getExportEnquiriesUrl,
  fetchSystemHealth,
} from "../services/api";
import { EnquiryRecord } from "../types";
import {
  Lock,
  LogOut,
  Search,
  Filter,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  Bot,
  Terminal,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("korvex_admin_token"));
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState<any>(null);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingData, setLoadingData] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [systemHealth, setSystemHealth] = useState<any>(null);

  // Check existing session
  useEffect(() => {
    if (token) {
      verifyAdminSession(token).then(isValid => {
        if (!isValid) {
          handleLogout();
        } else {
          loadDashboardData(token);
        }
      });
    }
  }, [token]);

  const loadDashboardData = async (activeToken: string) => {
    setLoadingData(true);
    const [statsRes, enquiriesRes, healthRes] = await Promise.all([
      fetchAdminStats(activeToken),
      fetchAdminEnquiries(activeToken, { status: statusFilter, search: searchQuery, page: currentPage, limit: 15 }),
      fetchSystemHealth(),
    ]);

    if (statsRes) setStats(statsRes);
    if (enquiriesRes) {
      setEnquiries(enquiriesRes.enquiries);
      setTotalCount(enquiriesRes.total);
      setTotalPages(enquiriesRes.totalPages);
    }
    if (healthRes) setSystemHealth(healthRes);
    setLoadingData(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const res = await adminLogin(passwordInput);
    setLoginLoading(false);

    if (res.ok && res.token) {
      localStorage.setItem("korvex_admin_token", res.token);
      setToken(res.token);
      setPasswordInput("");
    } else {
      setLoginError(res.error || "Authentication failed. Check your password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("korvex_admin_token");
    setToken(null);
    setEnquiries([]);
    setStats(null);
  };

  const handleStatusChange = async (id: string, newStatus: "new" | "reviewing" | "contacted" | "archived") => {
    if (!token) return;
    const ok = await updateEnquiryStatus(token, id, newStatus);
    if (ok) {
      setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status: newStatus } : e)));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
      // Refresh stats
      fetchAdminStats(token).then(res => res && setStats(res));
    }
  };

  // If unauthenticated: render login view
  if (!token) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="login-icon-box">
            <Shield size={32} />
          </div>
          <h2>Staff Portal Access</h2>
          <p className="login-sub">
            Restricted administrative area. Please enter your administrator security key to review incoming project enquiries.
          </p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="admin-pwd">Administrator Security Key</label>
              <input
                id="admin-pwd"
                type="password"
                required
                placeholder="Enter admin password..."
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {loginError && (
              <div className="form-alert-bad" role="alert">
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" className="btn btn-login-submit" disabled={loginLoading}>
              {loginLoading ? "Authenticating Session..." : "Authorize Access"}
            </button>
          </form>

          <div className="login-note">
            <span>Server-side rate limiting and HMAC token validation active.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-view">
      {/* Admin Top Bar */}
      <header className="admin-top-bar">
        <div className="bar-left">
          <Terminal size={22} className="admin-brand-icon" />
          <div className="admin-title-group">
            <h2>Korvex Operations Command</h2>
            <span className="live-status-pill">
              <span className="status-dot green" />
              API: {systemHealth?.ok ? "Healthy" : "Connecting"} · AI Mode: {systemHealth?.aiEngine?.mode || "Rules"}
            </span>
          </div>
        </div>

        <div className="bar-actions">
          <button
            type="button"
            className="btn ghost small"
            onClick={() => token && loadDashboardData(token)}
            title="Refresh records"
          >
            <RefreshCw size={14} className={loadingData ? "spin" : ""} /> Refresh
          </button>
          <a
            href={getExportEnquiriesUrl(token, "csv")}
            className="btn ghost small"
            download
            title="Download CSV of all enquiries"
          >
            <Download size={14} /> Export CSV
          </a>
          <a
            href={getExportEnquiriesUrl(token, "json")}
            className="btn ghost small"
            download
            title="Download JSON of all enquiries"
          >
            <Download size={14} /> Export JSON
          </a>
          <button type="button" className="btn btn-logout small" onClick={handleLogout}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </header>

      {/* Real Statistics Overview Cards */}
      <section className="admin-metrics-row">
        <div className="metric-box">
          <span className="metric-title">Total Enquiries</span>
          <span className="metric-number">{stats?.total ?? totalCount}</span>
          <span className="metric-note">Real persisted entries</span>
        </div>

        <div className="metric-box">
          <span className="metric-title">Awaiting Review</span>
          <span className="metric-number highlight-cyan">{stats?.byStatus?.new ?? 0}</span>
          <span className="metric-note">Requires team triage</span>
        </div>

        <div className="metric-box">
          <span className="metric-title">In Progress / Contacted</span>
          <span className="metric-number highlight-blue">
            {(stats?.byStatus?.reviewing ?? 0) + (stats?.byStatus?.contacted ?? 0)}
          </span>
          <span className="metric-note">Active prospect dialogues</span>
        </div>

        <div className="metric-box">
          <span className="metric-title">High Priority Leads</span>
          <span className="metric-number highlight-green">{stats?.highPriority ?? 0}</span>
          <span className="metric-note">Evaluated by AI Engine</span>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="admin-workspace-grid">
        {/* Enquiries List Panel */}
        <section className="enquiries-panel">
          {/* Controls Bar */}
          <div className="enquiries-controls">
            <div className="search-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by name, company, email, or scope..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="status-filter-pills">
              {["all", "new", "reviewing", "contacted", "archived"].map(st => (
                <button
                  type="button"
                  key={st}
                  className={`status-chip ${statusFilter === st ? "active" : ""}`}
                  onClick={() => {
                    setStatusFilter(st);
                    setCurrentPage(1);
                  }}
                >
                  {st.toUpperCase()} {stats?.byStatus?.[st] !== undefined && st !== "all" ? `(${stats.byStatus[st]})` : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Table List */}
          {loadingData ? (
            <div className="admin-loading-state">
              <RefreshCw className="spin" size={24} />
              <span>Loading enquiry records...</span>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="admin-empty-state">
              <p>No enquiry records match your current filter.</p>
            </div>
          ) : (
            <div className="enquiries-table-wrap">
              <table className="enquiries-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Status</th>
                    <th>Prospect</th>
                    <th>Category</th>
                    <th>Budget / Timeline</th>
                    <th>AI Priority</th>
                    <th>Received</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map(item => (
                    <tr
                      key={item.id}
                      className={`enquiry-row ${selectedEnquiry?.id === item.id ? "selected" : ""}`}
                      onClick={() => setSelectedEnquiry(item)}
                    >
                      <td className="ref-cell">#{item.id}</td>
                      <td>
                        <span className={`status-tag ${item.status || "new"}`}>
                          {item.status || "new"}
                        </span>
                      </td>
                      <td className="prospect-cell">
                        <strong>{item.name}</strong>
                        <span className="company-text">{item.company || "Individual"} ({item.country})</span>
                      </td>
                      <td>{item.category}</td>
                      <td className="budget-cell">
                        <span>{item.budget || "Unspecified"}</span>
                        <small>{item.timeline || "Flexible"}</small>
                      </td>
                      <td>
                        <span className={`priority-tag ${item.analysis?.priority || "normal"}`}>
                          {item.analysis?.priority || "normal"}
                        </span>
                      </td>
                      <td className="date-cell">
                        {new Date(item.receivedAt).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-inspect"
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedEnquiry(item);
                          }}
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-bar">
              <button
                type="button"
                className="btn ghost small"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages} ({totalCount} total)
              </span>
              <button
                type="button"
                className="btn ghost small"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          )}
        </section>

        {/* Detailed Inspection Drawer / Panel */}
        {selectedEnquiry && (
          <aside className="enquiry-detail-drawer" aria-label="Enquiry Details">
            <div className="drawer-header">
              <div className="drawer-title-group">
                <h3>Enquiry #{selectedEnquiry.id}</h3>
                <span className={`status-tag ${selectedEnquiry.status || "new"}`}>
                  {selectedEnquiry.status || "new"}
                </span>
              </div>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setSelectedEnquiry(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="drawer-body">
              {/* Status Update Dropdown */}
              <div className="drawer-field">
                <label>Manage Lifecycle Status</label>
                <div className="status-btn-group">
                  {(["new", "reviewing", "contacted", "archived"] as const).map(st => (
                    <button
                      type="button"
                      key={st}
                      className={`status-btn ${selectedEnquiry.status === st ? "active" : ""}`}
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                    >
                      {st.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Triage Analysis Card */}
              {selectedEnquiry.analysis && (
                <div className="ai-triage-card">
                  <div className="triage-top">
                    <Bot size={16} />
                    <span>AI Engine Triage ({selectedEnquiry.analysis.mode?.toUpperCase()})</span>
                  </div>
                  <p className="triage-summary">{selectedEnquiry.analysis.summary}</p>
                  <div className="triage-meta-row">
                    <span>Complexity: <strong>{selectedEnquiry.analysis.complexity}</strong></span>
                    <span>Track: <strong>{selectedEnquiry.analysis.suggested_track}</strong></span>
                    <span>Priority: <strong>{selectedEnquiry.analysis.priority}</strong></span>
                  </div>
                  {selectedEnquiry.analysis.follow_up_questions && (
                    <div className="triage-questions">
                      <strong>Suggested Technical Follow-ups:</strong>
                      <ul>
                        {selectedEnquiry.analysis.follow_up_questions.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Prospect Details */}
              <div className="drawer-info-grid">
                <div>
                  <label>Full Name</label>
                  <p>{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label>Work Email</label>
                  <p><a href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a></p>
                </div>
                <div>
                  <label>Company</label>
                  <p>{selectedEnquiry.company || "Not provided"}</p>
                </div>
                <div>
                  <label>Country</label>
                  <p>{selectedEnquiry.country}</p>
                </div>
                <div>
                  <label>Category</label>
                  <p>{selectedEnquiry.category}</p>
                </div>
                <div>
                  <label>Budget</label>
                  <p>{selectedEnquiry.budget || "Unspecified"}</p>
                </div>
                <div>
                  <label>Timeline</label>
                  <p>{selectedEnquiry.timeline || "Unspecified"}</p>
                </div>
                <div>
                  <label>Received Timestamp</label>
                  <p>{new Date(selectedEnquiry.receivedAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Full Description */}
              <div className="drawer-description">
                <label>Project Scope & Requirements</label>
                <div className="desc-box">
                  <p>{selectedEnquiry.description}</p>
                </div>
              </div>

              {/* Direct Mail Action */}
              <div className="drawer-footer-actions">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Korvex%20Technologies%20-%20Project%20Enquiry%20%23${selectedEnquiry.id}`}
                  className="btn"
                >
                  Reply Directly via Email <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
