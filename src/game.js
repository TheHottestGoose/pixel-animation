import Map from "./map.js"
import CollisionDetector from "./collision_detector.js"
import Camera from "./camera.js"
import TileRegistry from "./tile_registry.js"


/**
 * Diese Klasse enthält die globalen Variablen für das Spiel,
 * sowie das GameLoop, welches das Spiel zeichnen soll.
 */
export default class Game {

  static map = null;
  static player = null;
  static running = false;

  static allApples = false

  constructor() {
    this.tileSize = 32
    this.canvas = document.querySelector("#canvas")
    this.canvas.width = 10 * this.tileSize
    this.canvas.height = 15 * this.tileSize
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false

    Game.loadMap("maps/map-01.txt")

    this.camera = new Camera(this)

    Game.running = false
    window.requestAnimationFrame(this.gameLoop.bind(this))
  }

  /**
   * Startet das Spiel.
   * 
   * Das Spiel wird gestartet indem die Animationsschleife
   * des Spiels aufgerufen wird.
   */
  static start() {
    Game.running = true
  }

  /**
   * Pausiert das Spiel.
   * 
   * Die Animationsschleife des Spiels wird unterbrochen,
   * dadurch wird das Spiel pausiert.
   * 
   * Um das Spiel weiterlaufen zu lassen, muss die Methode 
   * `start()` aufgerufen werden.
   */
  static pause() {
    Game.running = false
  }

  static loadMap(mapfile) {
      TileRegistry.clear()
      CollisionDetector.clear()
      Game.player = null
      Game.map = new Map(mapfile)

  }

  static checkNewMap() {
    if (Game.allApples === true &&
      Game.allCupcake === true &&
      true) {
        Game.loadMap("maps/maparena.txt")
      }
  }

 static updateApfel(value) 
{ const elem = document.querySelector("#apfel-counter")
 let count = parseInt (elem.textContent)
 count = count + value
  elem.textContent = `${count} / 5`
  if (count >= 5) { Game.allApples = true}
  Game.checkNewMap()
 }

 static updateCupcake(value) 
 { const elem = document.querySelector("#cupcake-counter")
  let count = parseInt (elem.textContent)
  count = count + value
  elem.textContent = `${count} / 5`
  if (count >= 5) { Game.allCupcake = true}
  Game.checkNewMap()
  }

  static updateLachssushi(value) 
  { const elem = document.querySelector("#lachssushi-counter")
   let count = parseInt (elem.textContent)
    elem.textContent = `${count + value} / 2`
   }

   static updateGelbsushi(value) 
  { const elem = document.querySelector("#gelbsushi-counter")
   let count = parseInt (elem.textContent)
    elem.textContent = `${count + value} / 2`
   }

   static updatePilz(value) 
  { const elem = document.querySelector("#pilz-counter")
   let count = parseInt (elem.textContent)
    elem.textContent = `${count + value} / 5`
   }

   static updateRubin(value) 
   { const elem = document.querySelector("#rubin-counter")
    let count = parseInt (elem.textContent)
     elem.textContent = `${count + value} / 5`
    }

    static updateKristall(value) 
   { const elem = document.querySelector("#kristall-counter")
    let count = parseInt (elem.textContent)
     elem.textContent = `${count + value} / 5`
    }

    static updateBlume(value) 
    { const elem = document.querySelector("#blume-counter")
     let count = parseInt (elem.textContent)
      elem.textContent = `${count + value} / 10`
     }
  /**
   * Berechnet jeweils das nächste Frame für das Spiel.
   * Die Positionen der Spiel-Objekte werden neu berechnet,
   * die Kamera wird korrekt ausgerichtet und die 
   * Spiel-Objekte werden neu gezeichnet.
   */
  gameLoop() {
    
    this.camera.clearScreen()
    this.camera.nextFrame()

    TileRegistry.updateAllTiles()
    CollisionDetector.checkCollision("all")

    this.camera.centerObject(Game.player)

    TileRegistry.drawAllTiles(this.ctx)

    if (Game.running === true) {
      window.requestAnimationFrame(this.gameLoop.bind(this))
    }
  }
}