class Configuration {
  constructor(
    // General
    public version = "1.0.0",
    
    // String art
    // public defaultImage = "/assets/projects/Robot.webp",
    public defaultImage = "/assets/projects/Einstein.webp",
    public imageSize = undefined,
    public lineWidth = 0.20,
    public numPins = 288,
    public maxLines = 3500,
    public firstPin = 0, // //Math.floor(Math.random() * numPins)

    public margin = 0, // Margin with the canvas border  
    public radius = 350, // Circle radius

    public neighbourtMaring = 15,//0.035*numPins,
    public lastNUsedPinsMargin = 10,

    public updateEveryNPins = 20,
  ) {}
}



const CONFIG = new Configuration()
export default CONFIG