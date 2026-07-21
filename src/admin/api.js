/**
 * api.js
 * ---------------------------------------------------------------------------
 * Centralized API client for all admin panel ↔ backend communication.
 * All functions return { success, data/message } matching the backend format.
 *
 * The base URL reads from the VITE_API_URL environment variable so you can
 * switch between local dev and production deployment without code changes.
 * Create a .env.local file in the frontend root with:
 *   VITE_API_URL=http://localhost:5000
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Attach the JWT token from localStorage to every admin request
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
});

const handle = async (fetchPromise) => {
  let response;
  try {
    response = await fetchPromise;
  } catch (networkError) {
    // fetch() itself threw — backend is unreachable or CORS preflight failed
    throw new Error(
      "Cannot reach the backend server. Make sure it is running on " +
      BASE_URL + " and check your .env.local VITE_API_URL setting."
    );
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    throw new Error(
      `Server returned non-JSON (status ${response.status}). ` +
      `Response: ${text.slice(0, 150)}`
    );
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
};

// ── Auth ─────────────────────────────────────────────────────────────────────

export const login = (email, password) =>
  handle(fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }));

export const verifyToken = () =>
  handle(fetch(`${BASE_URL}/api/auth/verify`, { headers: authHeaders() }));

// ── Projects ──────────────────────────────────────────────────────────────────

export const getProjects = () =>
  handle(fetch(`${BASE_URL}/api/projects?all=true`, { headers: authHeaders() }));

export const createProject = (data) =>
  handle(fetch(`${BASE_URL}/api/projects`, {
    method: "POST", headers: authHeaders(), body: JSON.stringify(data),
  }));

export const updateProject = (id, data) =>
  handle(fetch(`${BASE_URL}/api/projects/${id}`, {
    method: "PUT", headers: authHeaders(), body: JSON.stringify(data),
  }));

export const deleteProject = (id) =>
  handle(fetch(`${BASE_URL}/api/projects/${id}`, {
    method: "DELETE", headers: authHeaders(),
  }));

// ── Skills ───────────────────────────────────────────────────────────────────

export const getSkills = () =>
  handle(fetch(`${BASE_URL}/api/skills`, { headers: authHeaders() }));

export const createSkill = (data) =>
  handle(fetch(`${BASE_URL}/api/skills`, {
    method: "POST", headers: authHeaders(), body: JSON.stringify(data),
  }));

export const updateSkill = (id, data) =>
  handle(fetch(`${BASE_URL}/api/skills/${id}`, {
    method: "PUT", headers: authHeaders(), body: JSON.stringify(data),
  }));

export const deleteSkill = (id) =>
  handle(fetch(`${BASE_URL}/api/skills/${id}`, {
    method: "DELETE", headers: authHeaders(),
  }));

// ── Journey ──────────────────────────────────────────────────────────────────

export const getJourney = () =>
  handle(fetch(`${BASE_URL}/api/journey`, { headers: authHeaders() }));

export const createJourneyEntry = (data) =>
  handle(fetch(`${BASE_URL}/api/journey`, {
    method: "POST", headers: authHeaders(), body: JSON.stringify(data),
  }));

export const updateJourneyEntry = (id, data) =>
  handle(fetch(`${BASE_URL}/api/journey/${id}`, {
    method: "PUT", headers: authHeaders(), body: JSON.stringify(data),
  }));

export const deleteJourneyEntry = (id) =>
  handle(fetch(`${BASE_URL}/api/journey/${id}`, {
    method: "DELETE", headers: authHeaders(),
  }));

// ── Hero ─────────────────────────────────────────────────────────────────────

export const getHero = () =>
  handle(fetch(`${BASE_URL}/api/hero`, { headers: authHeaders() }));

export const updateHero = (data) =>
  handle(fetch(`${BASE_URL}/api/hero`, {
    method: "PUT", headers: authHeaders(), body: JSON.stringify(data),
  }));

// ── Messages ─────────────────────────────────────────────────────────────────

export const getMessages = (params = "") =>
  handle(fetch(`${BASE_URL}/api/messages${params}`, { headers: authHeaders() }));

export const updateMessage = (id, data) =>
  handle(fetch(`${BASE_URL}/api/messages/${id}`, {
    method: "PUT", headers: authHeaders(), body: JSON.stringify(data),
  }));

export const deleteMessage = (id) =>
  handle(fetch(`${BASE_URL}/api/messages/${id}`, {
    method: "DELETE", headers: authHeaders(),
  }));

// ── Public contact form submit (no auth needed) ───────────────────────────────

export const sendMessage = (data) =>
  handle(fetch(`${BASE_URL}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }));