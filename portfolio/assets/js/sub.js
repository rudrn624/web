
        let change = false;
        let mouseDown = true;
        let mouseX =0 , mouseY=0;
        let movemouseX=0, movemouseY=0;
        let u = false;
        let mousehover = false;
        let mouseMove = false;
        let balls = [];
        let relativePoint = [];
        let interval;
        let ImageBall = new Imageball(new point(0,0));
        let canvas = document.getElementById("canvas");
        let left ; 
        let spanSpeed = 0;
        let src = "cover-kalios-bottom.jpg";
        let imgs = ["jnollet-cover-bottom.jpg","cover-kalios-bottom.jpg","jnollet-cover-bottom.jpg","cover-kalios-bottom.jpg","jnollet-cover-bottom.jpg"];
        let globalAlpha = 0;
        let scrollTop = $(window).scrollTop();;
        // let slideballX = $("#slide").width()/2;
        // let slideballY = $("#slide").offset().top + $("#slide").height()/2;
        // let slideBall = new Slideball(new point(slideballX,slideballY));
        let changeslide = false;
        let ReadySection = false;
        let ballColor = "#DDF5F8";
        let backgroundColor = ["#DDF5F8" ,"#ebfbe0","#efefef","#ffebe7"];
        let TColor = ["#7BDBEC","#aeed82","#1e1e1e","#ffafa0"];
        let Interval ;
        let Flag = true;
        let leftSrc = "back.jpg";
        let rightSrc = "lion.jpg";
        

        gotoslide(0);


        $(".mainList:first-child").addClass("active");
        $(".smallList:first-child").addClass("active");
            
        let word = $(".word");

        let leftCircle = new Circle(new point($(".singleloop").eq(1).offset().left, $(".singleloop:last-child").eq(1).offset().top),leftSrc);
        let rightCircle = new Circle(new point($(".singleloop").eq(1).offset().left + $(".singleloop:last-child").width(), $(".singleloop:last-child").eq(1).offset().top + $(".singleloop:last-child").height()),rightSrc);

        $(window).scroll(function(){
            scrollTop = $(window).scrollTop();
            
            $("section").each(function(){
                if($(this).offset().top < scrollTop){
                    $(".header-title").text($(this).find(".js-title").text());
                }
            });

            let offset1 = (scrollTop - $(".u-crop:nth-of-type(1)").offset().top) * 0.4;
            let offset2 = (scrollTop - $(".u-crop:nth-of-type(2)").offset().top) * 0.2;
            let offset3 = (scrollTop - $(".u-crop:nth-of-type(3)").offset().top) * 0.5;
            $(".u-crop:nth-of-type(1)").css({transform : "translateY(" + -offset1 + "px)"});
            $(".u-crop:nth-of-type(2)").css({transform : "translateY(" + -offset2 + "px)"});
            $(".u-crop:nth-of-type(3)").css({transform : "translateY(" + -offset3 + "px)"});


            leftCircle.Position.pY = $(".singleloop").eq(1).offset().top - scrollTop;
            rightCircle.Position.pY = $(".singleloop").eq(1).offset().top + $(".singleloop").height() - scrollTop;
            
            $(".singleloop span").each(function(){
                left = $(this).css('left').replace('px', '');
                if(mouseDown){
                    $(this).css({left : parseInt(left) + 5});
                }else{
                    $(this).css({left : parseInt(left) - 5});
                }
            });
            $("section").each(function(){
                
                if($(this).offset().top < scrollTop + 800){
                    $(this).addClass("active");
                }
            });

            if($("#intro").is(".active")){
                word.each(function(i){
                    setInterval(function(){
                        word.eq(i).addClass("show");
                    },i*100);
                });
            }
        });
        $(window).resize(function(){
            doubleLoop = $(".double-loop span").outerWidth();
        });
        $(window).load(function(){
            // $("#intro").addClass("active");
            $("#header").addClass("active");
        });

        let title = $(".js-title").eq(0).text();
        $(".header-title").text(title);


        function point(pX,pY){
            this.pX = pX;
            this.pY = pY;
        }
        function relativepoint(point){
            this.position = point;
            this.currentPosition = point;
            this.currentMove = point;
            this.movePosition = point;
            this.dt = 0;
            this.draw = function(ctx){
                ctx.beginPath();
                
                startAngle = 0;
                endAngle = Math.PI + Math.PI;

                ctx.arc(this.movePosition.pX, this.movePosition.pY, 0, startAngle, endAngle, true);
                ctx.stroke();

               

                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        }
       
        function ball(point , radius){
            this.position = point;
            this.currentPosition = point;
            this.movePosition = point; 
            this.radius = radius;
            this.dt = 1;
            this.rotate = 0;
            this.draw = function(ctx){
               
               
                ctx.save();

                ctx.beginPath();
                
                startAngle = 0;
                endAngle = Math.PI + Math.PI;

                var img = new Image();
                
                img.src="assets/img/"+src;
                
                ctx.save();
                
                ctx.translate(this.movePosition.pX, this.movePosition.pY);
                ctx.rotate(this.rotate);
                ctx.translate(-this.movePosition.pX, -this.movePosition.pY);
                
                ctx.arc(this.movePosition.pX, this.movePosition.pY, this.radius, startAngle, endAngle, true);
                
                ctx.restore();
                
                
                ctx.fillStyle = ballColor;
                ctx.fill();
                
                ctx.clip();
                ctx.globalAlpha = globalAlpha;
                ctx.drawImage(img,0,0);
                
                ctx.closePath();
                ctx.restore();
               
            }
            this.update = function(timer , i){
                
                if(this.rotate > 360){
                    this.rotate = 0;
                }else{
                    this.rotate++;
                }
                if(this.dt < 1){
                    
                    this.dt = this.dt + (0.001  * Math.pow(2, timer));
                    if(changeslide){
                        this.radius -= 1; 
                        if(this.radius < 1){
                            this.radius = 0;
                        }
                    }else{
                        this.radius += 1;
                        if(this.radius > i * 30){
                            this.radius = i * 30;
                        }
                    }
                }else{
                    
                    if(changeslide){
                        for(let i = 0; i < balls.length; i++){
                            balls[i].position = relativePoint[i].movePosition;
                            balls[i].currentPosition = balls[i].movePosition;
                            balls[i].dt = 0;
                            time = 0;
                        }
                        changeslide = false;
                    }else{
                        this.dt = 1;
                    }
                }
                this.movePosition = lerp(this.currentPosition, this.position, this.dt);
                
            }
            this.updateRadius = function(radius , i){
                this.radius += radius; 
                if(this.radius >= i * 30){
                    this.radius = i * 30;
                }else{
                    if(this.radius < i * 15){
                        this.radius = i * 15;
                    }
                }   
            }

        }
        function Imageball(point){
            this.movePosition = point;
            this.radius = 0;
            this.dt = 1;
            this.rotate = 0;
            this.src = "blurhan.jpg";
            this.maxRadius = 0;
            this.scale = 1;
            this.draw = function(ctx){
               
               let x = this.movePosition.pX;
               let y = this.movePosition.pY;
               let radius = this.radius;

               let startAngle = 0;
               let endAngle = Math.PI + Math.PI;

                var img = new Image();
                
                img.src="assets/img/"+ this.src;
                // img.width
                
              
               
                ctx.beginPath();

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(0);
                ctx.translate(-x, -y);
                
                ctx.arc(x, y, radius, startAngle, endAngle, true);
                
                ctx.fillStyle = ballColor;
                ctx.fill();
                ctx.clip();
                ctx.drawImage(img, x-(img.width/2)*this.scale, y-(img.height/2)*this.scale, img.width*this.scale, img.height*this.scale);
               
                
                
                ctx.closePath();
                ctx.restore();
           }
           this.update = function(radius, dt){
               
               if(mousehover){
                   if(dt >= 1){
                    this.radius += (0.05  * Math.pow(2, radius));
                    }
               }else{
                    this.radius -= (0.9  * Math.pow(2, radius));
               }

                if(this.radius <= 0 ){
                    this.radius = 0
                }else if(this.radius >= this.maxRadius){
                    this.radius = this.maxRadius;
                }
                    
           }
        }
        function Circle(point, src){
            this.Position = point;
            this.radius = 300;
            this.draw = function(ctx){
               
               let x = this.Position.pX;
               let y = this.Position.pY;
               let radius = this.radius;

               let startAngle = 0;
               let endAngle = Math.PI + Math.PI;

                var img = new Image();
                
                img.src="assets/img/" + src;
                // img.width
                
              
               
                ctx.beginPath();

                ctx.save();
        
                
                ctx.arc(x, y, radius, startAngle, endAngle, true);
                
                ctx.fillStyle = ballColor;
                ctx.fill();
                ctx.clip();
                ctx.drawImage(img, x -img.width/2,0);
               
            
                ctx.closePath();
                ctx.restore();
           }
           this.update = function(radius){
           }
        }
     

        for(let i = 0; i < 5; i++){
            relativePoint[i] = new relativepoint(random());
            relativePoint[i].position = random();
            balls[i] = new ball(relativePoint[i].movePosition, (i+1) * 15);
        }
        function draw() {
            
            if (canvas.getContext) {
                
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                let ctx = canvas.getContext("2d");
                // ctx.fillStyle = '#f9e6d4';
                // ctx.fillRect(0,0,canvas.width, canvas.height);
                // redraw();
               
                for(let i = 0; i < relativePoint.length; i++){
                    relativePoint[i].draw(ctx);
                    balls[i].draw(ctx);
                }
                
                ImageBall.draw(ctx);
                // slideBall.draw(ctx);
                leftCircle.draw(ctx);
                rightCircle.draw(ctx);

                ctx.beginPath();
                // var img = new Image();
                
                // img.src="assets/img/han.jpg";
                // ctx.drawImage(img, 500,500)
                ctx.restore();
            }
        }
        function random(){
            let width;
            let height;
            let randomSel = Math.round(Math.random()*1);

            if(randomSel){
                let zeroMax = Math.round(Math.random()*1);
                if(zeroMax){
                    width = $(window).width() + 150;
                }else{
                    width = -150;
                }
                height = parseInt(Math.random()*$(window).height());
            }else{
                let zeroMax = Math.round(Math.random()*1);
                if(zeroMax){
                    height = $(window).height() + 150;
                }else{
                    height = -150;
                }
                width = parseInt(Math.random()*$(window).width());
            }
            return new point(width,height);
        }
        function lerp(a, b, r) {
            let returnPoint = new point();
            returnPoint.pX = b.pX - a.pX;
            returnPoint.pY = b.pY - a.pY;
            returnPoint.pX = returnPoint.pX * r;
            returnPoint.pY = returnPoint.pY * r;

            returnPoint.pX = a.pX + returnPoint.pX;
            returnPoint.pY = a.pY + returnPoint.pY;
            return returnPoint;
        };
        let speed = 0.001;
        let movespeed = 0.3;
        let time = 0;
        function update(){
            time += 0.14;
                for(let i = 0; i < relativePoint.length; i++){
                    let position = lerp(relativePoint[i].currentMove, relativePoint[i].position,relativePoint[i].dt);
                    
                    
                        if(relativePoint[i].dt >= 1){
                                relativePoint[i].dt = 0;
                                relativePoint[i].currentPosition = relativePoint[i].movePosition;
                                relativePoint[i].position = random();
                                
                                speed = 0.001;
                        }else{
                            relativePoint[i].dt = relativePoint[i].dt + speed;
                        }
                            relativePoint[i].movePosition=position;
                            // if(i%2){
                            //     relativePoint[i].currentMove = new point(relativePoint[i].currentPosition.pX + (movemouseX*movespeed) ,relativePoint[i].currentPosition.pY + (movemouseY*movespeed) ) ;
                            // }else{
                            //     relativePoint[i].currentMove = new point(relativePoint[i].currentPosition.pX - (movemouseX*movespeed) ,relativePoint[i].currentPosition.pY - (movemouseY*movespeed) ) ;
                            // }
                        // if(ReadySection){
                        //     if(changeslide){
                        //         slideBall.update(-2);
                        //         globalAlpha = 1;
                        //     }else{
                        //         slideBall.update(2);
                        //     }
                        // }
                    if(!mousehover && !changeslide){
                        balls[i].position = relativePoint[i].movePosition;
                        
                        balls[i].update(time , i);
                        
                        ImageBall.update(time);
                        
                    }else{
                        
                        balls[i].update(time, i);
                        if(u){
                            ImageBall.update(time , balls[i].dt);
                        }else{
                            ImageBall.radius = 0;
                        }
                    }
                }
            draw();
            requestAnimationFrame(update);
        }
        update();

       
       
        $(window).mousemove(function(e){
            mouseMove = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            movemouseX = mouseX - ($(window).width()/2);
            movemouseY = mouseY - ($(window).height()/2);
            
            // if(mousehover){
            //     ImageBall.movePosition = new point(mouseX, mouseY);
            //     for(let i = 0 ; i < balls.length; i++){
            //         balls[i].position = new point(mouseX, mouseY);
                    
            //     }
            // }

            
        });
        $("u, .intro_link, .bugar, .logo, .social-links a, .back_link, .listwrap a, .animationSlide").hover(function(){
         
           u = $(this).is("u");
           if($(this).is(".animated")){
                ImageBall.src = "blurhan.jpg";
                ImageBall.maxRadius = 300;
                ImageBall.scale = 5;
           }else{
                ImageBall.src = "programing.png";
                ImageBall.maxRadius = 200;
                ImageBall.scale = 1;
           }
           mouseHover();
        },function(){
           mouseUnhover();
           u = false;
        });

        function mouseHover(){
            mousehover = true;
            // speed = 0.001;
            for(let i = 0; i < balls.length; i++){
                balls[i].dt = 0;
                balls[i].currentPosition = balls[i].movePosition;
                
                time = 0; 
            }
            if(mousehover){
                ImageBall.movePosition = new point(mouseX, mouseY);
                for(let i = 0 ; i < balls.length; i++){
                    balls[i].position = new point(mouseX, mouseY);
                    
                }
            }
        }
        function mouseUnhover(){
            mousehover = false;
            for(let i = 0; i < balls.length; i++){
                balls[i].position = relativePoint[i].movePosition;
                balls[i].currentPosition = balls[i].movePosition;
                balls[i].dt = 0;
                time = 0;
            }
        }
      
         
        //휠 이벤트
        $(window).on('mousewheel',function(e){ 
              var wheel = e.originalEvent.wheelDelta; 
            

                // if($("#slide").offset().top + $("#slide").height())
              if(wheel>0){ 
                mouseDown = false;
              } else { 
                mouseDown = true;

              }
        });
        
        function gotoslide(index){
            $(".modal .TitleText").css({color : TColor[index]});
            $(".modalBack").css({background : backgroundColor[index]});
            $(".bargauge").css({background : TColor[index]});
            $(".bar").css({background : backgroundColor[index]});
            ballColor = backgroundColor[index];
            $("body").css({background : backgroundColor[index]});
            $(".double-loop span").css({color : TColor[index]});
            $(".singleloop span").css({color : TColor[index]});
            $(".intro_link,.back_link").css({backgroundImage:  "linear-gradient("+TColor[index]+","+TColor[index]+")"});
            $('.pushList li').attr("style","--color:"+TColor[index]);
            $('.bengol').attr("style","--borderColor:"+TColor[index]);
            $(".smallImg").css({background : backgroundColor[index]});
        }   
    

        // $(".bugar").click(function(){
        //     $(".bugar").toggleClass("active");
        //     $(".bugar_close").toggleClass("active");
        // });

        let mouseDrag = false;
        let mouseClickDown;
        $(".animationSlide").mousedown(function(e){
            
            mouseDrag = true;
            mouseClickDown = e.pageX;


            $(".prob:nth-of-type(2n)").css({transform: "translateY(0)"});
        });
        $(".animationSlide").mouseup(function(){
            mouseDrag = false;
            PositionX = (PositionX -(mouseClickDown - mouseX));
            
            $(".prob:nth-of-type(2n)").css({transform: "translateY(2rem)"});
        });
        let PositionX = 0;
        $(window).mousemove(function(e){
            
            mouseX = e.clientX;
            mouseY = e.clientY;

            movemouseX = mouseX - ($(window).width()/2);
            movemouseY = mouseY - ($(window).height()/2);
            
            if(mousehover){
                ImageBall.movePosition = new point(mouseX, mouseY);
                for(let i = 0 ; i < balls.length; i++){
                    balls[i].position = new point(mouseX, mouseY);
                    
                }
            }
            if(mouseDrag){
                if(PositionX -(mouseClickDown - mouseX) > 0 ){
                    $(".animationSlide .container").css({transform: "translateX("+ 0 +"px)"});
                }else if(PositionX -(mouseClickDown - mouseX) < -1356 ){
                    $(".animationSlide .container").css({transform: "translateX("+ -1356 +"px)"});
                }else{
                    $(".animationSlide .container").css({transform: "translateX("+ (PositionX -(mouseClickDown - mouseX))+"px)"});
                }
                
            }
        });


        function loop(){
            $(".singleloop span").each(function(i){
                left = $(this).css('left').replace('px', '');
                if(!mouseDown){
                    if(left <= -$(this).outerWidth()*($(this).index()+1)){
                        $(this).css({"left":($(this).outerWidth()*3) - $(this).outerWidth()*($(this).index()+1) });
                       
                    }else{
                        $(this).css({"left" : parseInt(left) - 1});
                    }
                }else{
                    if(left >= ($(this).outerWidth()*3) - $(this).outerWidth()*($(this).index()+1)){
                        $(this).css({"left": -($(this).outerWidth() * ($(this).index() + 1))});
                    }else{
                        $(this).css({"left" : parseInt(left) + 1});
                    }
                }
            });
            requestAnimationFrame(loop);
        }
        
        setTimeout(loop,400);


        $(".bugar").click(function(){
            $(".bugar").toggleClass("active");
            $(".header-title").fadeToggle();
            $(".bugar_close").toggleClass("active");
            modalAni();
            $("body").toggleClass("overflow");
            $(".modalBack").toggleClass("active");
            $(".modal").toggleClass("active");
        });
        
        function modalAni(){
            // console.log(mouseY);
            // console.log(scrollTop);
            $(".modalBack").css({left : mouseX, top: mouseY + scrollTop});
            // $(".modal").
        }
        $(".TitleText").hover(function(){
            $(this).siblings().css({opacity : 0.5});
        },function(){
            $(".TitleText").css({opacity : ""});
        });