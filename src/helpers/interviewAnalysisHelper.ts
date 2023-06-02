export function calculateScale(start: number, end: number, scaleSteps: number): number[] {
    const stepSize = (end - start) / scaleSteps;
    const scale: number[] = [];
  
    for (let i = 0; i < scaleSteps; i++) {
      const value = start + i * stepSize;
      scale.push(value);
    }
  
    return scale;
  }
  
  function sortData(data:any): { [xPos: string]: { [yPos: string]: number } }{
    const sortedData:any = {};
    Object.keys(data)
      .sort()
      .forEach((key) => {
        sortedData[key] = data[key];
        const innerKeys = Object.keys(data[key]).sort();
        const sortedInnerData:any = {};
        innerKeys.forEach((innerKey) => {
          sortedInnerData[innerKey] = data[key][innerKey];
        });
        sortedData[key] = sortedInnerData;
      });
    
    return sortedData;
    }
    
    
export function getItemsAssignedToScale(items: Answer[], scaleX: number[], scaleY: number[]): HeatmapVisItem[] {
    return items.map((item) => {
      const xPos = Math.floor((item.x - scaleX[0]) / (scaleX[1] - scaleX[0]));
      const yPos = Math.floor((item.y - scaleY[0]) / (scaleY[1] - scaleY[0]));
      return { xPos, yPos, item };
    });
  }
    
    export function countItemsInSteps(items: Answer[], scaleX: number[], scaleY: number[]): HeatmapInterface[] {
      //console.log('items', items)
        const counts: { [xPos: string]: { [yPos: string]: number } } = {};
    
      items.forEach((item) => {
        const xStep = Math.floor((item.x - scaleX[0]) / (scaleX[1] - scaleX[0]));
        const yStep = Math.floor((item.y - scaleY[0]) / (scaleY[1] - scaleY[0]));
    
        const xPos = `Step ${xStep}`;
        const yPos = `Step ${yStep}`;
    
        counts[xPos] = counts[xPos] || {};
        counts[xPos][yPos] = (counts[xPos][yPos] || 0) + 1;
        //console.log(counts)
      });
    
      const sortedData = sortData(counts);
      //console.log(sortedData)
    
    
      const heatmapData: HeatmapInterface[] = [];
      Object.entries(sortedData).forEach(([xPos, yCounts]) => {
        Object.entries(yCounts).forEach(([yPos, count]) => {
          heatmapData.push({ xPos, yPos, value: count });
        });
      });
    
      return heatmapData;
    }


export function createHeatmap(data: HeatmapVisItem[]): HeatmapInterface[] {
    
const heatmap: HeatmapInterface[] = [];

for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    const heatmapItem: HeatmapInterface = {
      xPos: x+"",
      yPos: y+"",
      value: 0
    };
    heatmap.push(heatmapItem);
  }
}

data.forEach((answer) => {
    const { xPos, yPos } = answer;
    const heatmapItem = heatmap.find((heatmap) => heatmap.xPos === xPos+"" && heatmap.yPos === yPos+"");
    if (heatmapItem) {
      heatmapItem.value++;
    }
  });


  return heatmap;
}

export function addToHeatmap(data: HeatmapVisItem[], heatmap:HeatmapInterface[]): HeatmapInterface[] {
    
    const updatedHeatmap: HeatmapInterface[] = [];
    
    data.forEach((item) => {
        const { xPos, yPos } = item;
        const existingItem = heatmap.find((existingHeatmap) => existingHeatmap.xPos === xPos+"" && existingHeatmap.yPos === yPos+"");
        if (existingItem) {
          existingItem.value++;
        } else {
          throw new Error('HeatmapItem not found');
        }
      });

      return updatedHeatmap;
    }