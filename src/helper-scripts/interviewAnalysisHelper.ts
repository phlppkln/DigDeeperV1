import * as d3 from "d3";

export function calculateScale(
  start: number,
  end: number,
  scaleSteps: number
): number[] {
  const stepSize = (end - start) / (scaleSteps-1);
  const scale: number[] = [];

    for (let i = 0; i < scaleSteps; i++) {
      const value = start + i * stepSize;
      scale.push(value);
    }
  return scale;
}

function sortData(data: any): { [xPos: string]: { [yPos: string]: number } } {
  const sortedData: any = {};
  Object.keys(data)
    .sort()
    .forEach((key) => {
      sortedData[key] = data[key];
      const innerKeys = Object.keys(data[key]).sort();
      const sortedInnerData: any = {};
      innerKeys.forEach((innerKey) => {
        sortedInnerData[innerKey] = data[key][innerKey];
      });
      sortedData[key] = sortedInnerData;
    });

  return sortedData;
}

export const assignItemsToScale = (
  items: Answer[],
  scaleX: number[],
  scaleY: number[]
): HeatmapVisItem[] => {
  const scaleData: HeatmapVisItem[] = [];

  // Assign items to scaleData
  for (const item of items) {
    const { x, y } = item;

    // Find the nearest index in the scaleX and scaleY arrays#
    let xClosestIndex = -1;
    let xClosestDistance = -1;
    for(let i = 0; i < scaleX.length; i++) {
      const distance = Math.abs(x - scaleX[i]);
      if (xClosestDistance === -1 || distance < xClosestDistance) {
        xClosestDistance = distance;
        xClosestIndex = i;
      }
    }
    let yClosestIndex = -1;
    let yClosestDistance = -1;
    for(let i = 0; i < scaleY.length; i++) {
      const distance = Math.abs(y - scaleY[i]);
      if (yClosestDistance === -1 || distance < yClosestDistance) {
        yClosestDistance = distance;
        yClosestIndex = i;
      }
    }
    // Check if the indices are within range
    if (xClosestIndex >= 0 && xClosestIndex < scaleX.length && yClosestIndex >= 0 && yClosestIndex < scaleY.length) {
      scaleData.push({ x: xClosestIndex, y: yClosestIndex, item });
    }
  }

  return scaleData;
};

export function createHeatmap(
  data: HeatmapVisItem[],
  steps: number,
  xStartLabel: string,
  xEndLabel: string,
  yStartLabel: string,
  yEndLabel: string
): HeatmapInterface[] {
  const heatmap: HeatmapInterface[] = [];

  console.log("data", data)

  for (let x = 0; x < steps; x++) {
    for (let y = 0; y < steps; y++) {
      const heatmapItem: HeatmapInterface = {
        x: x + "",
        y: y + "",
        value: 0,
      };
      if (x === 0) {
        heatmapItem.x = xStartLabel;
      }
      if (x === steps - 1) {
        heatmapItem.x = xEndLabel;
      }
      if (y === 0) {
        heatmapItem.y = yStartLabel;
      }
      if (y === steps - 1) {
        heatmapItem.y = yEndLabel;
      }
      heatmap.push(heatmapItem);
    }
  }

  data.forEach((answer) => {
    const { x, y } = answer;
    //convert x and y to string
    let yStr = y + "";
    let xStr = x + "";
    if (x === 0) {
      xStr = xStartLabel;
    }
    if (x === steps - 1) {
      xStr = xEndLabel;
    }
    if (y === 0) {
      yStr = yEndLabel;
    }
    if (y === steps - 1) {
      yStr = yStartLabel;
    }
    const heatmapItem = heatmap.find(
      (heatmap) => heatmap.x === xStr && heatmap.y === yStr
    );
    if (heatmapItem) {
      heatmapItem.value++;
    }
  });

  return heatmap;
}

export function addToHeatmap(
  data: HeatmapVisItem[],
  heatmap: HeatmapInterface[],
  steps: number,
  xStartLabel: string,
  xEndLabel: string,
  yStartLabel: string,
  yEndLabel: string
): HeatmapInterface[] {
  const updatedHeatmap: HeatmapInterface[] = [];

  data.forEach((item) => {
    const { x, y } = item;
    //convert x and y to string
    let yStr = y + "";
    let xStr = x + "";
    if (x === 0) {
      xStr = xStartLabel;
    }
    if (x === steps - 1) {
      xStr = xEndLabel;
    }
    if (y === 0) {
      yStr = yEndLabel;
    }
    if (y === steps - 1) {
      yStr = yStartLabel;
    }
    const existingItem = heatmap.find(
      (existingHeatmap) =>
        existingHeatmap.x === xStr && existingHeatmap.y === yStr
    );
    if (existingItem) {
      existingItem.value++;
    } else {
      console.log("item", item);
      throw new Error("HeatmapItem not found");
    }
  });

  return updatedHeatmap;
}

// Invert y values within a dataset
export const invertDataset = (dataset: HeatmapVisItem[]): void => {
  // Find min and max values
  const minY = Math.min(...dataset.map((d) => d.y));
  const maxY = Math.max(...dataset.map((d) => d.y));

  dataset.forEach((d) => {
    //d.x = invertNumbers(d.x, minX, maxX);
    d.y = invertNumbers(d.y, minY, maxY);
  });
};

// Invert the numbers within a range
const invertNumbers = (value: number, min: number, max: number): number => {
  return max - (value - min);
};

// Find min and max values within a dataset
export const findMinMax = (
  dataset: HeatmapVisItem[]
): { minX: number; maxX: number; minY: number; maxY: number } => {
  const minX = Math.min(...dataset.map((d) => d.x));
  const maxX = Math.max(...dataset.map((d) => d.x));
  const minY = Math.min(...dataset.map((d) => d.y));
  const maxY = Math.max(...dataset.map((d) => d.y));

  return { minX, maxX, minY, maxY };
};
