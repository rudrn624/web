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
        let slideballX = $("#slide").width()/2;
        let slideballY = $("#slide").offset().top + $("#slide").height()/2;
        let slideBall = new Slideball(new point(slideballX,slideballY));
        let changeslide = false;
        let ReadySection = false;
        let ballColor = "#f9e6d4";
        let backgroundColor = ["#f9e6d4" ,"#ebfbe0","#efefef","#ffebe7"];
        let TColor = ["#fbac65","#aeed82","#1e1e1e","#ffafa0"];
        let Interval ;
        let Flag = true;
        let leftSrc = "back.jpg";
        let rightSrc = "lion.jpg";



        $(".mainList:first-child").addClass("active");
        $(".smallList:first-child").addClass("active");


        // console.log($(".singleloop").offset().left);
        let leftCircle = new Circle(new point($(".singleloop").offset().left, $(".singleloop").offset().top),leftSrc);
        let rightCircle = new Circle(new point($(".singleloop").offset().left + $(".singleloop").width(), $(".singleloop").offset().top + $(".singleloop").height()),rightSrc);

        $(window).scroll(function(){
            scrollTop = $(window).scrollTop();


            if(($("#slide").offset().top + $("#slide").height()) < (scrollTop +300)){
                ReadySection = false;
            }else if($("#slide").offset().top < (scrollTop +500)){
                ReadySection = true;
            }else{
                ReadySection = false;
            }
            // console.log(ReadySection);
            // let slideTop = $("#slide").offset().top + $("#slide").height();
            if(ReadySection){
                if(scrollTop < $("#slide").offset().top + 100 && mouseDown){
                    for(let i = 0; i < balls.length; i++){
                        balls[i].updateRadius(2,(i+1));
                        // slideBall.update(2);
                        globalAlpha += 0.007;
                    }
                }else if(scrollTop > $("#slide").offset().top - 100 && !mouseDown){
                    for(let i = 0; i < balls.length; i++){
                        balls[i].updateRadius(2,(i+1));
                        // slideBall.update(2);
                        globalAlpha += 0.007;
                    }
                }else{
                    for(let i = 0; i < balls.length; i++){
                        balls[i].updateRadius(-2,(i+1));
                        // slideBall.update(-2);
                        globalAlpha -= 0.02;
                    }
                }
            }
            if(globalAlpha > 1){
                globalAlpha = 1;
            }else if(globalAlpha < 0){
                globalAlpha = 0;
            }
            slideBall.Position.pY = ($("#slide").offset().top + $("#slide").height()/2) - scrollTop;
            
           
            leftCircle.Position.pY = $(".singleloop").offset().top - scrollTop;
            rightCircle.Position.pY = $(".singleloop").offset().top + $(".singleloop").height() - scrollTop;
            

            $(".double-loop span, .singleloop span").each(function(){
                left = $(this).css('left').replace('px', '');
                if(mouseDown){
                    $(this).css({left : parseInt(left) + 5});
                }else{
                    $(this).css({left : parseInt(left) - 5});
                }
            });
            if(ReadySection){
                if(Flag){
                    $(".bargauge").stop(true,true);
                    $(".bargauge").css({width:0});
                    $(".bargauge").animate({width : 100+"%"}, 10000);

                    Interval = setInterval(imageChange,10000);
                }
                Flag = false;
            }else{
                Flag = true;
                clearInterval(Interval);
            }
            let offset1 = (scrollTop - $(".listwrap").offset().top) * 0.2;
            let offset2 = (scrollTop - $(".smallImg").offset().top) * 0.2;
            $(".listwrap").css({transform : "translateY(" + -offset1 + "px)"});
            
            $(".smallImg").css({transform : "translateY(" + +offset2 + "px)"});
        
        
            $("section").each(function(){
                console.log($(this).offset().top);
                if($(this).offset().top-5 < scrollTop){
                    $(".header-title").text($(this).find(".js-title").text());
                }
            });

        });
        $(window).resize(function(){
            doubleLoop = $(".double-loop span").outerWidth();
        });
        $(window).load(function(){
            $("#intro").addClass("active");
            $("#header").addClass("active");
        });
        let word = $(".word");

        let title = $(".js-title").eq(0).text();
        $(".header-title").text(title);

        word.each(function(i){
            setInterval(function(){
                word.eq(i).addClass("show");
            },i*100);
        });
        setTimeout(function(){
            word.each(function(i){
                
                // clearInterval(i+1);
            });
        },1000);
        // let Point = new point(0 ,1);
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
                
                // console.log(src[0]);
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
            this.draw = function(ctx){
               
               let x = this.movePosition.pX;
               let y = this.movePosition.pY;
               let radius = this.radius;

               let startAngle = 0;
               let endAngle = Math.PI + Math.PI;

                var img = new Image();
                
                img.src="assets/img/blurhan.jpg";
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
                ctx.drawImage(img, x-(img.width/2)*5, y-(img.height/2)*5 , img.width*5, img.height*5);
               
                
                
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
                }else if(this.radius >= 300){
                    this.radius = 300;
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
        function Slideball(point){
            this.Position = point;
            this.radius = 50;
            this.dt = 1;
            this.rotate = 0;
            this.draw = function(ctx){
               
               let x = this.Position.pX;
               let y = this.Position.pY;

               let radius = this.radius;

               let startAngle = 0;
               let endAngle = Math.PI + Math.PI;

                var img = new Image();
                img.src="assets/img/"+src;

                ctx.beginPath();

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(0);
                ctx.translate(-x, -y);
                
                ctx.arc(x, y, radius, startAngle, endAngle, true);
                
                ctx.fillStyle = ballColor;
                ctx.fill();
                ctx.clip();
                ctx.globalAlpha = globalAlpha;
                ctx.drawImage(img, x-(img.width/2), y-(img.height/2));
               
                ctx.closePath();
                ctx.restore();
           }
           this.update = function(radius){
                this.radius += radius;
                if(this.radius >= 330){
                    this.radius = 330;
                }else{
                    if(this.radius <= 0){
                        this.radius = 0;
                        
                    }
                }   
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
                slideBall.draw(ctx);
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
                            if(i%2){
                                relativePoint[i].currentMove = new point(relativePoint[i].currentPosition.pX + (movemouseX*movespeed) ,relativePoint[i].currentPosition.pY + (movemouseY*movespeed) ) ;
                            }else{
                                relativePoint[i].currentMove = new point(relativePoint[i].currentPosition.pX - (movemouseX*movespeed) ,relativePoint[i].currentPosition.pY - (movemouseY*movespeed) ) ;
                            }
                        if(ReadySection){
                            if(changeslide){
                                slideBall.update(-2);
                                globalAlpha = 1;
                            }else{
                                slideBall.update(2);
                            }
                        }
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
            
            if(mousehover){
                ImageBall.movePosition = new point(mouseX, mouseY);
                for(let i = 0 ; i < balls.length; i++){
                    balls[i].position = new point(mouseX, mouseY);
                    
                }
            }

            
        });
        $("u, .intro_link, .bugar, .logo, .social-links a, .listwrap a").hover(function(){
         
           u = $(this).is("u");
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
        //슬라이드 부분
        let doubleLoop;
        $(document).ready(function(){
           
        });
        setTimeout(function(){
            doubleLoop = $(".double-loop span").outerWidth();
        },1000);
         
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
        function loop(){
            $(".double-loop span, .singleloop span").each(function(i){
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
        setInterval(doubleLoops,5000);
        let doubleT = true;
        function doubleLoops(){
            let loopHeight = $(".double-loop").height();
            if(doubleT){
                $(".double-loop").animate({top : -loopHeight},500);
                doubleT = false;
            }else{
                $(".double-loop").animate({top : 0},500);
                doubleT = true;
            }
        };
        imgindex = 1;
        
        // $(".bargauge").animate({width : 100+"%"},10000,function(){
        //     $(".bargauge").css({width : 0});
        // });
        // if(ReadySection){
        //     imageChange();

        // }
        
        // imageChange();
        
        let currentnum = 1;
        let currentImg = 1;
        function imageChange(){
            if(ReadySection){
                changeslide = true;

                $(".bargauge").stop(true,true);
                $(".bargauge").css({width:0});
                $(".bargauge").animate({width : 100+"%"}, 10000);
                
                src = imgs[currentnum];
               
                $(".currentindex").text("0"+(currentnum+1));
                
                currentnum += 1;
                if(currentnum >= 5){
                    currentnum = 0;
                }

                $("html, body").animate({scrollTop: $("#slide").offset().top},600,"easeInOutExpo");
                

                currentImg  = imgindex % 4;

                gotoslide(currentImg);

                imgindex = currentImg + 1;

             
                scrollTop = $(window).scrollTop();
                for(let i = 0; i < balls.length; i++){
                    balls[i].dt = 0;
                    balls[i].position = new point($(window).width()/2 ,$(window).height()/2)
                    balls[i].currentPosition = balls[i].movePosition;
                    time = 0; 
                }
                
            }
        }
        $("a").hover(function(){
            $(this).parent().siblings().find("a").removeClass("active");
            $(this).addClass("active");

            $(".smallImg .smallList").eq($(this).parent().index()).siblings().removeClass("active");
            $(".smallImg .smallList").eq($(this).parent().index()).addClass("active");
            $(".mainImg .mainList").eq($(this).parent().index()).siblings().removeClass("active");
            $(".mainImg .mainList").eq($(this).parent().index()).addClass("active");
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
                $(".intro_link").css({backgroundImage:  "linear-gradient("+TColor[index]+","+TColor[index]+")"});
                $('.pushList li').attr("style","--color:"+TColor[index]);
                $('.bengol').attr("style","--borderColor:"+TColor[index]);
                $(".smallImg").css({background : backgroundColor[index]});
        }

        $(".prev").click(function(e){
            e.preventDefault();
            // currentImg -= 1;
            // if(currentImg < 0){
            //     currentImg = 3;
            // }
            // console.log(currentImg);
            // gotoslide(currentImg);
            // imageChange();
            imageChange();
            clearInterval(Interval);
            Interval = setInterval(imageChange,10000);
            
               
        });
        $(".next").click(function(e){
            e.preventDefault();
            // e.preventDefault();
            // currentImg += 1;
            // if(currentImg > 3){
            //     currentImg = 0;
            // }
            // console.log(currentImg);
            // gotoslide(currentImg);
            imageChange();
            clearInterval(Interval);
            Interval = setInterval(imageChange,10000);
        });

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
            $(".modalBack").css({left : mouseX, top:mouseY + scrollTop});
            // $(".modal").
        }
        $(".TitleText").hover(function(){
            $(this).siblings().css({opacity : 0.5});
        },function(){
            $(".TitleText").css({opacity : ""});
        });