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
      let x = Math.floor((item.x - scaleX[0]) / (scaleX[1] - scaleX[0]));
      let y = Math.floor((item.y - scaleY[0]) / (scaleY[1] - scaleY[0]));
      //set min and max
      if(x < 0) x = 0;
      if(x > scaleX.length-1) x = scaleX.length-1;
      if(y < 0) y = 0;
      if(y > scaleY.length-1) y = scaleY.length-1;
      return { x, y, item };
    });
  }
    
  /*   export function countItemsInSteps(items: Answer[], scaleX: number[], scaleY: number[], xStartLabel:string, xEndLabel: string, yStartLabel:string, yEndLabel: string): HeatmapInterface[] {
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
      Object.entries(sortedData).forEach(([x, yCounts]) => {
        Object.entries(yCounts).forEach(([y, count]) => {
          const heatmapItem: HeatmapInterface = {
            x,
            y,
            xStartLabel,
            xEndLabel,
            yStartLabel,
            yEndLabel,
            value: count
          };
          heatmapData.push(heatmapItem);
        });
      });
    
      return heatmapData;
    }
 */

export function createHeatmap(data: HeatmapVisItem[], steps: number, xStartLabel:string, xEndLabel:string, yStartLabel:string, yEndLabel:string): HeatmapInterface[] {
    
const heatmap: HeatmapInterface[] = [];

for (let x = 0; x < steps; x++) {
  for (let y = 0; y < steps; y++) {
    const heatmapItem: HeatmapInterface = {
      x: x+"",
      y: y+"",
      value: 0
    };
/*     if(x === 0){
      heatmapItem.x = xStartLabel;
    }
    if(x === steps-1){
      heatmapItem.x = xEndLabel;
    }
    if(y===0){
      heatmapItem.y = yStartLabel;
    }
    if(y===steps-1){
      heatmapItem.y = yEndLabel;
    } */
    heatmap.push(heatmapItem);
  }
}

data.forEach((answer) => {
    const { x, y } = answer;
    //convert x and y to string
    let yStr = y+"";
    let xStr = x+"";
/*     if(x ===0){
      xStr = xStartLabel;
    }
    if(x === steps-1){
      xStr = xEndLabel;
    }
    if(y===0){
      yStr = yStartLabel;
    }
    if(y===steps-1){
      yStr = yEndLabel;
    } */
    const heatmapItem = heatmap.find((heatmap) => heatmap.x === xStr && heatmap.y === yStr);
    if (heatmapItem) {
      heatmapItem.value++;
    }
  });


  return heatmap;
}

export function addToHeatmap(data: HeatmapVisItem[], heatmap:HeatmapInterface[], steps:number, xStartLabel:string, xEndLabel:string, yStartLabel:string, yEndLabel:string): HeatmapInterface[] {
    
    const updatedHeatmap: HeatmapInterface[] = [];
    
    data.forEach((item) => {
        const { x, y } = item;
            //convert x and y to string
    let yStr = y+"";
    let xStr = x+"";
/*     if(x ===0){
      xStr = xStartLabel;
    }
    if(x === heatmap.length-1){
      xStr = xEndLabel;
    }
    if(y===0){
      yStr = yStartLabel;
    }
    if(y===heatmap.length-1){
      yStr = yEndLabel;
    } */
        const existingItem = heatmap.find((existingHeatmap) => existingHeatmap.x === xStr && existingHeatmap.y === yStr);
        if (existingItem) {
          existingItem.value++;
        } else {
          console.log('item', item)
          throw new Error('HeatmapItem not found');
        }
      });

      return updatedHeatmap;
    }