class Configuration {
  constructor(
    // General
    public version = "1.0.0",
    
    // String art
    public defaultImage = "/assets/projects/Robot.webp",
    // public defualtImage = "/assets/projects/Einstein.webp",
    public imageSize = 1900,
    public lineWidth = 0.20,
    public numPins = 288,
    public maxLines = 3500,
    public firstNail = 0, // //Math.floor(Math.random() * numPins)

    public margin = 10, // Margin with the canvas border  
    public radius = 350, // Circle radius
    public neighbourtMaring = 15,//0.035*numPins,
  ) {}
}



const CONFIG = new Configuration()
export default CONFIG