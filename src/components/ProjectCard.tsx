import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, FileText, Github } from "lucide-react";

interface ProjectLink {
  type: "case-study" | "journal draft" | "repository" | "notebook" | "live demo";
  url: string;
  label?: string;
}

interface ProjectCardProps {
  title: string;
  problem: string;
  data: string;
  approach: string;
  insight: string;
  impact: string;
  tags: string[];
  links?: ProjectLink[];
}

export const ProjectCard = ({
  title,
  problem,
  data,
  approach,
  insight,
  impact,
  tags,
  links = [],
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLinkIcon = (type: ProjectLink["type"]) => {
    switch (type) {
      case "case-study":
        return <FileText className="w-3 h-3" />;
      case "journal draft":
        return <ExternalLink className="w-3 h-3" />;
      case "repository":
        return <Github className="w-3 h-3" />;
        case "notebook":
        return <ExternalLink className="w-3 h-3" />;
        case "live demo":
        return <ExternalLink className="w-3 h-3" />;
    }
  };

  const getLinkLabel = (link: ProjectLink) => {
    if (link.label) return link.label;
    switch (link.type) {
      case "case-study":
        return "case study";
      case "journal draft":
        return "journal draft";
      case "repository":
        return "repository";
    }
  };

  return (
    <motion.article
      className="relative border-l-2 border-border pl-8 py-6 hover:border-primary/60 transition-colors duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-[-5px] top-8 w-2 h-2 bg-primary rounded-full data-point" />
      
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-heading text-2xl text-foreground mb-3 italic">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-1 bg-secondary text-muted-foreground uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Research paper sections */}
      <div className="space-y-4 text-sm">
        <div className="paper-section">
          <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-1">
            Problem
          </span>
          <p className="text-secondary-foreground leading-relaxed">{problem}</p>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="paper-section">
            <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-1">
              Data
            </span>
            <p className="text-secondary-foreground leading-relaxed">{data}</p>
          </div>

          <div className="paper-section">
            <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-1">
              Approach
            </span>
            <p className="text-secondary-foreground leading-relaxed">{approach}</p>
          </div>

          <div className="paper-section">
            <span className="font-mono text-[10px] text-accent uppercase tracking-wider block mb-1">
              Insight
            </span>
            <p className="text-secondary-foreground leading-relaxed">{insight}</p>
          </div>

          <div className="paper-section border-l-primary">
            <span className="font-mono text-[10px] text-primary uppercase tracking-wider block mb-1">
              Impact
            </span>
            <p className="text-foreground leading-relaxed font-medium">{impact}</p>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-mono text-xs text-primary hover:text-accent transition-colors flex items-center gap-2"
          >
            <span className="text-muted-foreground">[</span>
            {isExpanded ? "collapse" : "expand methodology"}
            <span className="text-muted-foreground">]</span>
          </button>

          {links.length > 0 && (
            <div className="flex items-center gap-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 uppercase tracking-wider group"
                >
                  {getLinkIcon(link.type)}
                  <span className="border-b border-transparent group-hover:border-primary/40">
                    {getLinkLabel(link)}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};
