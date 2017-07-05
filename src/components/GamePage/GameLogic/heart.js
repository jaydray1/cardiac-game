import { images } from './mediaRepos'


export default class Heart {

    constructor(context) {
    this.context = context
    this.sprite = images.heart
    this.currentFrame = 0
    this.frameWidth = this.sprite.width / images.heart.frames
    this.frameSpeed = 4
    this.frameCount = 0
    this.width = this.frameWidth
    this.height = this.sprite.height
    this.imgCenterX = this.frameWidth / 2
    this.imgCenterY = this.sprite.height / 2
    this.x = context.canvas.width / 2 - this.imgCenterX
    this.y = context.canvas.height / 2 - this.imgCenterY


    this.maxHealth = 30
    this.health = this.maxHealth
    this.contrast = 0

    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
   	this.healthDown = this.healthDown.bind(this)
    }

    healthDown() {
        this.health--
        if (this.health < 1) {
            this.health = this.maxHealth
        }
        this.contrast = ~~(100 * (this.maxHealth - this.health) / this.maxHealth)
        console.log('heart', this.contrast);
    }

    update() {
        this.frameCount++

        // regulates frame speed
        if (this.frameCount >= this.frameSpeed) {
            this.currentFrame++
            if (this.currentFrame >= this.sprite.frames) {
                this.currentFrame = 0
            }
            this.frameCount = 0
        }
    }

    draw() {
        this.context.save()
        this.context.filter = "contrast(" + this.contrast + "%)"
        this.context.translate(this.x + this.imgCenterX, this.y + this.imgCenterY)
        this.context.drawImage(this.sprite,(this.frameWidth*this.currentFrame),0,this.frameWidth,this.sprite.height,-this.imgCenterX,-this.imgCenterY,this.frameWidth,this.sprite.height)
        this.context.restore()
    }

} 