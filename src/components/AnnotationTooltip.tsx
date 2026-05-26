import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface AnnotationTooltipProps {
  children: React.ReactNode;
  annotation: string;
  code?: string;
}

export const AnnotationTooltip = ({ children, annotation, code }: AnnotationTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help border-b border-dashed border-primary/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 z-50 min-w-[200px] max-w-[320px]"
          >
            <div className="annotation">
              <span className="text-accent font-mono text-[10px] block mb-1"># annotation</span>
              {annotation}
            </div>
            {code && (
              <div className="code-block mt-2 text-[11px]">
                <span className="text-muted-foreground">{code}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
