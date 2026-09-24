import { motion } from 'framer-motion';
import { filterCategories } from '../data/projects';

export default function FilterTabs({ active, onChange }) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter projects by category">
      {filterCategories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={`filter-tab ${active === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
