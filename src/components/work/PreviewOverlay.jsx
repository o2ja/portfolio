import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useModal } from '../../lib/useModal';
import PreviewHost from './PreviewHost';

const DEVICES = [
  { id: 'desktop', label: 'Desktop', width: 1440 },
  { id: 'tablet', label: 'Tablet', width: 834 },
  { id: 'mobile', label: 'Mobile', width: 390 },
];

/**
 * Expanded, readable preview. Because the preview runs the project's own
 * responsive code, switching device width shows its real tablet and phone
 * layouts, not a scaled copy of the desktop.
 */
export default function PreviewOverlay({ project, open, onClose, onBlocked, notice, returnFocus }) {
  const ref = useModal(open, returnFocus);
  const stage = useRef(null);
  const [device, setDevice] = useState(DEVICES[0]);
  const [stageWidth, setStageWidth] = useState(0);

  // open on the layout that matches the visitor's own screen
  useEffect(() => {
    if (open) setDevice(window.innerWidth < 768 ? DEVICES[2] : window.innerWidth < 1100 ? DEVICES[1] : DEVICES[0]);
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const el = stage.current;
    const measure = () => setStageWidth(el.clientWidth - parseFloat(getComputedStyle(el).paddingLeft) * 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open]);

  const scale = stageWidth ? Math.min(1, stageWidth / device.width) : 1;

  return (
    <dialog ref={ref} className="dialog explore" aria-labelledby="explore-title" onClose={onClose} data-lenis-prevent>
      {open && (
        <>
          <div className="dialog__head">
            <div>
              <h2 id="explore-title" className="dialog__title">
                {project.name}
              </h2>
              <p className="mono muted">{project.demoNote}</p>
            </div>
            <div className="explore__tools">
              <div className="segmented" role="group" aria-label="Preview width">
                {DEVICES.map((d) => (
                  <button key={d.id} type="button" aria-pressed={d.id === device.id} onClick={() => setDevice(d)}>
                    {d.label}
                  </button>
                ))}
              </div>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close preview">
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>
          <div ref={stage} className="explore__stage">
            <div className="explore__device" style={{ width: device.width * scale }}>
              {stageWidth > 0 && <PreviewHost project={project} width={device.width} onBlocked={onBlocked} onEscape={onClose} />}
            </div>
          </div>
          {notice && (
            <p className="toast" role="status">
              {notice}
            </p>
          )}
        </>
      )}
    </dialog>
  );
}
