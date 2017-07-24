/**  
* jQuery.TurnRound.js plugin  
*  
*  
*  
*  
*/  
  
;(function($, window, document, undefined) {
    var  isMoving = false; 
    var TurnRound = function (el,opts) {
        //assigning params
        this.$ = el;
        this.defaults = {
            'use': 'bg',
            'speed': 10,
            'row': 4,
            'col': 6
        }; 

        this.params = $.extend({}, this.defaults, opts);    
        this.row = this.params.row;
        this.col = this.params.col;
        this.speed = parseInt(100 / this.params.speed);
        this.use = this.params.use;
        this.picIdx = 0;

        this.currentX = 0;
        this.currentImageX = 0;
        this.currentImageY = 0;

        this.initPic();
        this.assignOperations();
    };

        TurnRound.prototype.initPic = function() {
            var bgSize = this.col * 100;
            if(this.use == 'bg' || this.use == 'background' || this.use == 'background-image'){
                this.$.css({
                    'background-size': bgSize + '%',
                    'background-position': '0 0',
                    'background-repeat': 'no-repeat',
                    'animation': 'none',
                    '-webkit-animation': 'none',
                    '-moz-animation': 'none'
                });
            }else if(this.use == 'img' || this.use == 'image'){
                this.$.css({
                  'position': 'absolute',
                  'clip': 'rect(0,100px,100px,0)'
                });
            }
        };

        TurnRound.prototype.assignOperations = function() {
            var that = this;
            this.$.mousedown(function(target) {
                isMoving = true;
                that.currentX=target.pageX - this.offsetLeft;
            });

            $(document).mouseup(function() {
                isMoving = false;
            });

            this.$.mousemove(function(target) {
                if (isMoving){
                    that.setImage(target.pageX - this.offsetLeft);
                }
            });

            this.$.on("touchstart", function(target) {
                target.preventDefault();
                var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
                isMoving = true;
                that.currentX=actualTouch.pageX - this.offsetLeft;
            });

            $(document).on("touchend", function() {
                isMoving = false;
            });

            this.$.on("touchmove", function(target) {
                target.preventDefault();
                var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
                if (isMoving == true) 
                    that.setImage(actualTouch.pageX - this.offsetLeft);
                else 
                    this.currentX = actualTouch.pageX - this.offsetLeft
            });
        };

        TurnRound.prototype.setImage = function (newX) {
            var xPos = 0,
                yPos = 0,
                xUnit = 100 / (this.col-1),
                yUnit = 100 / (this.row-1),
                height = 100;

                var diff = this.currentX - newX;
                var dir = (diff < 0) ? 'left' : 'right';

                var distance = Math.abs(this.currentX - newX);
                    if (dir == "left" && distance > this.speed ) {
                        this.currentX = newX;
                        //this.currentImage = --this.currentImage < 0 ? this.total-1 : this.currentImage;
                        this.currentImageX = --this.currentImageX;
                        if(this.currentImageX<0){
                            this.currentImageX = this.col-1;
                            this.currentImageY = --this.currentImageY < 0 ? this.row-1 : this.currentImageY;
                        }

                        showPosX = this.currentImageX * xUnit;
                        showPosY = this.currentImageY * yUnit;

                        if(this.use == 'bg' || this.use == 'background' || this.use == 'background-image'){
                            this.$.css({"background-position": showPosX + '% ' + showPosY +'%'});
                        }else if(this.use == 'img' || this.use == 'image'){
                            this.$.css({
                                "clip": 'rect('+ this.currentImage * height +'px,100px,' + (this.currentImage + 1) * height +'px,0)',
                                "margin-top": -1 * this.currentImage * height + 'px'
                            });

                        }

                    } else if (dir == "right" && distance > this.speed ) {
                        this.currentX = newX;
                        // this.currentImage = ++this.currentImage > this.total-1 ? 0 : this.currentImage;
                        this.currentImageX = ++this.currentImageX;
                        if(this.currentImageX > this.col-1){
                            this.currentImageX = 0;
                            this.currentImageY = ++this.currentImageY > this.row-1 ? 0 : this.currentImageY
                        }
                        showPosX = this.currentImageX * xUnit;
                        showPosY = this.currentImageY * yUnit;

                        if(this.use == 'bg' || this.use == 'background' || this.use == 'background-image'){                
                            this.$.css({"background-position": showPosX + '% ' + showPosY +'%'});
                        }else if(this.use == 'img' || this.use == 'image'){
                            this.$.css({
                                "clip": 'rect('+ this.currentImage * height +'px,100px,' + (this.currentImage + 1) * height +'px,0)',
                                "margin-top": -1 * this.currentImage * height + 'px'
                            });
                        }
                    }
        };


    $.fn.extend({  
      TurnRound: function(opts) {  
          return this.each(function() {  
              new TurnRound($(this), opts);  
          });  
        }  
    });

 
})(jQuery,window, document);