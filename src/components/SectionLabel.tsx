import { motion } from "framer-motion";

interface SectionLabelProps {
  number: string;
  label: string;
}

export const SectionLabel = ({ number, label }: SectionLabelProps) => {
  return (
    <motion.div 
      className="flex items-center gap-4 mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="font-mono text-xs text-primary tracking-widest">
        {number}
      </span>
      <div className="h-px w-12 bg-primary/30" />
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
};
