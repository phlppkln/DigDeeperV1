import { useState } from "react";
import { Renderer } from "./Renderer";
import { Tooltip } from "./Tooltip";

/*
 * Heatmap component
 * @param {string} title - The title of the heatmap
 * @param {number} width - The width of the heatmap
 * @param {number} height - The height of the heatmap
 * @param {object[]} data - The data to be displayed in the heatmap
 */
type HeatmapProps = {
  title: string;
  width: number;
  height: number;
  data: { x: string; y: string; value: number }[];
};

export type InteractionData = {
  xLabel: string;
  yLabel: string;
  xPos: number;
  yPos: number;
  value: number;
};

export const Heatmap = ({ title, width, height, data }: HeatmapProps) => {
  const [hoveredCell, setHoveredCell] = useState<InteractionData | null>(null);

  return (
    <div style={{ position: "relative" }}>
      <h2>{title}</h2>
      <Renderer
        width={width}
        height={height}
        data={data}
        setHoveredCell={setHoveredCell}
      />
      <Tooltip interactionData={hoveredCell} width={width} height={height} />
    </div>
  );
};
