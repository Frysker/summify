import { useEffect, useMemo } from "react";
import MobileShell from "../components/layout/MobileShell";
import { useDocument } from "../context/DocumentContext";

const sampleTerms = [
  { label: "Term", angle: 300, distance: 96, children: ["Term", "Term", "Term", "Term"] },
  { label: "Term", angle: 35, distance: 94, children: ["Term", "Term", "Term", "Term", "Term"] },
  { label: "Term", angle: 145, distance: 108, children: ["Term", "Term", "Term"] },
  { label: "Term", angle: 62, distance: 166, children: ["Term", "Term", "Term"] },
  { label: "Term", angle: 180, distance: 205, children: ["Term", "Term", "Term"] },
  { label: "Term", angle: 230, distance: 148, children: ["Term", "Term", "Term"] },
];

export default function GraphPage() {
  const { keyTerms, setActiveTab } = useDocument();
  const graph = useMemo(() => buildGraph(keyTerms), [keyTerms]);

  useEffect(() => {
    setActiveTab("graph");
  }, [setActiveTab]);

  return (
    <MobileShell topTabs>
      <div className="graph-page">
        <svg className="graph-map" viewBox="0 0 380 745" role="img" aria-label="Key term graph">
          <text className="graph-key" x="190" y="330">Key</text>

          {graph.edges.map((edge) => (
            <line
              key={edge.id}
              className="graph-line"
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
            />
          ))}

          {graph.nodes.map((node) => (
            <text
              key={node.id}
              className={node.primary ? "graph-node graph-node--primary" : "graph-node"}
              x={node.x}
              y={node.y}
            >
              {node.label}
            </text>
          ))}
        </svg>
      </div>
    </MobileShell>
  );
}

function buildGraph(keyTerms) {
  const realLabels = keyTerms?.nodes?.map((node) => node?.data?.label).filter(Boolean) ?? [];
  if (realLabels.length) return buildRealGraph(realLabels);
  return buildSampleGraph();
}

function buildSampleGraph() {
  const center = { x: 190, y: 330 };
  const nodes = [];
  const edges = [];

  sampleTerms.forEach((branch, branchIndex) => {
    const root = polar(center, branch.angle, branch.distance);
    const rootId = `root-${branchIndex}`;
    nodes.push({ id: rootId, label: branch.label, x: root.x, y: root.y, primary: true });
    edges.push(edge(`center-${branchIndex}`, center, root));

    branch.children.forEach((label, childIndex) => {
      const childAngle = branch.angle + (childIndex - (branch.children.length - 1) / 2) * 18;
      const child = polar(root, childAngle, 58 + childIndex * 5);
      nodes.push({ id: `${rootId}-${childIndex}`, label, x: child.x, y: child.y });
      edges.push(edge(`${rootId}-edge-${childIndex}`, root, child));
    });
  });

  return { nodes, edges };
}

function buildRealGraph(labels) {
  const center = { x: 190, y: 330 };
  const rootLabels = labels.slice(0, 6);
  const childLabels = labels.slice(6);
  const nodes = [];
  const edges = [];

  rootLabels.forEach((label, index) => {
    const root = polar(center, index * (360 / rootLabels.length) - 85, 150);
    nodes.push({ id: `real-${index}`, label, x: root.x, y: root.y, primary: true });
    edges.push(edge(`real-edge-${index}`, center, root));

    const child = childLabels[index];
    if (child) {
      const childPoint = polar(root, index * (360 / rootLabels.length) - 70, 58);
      nodes.push({ id: `real-child-${index}`, label: child, x: childPoint.x, y: childPoint.y });
      edges.push(edge(`real-child-edge-${index}`, root, childPoint));
    }
  });

  return { nodes, edges };
}

function polar(origin, angle, distance) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: Math.round(origin.x + Math.cos(radians) * distance),
    y: Math.round(origin.y + Math.sin(radians) * distance),
  };
}

function edge(id, from, to) {
  return { id, x1: from.x, y1: from.y, x2: to.x, y2: to.y };
}
