class Configuration {
  constructor(
    // =============== General ===============
    public version = "1.0.0",

    public debounceTime = 100, // ms debounce
    

    // =============== String art ===============
    // public defaultImage = "/assets/projects/Robot.webp",
    // public defaultImage = "/assets/projects/Einstein.webp",
    public defaultImage = "/assets/projects/Noether.webp",
    public imageSize = 1900,
    public imageConstrast = 100, //100% is base
    public zoomSmoothFactor = 0.1,

    public numPins = 350,
    public maxLines = 3500,
    public lineWidth = 15,
    public firstPin = 0, // //Math.floor(Math.random() * numPins)

    // Limits
    public pinLimits = [2, 1000] as const, 
    public linesLimits = [1, undefined] as const, 
    public lineWidthLimits = [1, 100] as const, 
    public constrastLimits = [1, undefined] as const, 

    public margin = 0, // Margin with the canvas border  
    public radius = 300, // Circle radius

    public neighbourtMaring = 20,
    public lastNUsedPinsMargin = 5,

    public updateEveryNPins = 20,
  ) {}
}



const CONFIG = new Configuration()
export default CONFIG