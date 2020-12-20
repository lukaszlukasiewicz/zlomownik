import React, { useRef, useState, useEffect } from "react";
import Styles from "./ExpandablePanel.module.scss";

const lineHeight = 1.8;
const lines = 10;
const defaultHeight = `${lineHeight * lines}em`;

const ExpandablePanel = (props) => {
  const contentRef = useRef(null);
  const [expandable, setExpandable] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { height, className, style = {}, children, ...panelProps } = props;
  const panelHeight = height || defaultHeight;
  const panelClassName = [Styles.ExpandablePanel, className].join(" ");

  useEffect(() => {
    const container = contentRef.current;
    const fakeContent = container.children[0];
    const content = container.children[1];
    const observer = new ResizeObserver(() => {
      const isExpandable = fakeContent.offsetHeight < content.offsetHeight;
      if (expandable != isExpandable) setExpandable(isExpandable);
    });
    observer.observe(content);
    return () => {
      observer.disconnect();
    };
  }, [contentRef.current]);

  return (
    <div className={panelClassName} {...panelProps} style={style}>
      <div
        ref={contentRef}
        className={Styles.ExpandablePanel__content}
        data-expanded={expanded}
        style={{ height: expanded ? "auto" : panelHeight }}
      >
        <div
          className={Styles.fakeContent}
          style={{ height: panelHeight }}
        ></div>
        <div>{children}</div>
      </div>
      {expandable && (
        <div className={Styles.ExpandablePanel__expander}>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "mniej" : "więcej"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpandablePanel;
