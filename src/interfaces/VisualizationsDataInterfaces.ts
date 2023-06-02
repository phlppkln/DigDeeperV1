interface ScatterDataPointInterface {
    x: number;
    y: number;
    label?: String;
  }

  interface ScatterDataInterface {
    data: ScatterDataPointInterface[];
    xLabel?: String;
    yLabel?: String;
  }
  
  interface BarchartInterface {
    label: string;
    value: number;
  }
  
  interface HeatmapInterface {
    xPos: string;
    yPos: string;
    value: number;
  }
  
  interface Heatmaps {
    data: HeatmapInterface[];
    title: string;
  }

  interface HeatmapVisItem {
    xPos: number;
    yPos: number;
    item: Answer
  }