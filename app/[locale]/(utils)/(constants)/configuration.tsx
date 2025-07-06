class Configuration {
  constructor(
    // General
    public version = "1.0.0",
    
    // String art
    // public defaultImage = "/assets/projects/Robot.webp",
    // public defaultImage = "/assets/projects/Einstein.webp",
    public defaultImage = "/assets/projects/Noether.webp",
    public imageSize = undefined,
    public imageConstrast = 100, //100% is base
    public zoomSmoothFactor = 0.1,

    public lineWidth = 0.15,
    public numPins = 300,
    public maxLines = 3500,
    public firstPin = 0, // //Math.floor(Math.random() * numPins)

    public margin = 0, // Margin with the canvas border  
    public radius = 325, // Circle radius

    public neighbourtMaring = 10,
    public lastNUsedPinsMargin = 10,

    public updateEveryNPins = 20,
  ) {}
}



const CONFIG = new Configuration()
export default CONFIG