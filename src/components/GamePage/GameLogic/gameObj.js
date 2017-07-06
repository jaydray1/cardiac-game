// connect component to store WITHOUT REACT REDUX
// very important to maintain game performance
// otherwise react will slow down the game
import store from '../../../store/store'
import { setContext } from '../../../store/ducks/gameReducer'

// game logic files. if possible should move all actions to gameObject.js
import Player from './player'
import BulletPool from './bulletPool'
import Bullet from './bullet'
import EnemyPool from './enemyPool'
import Virus from './virus'
import Bacteria from './bacteria'
import Sugar from './sugar'
import Heart from './heart'
import { images } from './mediaRepos'
import CollisionDetector from './collisionDetection'
import { startListening, stopListening } from './keyInput'

let gameState = store.getState().gameReducer

store.subscribe(function() {
    gameState = store.getState().gameReducer
})

export default class Game {
    constructor() {
        this.context = gameState.context
        this.player = new Player(gameState.context) // maxBullets, context
        this.bulletPool = new BulletPool(gameState.context)
        this.virusPool = new EnemyPool(this.context, 100, 3, 10)
        this.bacteriaPool = new EnemyPool(gameState.context, 100, 5, 20)
        this.sugar = new Sugar()
        this.heart = new Heart(gameState.context) 
        this.collision = new CollisionDetector()

        this.virusPool.init(Virus, images.virus)
        this.bacteriaPool.init(Bacteria, images.bacteria)

        this.draw = this.draw.bind(this)
        this.update = this.update.bind(this)
        this.checkCollisions = this.checkCollisions.bind(this)

        startListening()
    }

    draw() {
        this.player.draw()
        this.bulletPool.draw()
        this.virusPool.draw()

        this.sugar.draw()

        this.heart.draw()
        this.bacteriaPool.draw()
    }

    update() {
        this.player.update()
        this.bulletPool.update()
        this.virusPool.update()

        this.sugar.update()

        this.heart.update()
        this.bacteriaPool.update()
    }

    checkCollisions() {
        this.collision.checkObjToArray(this.player, this.bacteriaPool.active, function(player,enemy) {
            enemy.isAlive = false
        })

        this.collision.checkObjToArray(this.player, this.virusPool.active, function(player,enemy) {
        })
        
        this.collision.checkArrayToArray(this.virusPool.active,this.bulletPool.active, function(virus,bullet) {
            virus.healthDown()
            bullet.isAlive = false
        })

        this.collision.checkArrayToArray(this.bacteriaPool.active,this.bulletPool.active, function(bacteria,bullet) {
            bacteria.healthDown()
            bullet.isAlive = false
        })

        this.collision.checkObjToArray(this.heart,this.bacteriaPool.active, function(heart,bacteria) {
            for(let i = 0; i < bacteria.health; i++) {
            bacteria.healthDown()
            }
            heart.healthDown()
        })

        this.collision.checkObjToArray(this.heart,this.bulletPool.active, function(heart, bullet) {
            bullet.isAlive = false
        })
    }

}

