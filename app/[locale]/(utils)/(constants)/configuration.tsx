class Configuration {
  constructor(
    // =============== General ===============
    public version = "1.1.1",

    public debounceTime = 300, // ms
    public shakingTime = 300, // ms

    // =============== String art ===============
    public defaultImages = [
      "/assets/projects/Noether.webp",
      "/assets/projects/Einstein.webp",
      "/assets/projects/Skull.webp",
      "/assets/projects/Leon.webp",
    ],
    public imageSize = 1900,
    public imageConstrast = 100, //100% is base
    public zoomSmoothFactor = 0.1,
    public maxZoom = 10,

    public numPins   = 350,
    public maxLines  = 3250,
    public lineWidth = 15,
    public firstPin  = 0, // //Math.floor(Math.random() * numPins)

    // Limits
    public pinLimits       = [2, 1000] as const, 
    public linesLimits     = [1, undefined] as const, 
    public lineWidthLimits = [1, 100] as const, 
    public constrastLimits = [1, undefined] as const, 

    public margin = 0,   // Margin with the canvas border  
    public radius = 300, // Circle radius

    public neighbourtMaring    = 5,
    public lastNUsedPinsMargin = 10,
    public updateEveryNPins    = 20,
  ) {}
}



const CONFIG = new Configuration()
export default CONFIG