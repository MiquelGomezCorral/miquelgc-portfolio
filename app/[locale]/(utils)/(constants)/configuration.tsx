class Configuration {
  constructor(
    // =============== General ===============
    public version = "1.5.0",

    public debounceTime = 300, // ms
    public debounceTimeShort = 100, // ms
    public shakingTime = 300, // ms

    // =============== General ===============
    public numProjectsLanding = 5,
    public projectOtherTag = "other" as const,
    public projectTags = ["class", "other", "competition"] as const,
    public projectSearchScores = {
      titleSame: 10,
      titleOther: 5,
      keywordSame: 10,
      keywordOther: 5,
      techOrCategory: 3,
      descriptionSame: 2,
      descriptionOther: 1,
    } as const,
    public searchStopWords = [
      "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "in", "is", "it", "of", "on", "or", "the", "to", "with",
      "de", "del", "el", "en", "es", "la", "las", "los", "o", "para", "por", "que", "se", "un", "una", "y",
    ],
    public projectFuzzyWeight = 0.1,
    public projectFuzzyDistance = 1,

    // =============== String art ===============
    public cigaretteTime = 30, //Num s / 4 for some reason, 120/4 = 30
    public cigaretteMaxHeight = 230,

    public slowSmokeParticles = 3,
    public fastSmokeParticles = 10,

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

    public numPins   = 450,
    public maxLines  = 3500,
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
