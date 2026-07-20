import { useEffect, useState } from "react";
import { Mail, Star, Trash2, MailOpen, ChevronDown, ChevronUp } from "lucide-react";
import { getMessages, updateMessage, deleteMessage } from "../api.js";

export default function AdminMessages() {
  const [messages, setMessages]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [expanded, setExpanded]   = useState(null);
  const [unreadCount, setUnread]  = useState(0);

  const fetchMessages = async () => {
    try {
      const res = await getMessages();
      setMessages(res.data || []);
      setUnread(res.unreadCount || 0);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (msg) => {
    await updateMessage(msg._id, { read: !msg.read });
    fetchMessages();
  };

  const toggleStar = async (msg) => {
    await updateMessage(msg._id, { starred: !msg.starred });
    fetchMessages();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await deleteMessage(id);
    if (expanded === id) setExpanded(null);
    fetchMessages();
  };

  const handleExpand = async (msg) => {
    if (expanded === msg._id) { setExpanded(null); return; }
    setExpanded(msg._id);
    // Auto-mark as read when opened
    if (!msg.read) {
      await updateMessage(msg._id, { read: true });
      fetchMessages();
    }
  };

  const fmt = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">
          Messages
          {unreadCount > 0 && (
            <span className="ml-3 rounded-full bg-success/20 px-2.5 py-0.5 text-sm font-semibold text-success">
              {unreadCount} unread
            </span>
          )}
        </h1>
        <p className="mt-1 text-sm text-muted">
          Contact form submissions from your portfolio visitors.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : messages.length === 0 ? (
        <div className="glass-card py-20 text-center">
          <Mail size={40} className="mx-auto mb-3 text-muted opacity-40" />
          <p className="text-muted">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`glass-card overflow-hidden transition-all ${
                !msg.read ? "border-primary/30" : ""
              }`}
            >
              {/* Header row */}
              <div className="flex items-center gap-3 p-4">
                {/* Unread indicator */}
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    msg.read ? "bg-transparent" : "bg-primary-light"
                  }`}
                />

                <button
                  onClick={() => handleExpand(msg)}
                  className="flex flex-1 items-start gap-3 text-left overflow-hidden"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <span className="text-sm font-bold text-primary-light">
                      {msg.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold truncate ${msg.read ? "text-white" : "text-white"}`}>
                        {msg.name}
                      </p>
                      <span className="text-xs text-muted shrink-0">
                        {fmt(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-muted truncate">{msg.email}</p>
                    {msg.subject && (
                      <p className="text-xs text-muted truncate">Re: {msg.subject}</p>
                    )}
                    {expanded !== msg._id && (
                      <p className="mt-0.5 text-xs text-muted truncate opacity-70">
                        {msg.message}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-muted">
                    {expanded === msg._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {/* Action buttons */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => toggleStar(msg)}
                    title={msg.starred ? "Unstar" : "Star"}
                    className={`rounded-lg p-2 transition-colors ${
                      msg.starred
                        ? "text-yellow-400 hover:text-yellow-500"
                        : "text-muted hover:text-yellow-400"
                    }`}
                  >
                    <Star size={15} fill={msg.starred ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => toggleRead(msg)}
                    title={msg.read ? "Mark unread" : "Mark read"}
                    className="rounded-lg p-2 text-muted hover:text-primary-light transition-colors"
                  >
                    {msg.read ? <Mail size={15} /> : <MailOpen size={15} />}
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="rounded-lg p-2 text-muted hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Expanded message body */}
              {expanded === msg._id && (
                <div className="border-t border-white/[0.06] bg-white/[0.02] px-6 py-4">
                  <div className="mb-3 flex flex-wrap gap-3 text-xs text-muted">
                    <span><strong className="text-white">From:</strong> {msg.name} &lt;{msg.email}&gt;</span>
                    {msg.subject && <span><strong className="text-white">Subject:</strong> {msg.subject}</span>}
                    <span><strong className="text-white">Sent:</strong> {fmt(msg.createdAt)}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-bodytext">
                    {msg.message}
                  </p>
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Your message"}`}
                    className="btn-primary mt-4 inline-flex !py-2 text-sm"
                  >
                    Reply via Email
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
