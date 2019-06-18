document.addEventListener("DOMContentLoaded", function(event) {

  let cns = document.getElementById('canvas')
  cns.width = window.innerWidth
  cns.height = window.innerHeight

  let ctx = cns.getContext('2d')
   function Anim() {
     this.arrayPoints = []
   }
   Anim.prototype.pointsGenerate = function() {
     let count = 0
     for(let i=1; i<10; i++) {
      for(let j=1; j<10; j++) {
        this.arrayPoints[count] = {
          x:(cns.width / 10) * i,
          y:(cns.height / 10) * j
        }
        count++
      }
     }
   }
   Anim.prototype.drow = function() {
     ctx.save()
     ctx.fillStyle = 'white'
     this.arrayPoints.forEach(function(elem, idx) {
      ctx.beginPath()
      ctx.arc(elem.x, elem.y, cns.width/800, 0, Math.PI*2)
      ctx.fill()
     })
     ctx.restore()
   }
   Anim.prototype.move = function() {
    this.arrayPoints.forEach(function(elem, idx) {
      elem.x += (Math.random() > 0.5) ? 1 : -1
      elem.y += (Math.random() > 0.5) ? 1 : -1
     })
   }
   Anim.prototype.check = function() {
     ctx.save()
     ctx.strokeStyle = 'white'
     ctx.globalAlpha = 0.35
     let factor = Math.pow(canvas.width / 10, 2)
     for(let idx = 0; idx < this.arrayPoints.length; idx++) {
      for(let i = idx; i < this.arrayPoints.length; i++) {
        let sum = Math.pow((this.arrayPoints[idx].x-this.arrayPoints[i].x),2) + Math.pow((this.arrayPoints[idx].y-this.arrayPoints[i].y),2)
        if(sum < factor) {
          if(sum < Math.pow(canvas.width / 15, 2)) {
            ctx.save()
            ctx.strokeStyle = 'blue'
            ctx.globalAlpha = 0.75
            ctx.beginPath()
            ctx.moveTo(this.arrayPoints[idx].x, this.arrayPoints[idx].y)
            ctx.lineTo(this.arrayPoints[i].x, this.arrayPoints[i].y)
            ctx.stroke()
            ctx.restore()
          }
          ctx.beginPath()
          ctx.moveTo(this.arrayPoints[idx].x, this.arrayPoints[idx].y)
          ctx.lineTo(this.arrayPoints[i].x, this.arrayPoints[i].y)
          ctx.stroke()
        }
      }
     }
     ctx.restore()
   }
   Anim.prototype.connection = function(e) {
    ctx.save()
    ctx.strokeStyle = 'yellow'
    let x = e.offsetX || e.pageX
    let y = e.offsetY || e.pageY
    this.arrayPoints.forEach(function(elem, idx) {
      if(Math.pow((elem.x-x),2) + Math.pow((elem.y-y),2) < Math.pow(canvas.width / 15, 2)) {
        ctx.beginPath()
        ctx.moveTo(elem.x, elem.y)
        ctx.lineTo(x, y)
        ctx.stroke()
      }
    })
    ctx.restore()
  }

   let animation = new Anim()
   animation.pointsGenerate()
   animation.drow()
   setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    animation.move()
    animation.drow()
    animation.check()
   },15)

   canvas.onmousemove = function(e) {
    animation.connection(e)
   }

});