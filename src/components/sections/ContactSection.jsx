import { useId } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Lock,
  CheckCircle2,
  AlertCircle,
  User,
  Mail as MailIcon,
  Tag,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { CONTACT_INFO, PROFILE } from "../../data/portfolioData";
import { getIcon } from "../../utils/iconRegistry";
import useContactForm from "../../hooks/useContactForm";
import Reveal from "../ui/Reveal";

/**
 * FormField
 * ---------------------------------------------------------------------------
 * Reusable labeled input/textarea with leading icon and inline error message.
 */
function FormField({
  as = "input",
  icon: Icon,
  error,
  className = "",
  ...props
}) {
  const id = useId();
  const FieldTag = as;

  return (
    <div className={className}>
      <div
        className={`flex items-start gap-2.5 rounded-xl border bg-white/[0.03] px-4 ${
          as === "textarea" ? "py-3" : "py-3.5"
        } transition-colors ${
          error ? "border-rose-500/60" : "border-white/[0.08] focus-within:border-primary/50"
        }`}
      >
        <Icon size={18} className={`mt-0.5 shrink-0 ${error ? "text-rose-400" : "text-muted"}`} />
        <FieldTag
          id={id}
          className="w-full resize-none bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
          rows={as === "textarea" ? 5 : undefined}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
          <AlertCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * ContactSection
 * ---------------------------------------------------------------------------
 * Glass-card contact form (Name / Email / Subject / Message) with full
 * client-side validation via useContactForm, plus a contact info column
 * and social links.
 */
export default function ContactSection() {
  const { values, errors, status, handleChange, handleSubmit } = useContactForm();

  const socials = [
    { id: "github", icon: Github, href: PROFILE.social.github },
    { id: "linkedin", icon: Linkedin, href: PROFILE.social.linkedin },
    { id: "twitter", icon: Twitter, href: PROFILE.social.twitter },
    { id: "instagram", icon: Instagram, href: PROFILE.social.instagram },
  ];

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow">Get In Touch</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Let's <span className="gradient-text">Work Together</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              Have a project in mind or just want to say hi? I'd love to hear
              from you.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact info column */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              {CONTACT_INFO.map((item) => {
                const Icon = getIcon(item.icon);
                const Wrapper = item.href ? "a" : "div";
                return (
                  <Wrapper
                    key={item.id}
                    {...(item.href ? { href: item.href } : {})}
                    className="glass-card-hover flex items-start gap-4 p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                      <Icon size={19} className="text-primary-light" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-white">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{item.description}</p>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-primary-light">
                        {item.value}
                        {item.dot && (
                          <span
                            className="h-2 w-2 rounded-full animate-pulse"
                            style={{ backgroundColor: "#22C55E" }}
                          />
                        )}
                      </p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-card border-primary/20 p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-semibold text-white">
                Send me a message
              </h3>
              <p className="mt-1 text-sm text-muted">
                I'll get back to you as soon as possible.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  icon={User}
                  name="name"
                  placeholder="Your Name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                  autoComplete="name"
                />
                <FormField
                  icon={MailIcon}
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  autoComplete="email"
                />
                <FormField
                  icon={Tag}
                  name="subject"
                  placeholder="Subject"
                  value={values.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  className="sm:col-span-2"
                />
                <FormField
                  as="textarea"
                  icon={MessageSquare}
                  name="message"
                  placeholder="Your Message"
                  value={values.message}
                  onChange={handleChange}
                  error={errors.message}
                  className="sm:col-span-2"
                />
              </div>

              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                  {status !== "submitting" && <Send size={16} />}
                </motion.button>

                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <Lock size={13} />
                  Your information is safe with me. I respect your privacy.
                </p>
              </div>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3 text-sm text-success"
                >
                  <CheckCircle2 size={16} />
                  Thanks for reaching out! Your message has been sent.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>

        {/* Connect strip */}
        <Reveal delay={0.3}>
          <div className="glass-card mt-6 flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h4 className="font-display font-semibold text-white">
                Let's Connect
              </h4>
              <p className="mt-1 text-sm text-muted">
                Find me on these platforms
              </p>
            </div>
            <div className="flex items-center gap-3">
              {socials.map(({ id, icon: Icon, href }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:text-primary-light hover:shadow-glow"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
