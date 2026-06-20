import {
  Code2,
  Code as VsCodeIcon,
  GitBranch,
  Star,
  CalendarCheck,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Rocket,
  Lightbulb,
  Target,
  Server,
  Database,
  Wrench,
  FileCode2,
  Layers,
  Mail,
  Phone,
  Clock,
  Monitor,
  ClipboardList,
  Cloud,
} from "lucide-react";

import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiHtml5,
  SiCss as SiCss3, // react-icons exports CSS3's icon as "SiCss"
  SiJavascript,
  SiGit,
  SiGithub,
  SiPostman,
} from "react-icons/si";

/**
 * ICON_MAP
 * ---------------------------------------------------------------------------
 * Maps string identifiers (used inside data/portfolioData.js) to actual
 * icon components. This lets data stay framework-agnostic plain objects
 * while components resolve the real icon at render time via getIcon().
 */
const ICON_MAP = {
  // lucide-react (UI icons)
  Code2,
  GitBranch,
  Star,
  CalendarCheck,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Rocket,
  Lightbulb,
  Target,
  Server,
  Database,
  Wrench,
  FileCode2,
  Layers,
  Mail,
  Phone,
  Clock,
  Monitor,
  ClipboardList,
  Cloud,

  // react-icons/si (brand/technology icons)
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGit,
  SiGithub,
  VsCodeIcon,
  SiPostman,
};

/**
 * getIcon
 * @param {string} name - key from ICON_MAP
 * @returns {React.ComponentType} icon component, falls back to Code2
 */
export function getIcon(name) {
  return ICON_MAP[name] || Code2;
}
