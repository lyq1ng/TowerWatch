<template>
    <div id="videoPlayer" class="player" @fullscreenchange="handleFullscreenChange" @click="handleClick">
<!--        <vue3VideoPlay v-bind="options" @loadedmetadata="handleVideoLoad" />-->
      <video
          id="vPull"
          autoplay
          muted
          @loadedmetadata="handleVideoLoad"
          style="width:100%;height: 100%;object-fit:fill;margin: 0 auto;display: block;position: absolute;top: 50%;transform: translateY(-50%);">
      </video>
      <button class="btn1" id="Switch" @click="toggle">{{mode}}</button>
      <button class="btn1" id="Capture" @click="captureScreenshot">监控视频抓图</button>
    </div>
</template>
  
<script>
import "vue3-video-play/dist/style.css";
import { toRefs, watch, ref } from "vue";
import flv from "flv.js";

export default {
    components: {
        // vue3VideoPlay,
    },
    props: {
        msg: String,
    },
    setup(props) {
        let { msg: receive } = toRefs(props);
        var socket_data = ref("");

        // console.log(msg);
        watch(receive, watchHandle);

        function watchHandle() {
            // 处理监听逻辑
            // console.log("polygons: ", receive.value);
            socket_data.value = receive.value;
            // console.log(socket_data.value);
        }

        return {
            socket_data,
        }
    },
    data() {
        return {
            options: {
                width: "40%", //播放器高度
                height: "55%", //播放器高度
                color: "#409eff", //主题色
                title: "渔港", //视频名称
                //src: "http://220.161.87.62:8800/hls/1/index.m3u8", //视频源   http://192.168.21.21:1000/live?port=1935&app=live&stream=snapshot
                // src: "http://120.37.123.14:1000/hls/snapshot.m3u8",
                //src: "//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8",
                src: "http://30.10.9.46:10011/hls/snapshot2.m3u8",
                type: 'm3u8', //视频类型
                muted: false, //静音
                webFullScreen: false,
                speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
                autoPlay: true, //自动播放
                loop: false, //循环播放
                mirror: false, //镜像画面
                ligthOff: true, //关灯模式
                volume: 0.3, //默认音量大小
                control: false, //是否显示控制
                controlBtns: [
                    "audioTrack",
                    "quality",
                    "volume",
                    "fullScreen",
                ], //显示所有按钮,
            },
            coordsData: [], // to store the coords data from JSON
            mycanvas: document.createElement("canvas"),
            rect_canvas: document.createElement("canvas"),
            Sendcoordinate:false,
            isDrawing: false,
            message: "",
            mode:"监控定位模式",
        }
    },

    mounted() {

        this.VideoplayResize()
        window.addEventListener('resize', this.VideoplayResize);
        this.play('http://192.168.1.104:85/live/tvstream.flv');
    },
    methods: {
      play(urls) {
        let video = document.getElementById("vPull"); //定义播放路径
        if (flv.isSupported()) {
          this.player = flv.createPlayer(
              {
                type: "flv",
                isLive: false,
                url: urls,
                hasAudio: false,
                hasVideo: true
              },
              {
                enableWorker: false, //不启用分离线程
                enableStashBuffer: false, //关闭IO隐藏缓冲区
                isLive: true,
                lazyLoad: false,
              }
          );
        } else {
          console.log("不支持的格式");
          return;
        }
        this.player.attachMediaElement(video);
        this.player.load();
        this.player.play();
      },
      destruction() {
        //销毁对象
        if (this.player) {
          this.player.pause();
          this.player.destroy();
          this.player = null;
        }
      },
        sendMessage() {
            this.$emit("change", this.message);
        },
        async handleVideoLoad() {
            const canvas = await this.createCanvas();
            this.mycanvas = canvas;
            document.querySelector(".player").appendChild(this.mycanvas);

            const canvas_rect = await this.createCanvas2();
            document.querySelector(".player").appendChild(canvas_rect);
            
            const video = document.querySelector("video");

            video.addEventListener("timeupdate", () => {
                // console.log(this.socket_data);
                var contents;
                if (this.socket_data !== "") {
                    if (typeof this.socket_data === "string") {
                        contents = JSON.parse(this.socket_data);
                        if (contents.land !== undefined) {
                            // console.log(contents.land);
                            this.readJson_draw_Coords(contents.land);
                        } else if (contents.src !== undefined) {
                            this.options.src = contents.src;
                            // console.log(this.options.src);
                            video.src = this.options.src;
                            video.load();

                            this.socket_data="";
                        }
                    }
                }
            });

        },
        async createDiv() {
            const div = document.createElement('div');

            await this.Get_video_range().then(res => {
                div.style.width = res.w + 'px';
                div.style.height = res.h + 'px';
                div.style.top = res.y + 'px';
                div.style.left = res.x + 'px';
                div.style.position = 'absolute';
                div.style.zIndex = '3';
                div.style.pointerEvents = 'none';
                div.style.class = "canvas-container";
            });
            // console.log(div);
            return div;
        },

        async createCanvas2() {
            const canvas = this.rect_canvas;

            await this.Get_video_range().then(res => {
                canvas.width = res.w;
                canvas.height = res.h;
                canvas.style.top = res.y + "px";
                canvas.style.left = res.x + "px";
                canvas.style.position = "absolute";
                canvas.style.zIndex = "4";
                if (!this.Sendcoordinate) {
                    canvas.style.pointerEvents = "none"
                }
                // add mouse event listeners
                canvas.addEventListener('mousedown', this.onMouseDown);
                canvas.addEventListener('mouseup', this.onMouseUp);
                canvas.addEventListener('mousemove', this.onMouseMove);

            });
            // console.log(canvas);
            return canvas;
        },
        onMouseDown(event) {
            // 记录矩形框的左上角坐标
            // 将 isDrawing 标记设置为 true，表示开始绘制矩形
            if (this.Sendcoordinate) {
                console.log(event);
                this.startX = event.offsetX;
                this.startY = event.offsetY;

                this.isDrawing = true;
            }

        },
        onMouseUp(event) {
            if (this.isDrawing) {
                // 记录矩形框的右下角坐标
                this.endX = event.offsetX;
                this.endY = event.offsetY;
                const isFullScreen = document.fullscreenElement != null;

                // 绘制矩形框
                this.drawRectangle();

                // 将 isDrawing 标记设置为 false，表示结束绘制矩形
                this.isDrawing = false;

                var zoomtype = (this.endX - this.startX >= 100) ? 1 : 0
                var x = (this.endX + this.startX) >> 1
                var y = (this.endY + this.startY) >> 1
                var height = Math.abs(this.endY - this.startY)
                var width = Math.abs(this.endX - this.startX)

                const video = document.querySelector("video");

                const video_height = video.videoHeight;
                const video_width = video.videoWidth;
                const window_w = this.mycanvas.width;
                const window_h = this.mycanvas.height;

                height = height * video_height / window_h;
                width = width * video_width / window_w;
                x = x * video_width / window_w;
                y = y * video_height / window_h;

                console.log("x: " + x + " y: " + y + " height: " + height + " width: " + width);

                if (height != 0 && width != 0) {
                    let data = {
                        "packettype": 7,
                        "cameraid": 320000003,
                        "timestamp": Date.now(),
                        "x": x,
                        "y": y,
                        "zoomtype": zoomtype,
                        "width": width,
                        "height": height
                    }
                    this.message = JSON.stringify(data);
                    // console.log(this.message);
                    this.sendMessage();

                } else if (height === 0 && width === 0) {

                    var x_ = event.offsetX, y_ = event.offsetY;
                    var result = this.video_to_div(x_, y_);
                    var dot_x = result.x;
                    var dot_y = result.y;
                    if (isFullScreen) {
                        this.create_green_dot_fullscreen(dot_x, dot_y)
                    } else {
                        this.create_green_dot(dot_x, dot_y)
                    }
                }

            }
        },
        onMouseMove(event) {
            if (this.Sendcoordinate) {
                // 记录矩形框的右下角坐标
                this.endX = event.offsetX;
                this.endY = event.offsetY;

                // 绘制实时矩形框
                this.drawRectangle();
            }

        },
        drawRectangle() {
            const ctx = this.rect_canvas.getContext('2d');
            // 如果正在绘制矩形框，则绘制实时矩形框，否则清空画布
            if (this.isDrawing) {
                ctx.clearRect(0, 0, this.rect_canvas.width, this.rect_canvas.height);
                ctx.beginPath();
                ctx.strokeStyle = '#00ff00';
                ctx.rect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY);
                ctx.stroke();

            } else {
                ctx.clearRect(0, 0, this.rect_canvas.width, this.rect_canvas.height);
            }
        },

        handleClick(event) {
            // target is canvas
            if (this.Sendcoordinate && event.offsetX - this.startX <=5 && event.offsetY - this.startY<=5) {
                // const isFullScreen = document.fullscreenElement != null;
                // only click at canvas
                if (event.target === this.rect_canvas) {
                    var x = event.offsetX;
                    var y = event.offsetY; // for canvas 

                    const video = document.querySelector("video");
                    const width = video.videoWidth
                    const height = video.videoHeight
                    console.log(`${width} ${height}`)

                    var video_x, video_y;
                    console.log(`Clicked at (${x}, ${y})`);
                    video_x = x / this.rect_canvas.width * width;
                    video_y = y / this.rect_canvas.height * height;

                    console.log(`Clicked at (${video_x}, ${video_y})`);

                    // let data = {
                    //     "packettype": 7,
                    //     "cameraid": 320000003,
                    //     "timestamp": Date.now(),
                    //     "x": video_x,
                    //     "y": video_y,
                    //     "zoomtype": 0,
                    //     "width": 200,
                    //     "height": 200
                    // }
                    // this.message = JSON.stringify(data);
                    // console.log(this.message);
                    // this.sendMessage();

                    let data = {
                        "packettype": 4,
                        "cameraid": 320000003,
                        "timestamp": Date.now(),
                        "type": 1,
                        "coords": [{ "x": video_x, "y": video_y }]
                    }
                    this.message = JSON.stringify(data);
                    this.sendMessage();
                }
            }
        },

        create_green_dot_fullscreen(x, y) {
            const fullscreenElement = document.fullscreenElement;

            const dot_prev = fullscreenElement.querySelector("#dot");

            if (dot_prev) {
                fullscreenElement.removeChild(dot_prev);
            }

            const dot = document.createElement('div');
            dot.id = 'dot';
            dot.style.position = 'absolute';
            dot.style.top = `${y - 10}px`;
            dot.style.left = `${x - 10}px`;
            dot.style.width = '20px'
            dot.style.height = '20px'
            dot.style.borderRadius = '50%'
            dot.style.backgroundColor = 'rgb(250, 82, 82)'
            dot.style.zIndex = "6";
            fullscreenElement.appendChild(dot)
        },

        create_green_dot(x, y) {

            const dot_prev = document.querySelector(".player").querySelector("#dot");
            // console.log(dot_prev);
            if (dot_prev) {
                document.querySelector(".player").removeChild(dot_prev);
            }

            // show red dot
            const dot = document.createElement('div');
            dot.id = 'dot';
            dot.style.position = 'absolute';
            dot.style.top = `${y - 10}px`;
            dot.style.left = `${x - 10}px`;
            dot.style.width = '20px'
            dot.style.height = '20px'
            dot.style.borderRadius = '50%'
            dot.style.backgroundColor = 'rgb(250, 82, 82)'
            dot.style.zIndex = "6";
            document.querySelector(".player").appendChild(dot);
        },

        Get_video_range() {
            return new Promise(resolve => {
                const isFullScreen = document.fullscreenElement != null;

                const video = document.querySelector("video");
                const width = video.videoWidth
                const height = video.videoHeight
                var aspectRatio = width / height

                var windowWidth, windowHeight, windowRatio, centerX, centerY, real_width, real_height;

                if (isFullScreen) {
                    windowWidth = window.innerWidth;
                    windowHeight = window.innerHeight;
                    windowRatio = windowWidth / windowHeight;
                    centerX = Math.floor(windowWidth / 2);
                    centerY = Math.floor(windowHeight / 2);

                } else {
                    // 非全屏
                    const myvideo = document.querySelector(".player");
                    const style = window.getComputedStyle(myvideo)
                    windowWidth = parseInt(style.getPropertyValue('width'));
                    windowHeight = parseInt(style.getPropertyValue('height'));
                    centerX = Math.floor(windowWidth / 2);
                    centerY = Math.floor(windowHeight / 2);
                    windowRatio = windowWidth / windowHeight;

                }

                if (windowRatio >= aspectRatio) {
                    // width
                    real_width = windowHeight * aspectRatio;
                    real_height = windowHeight;


                } else {
                    // height 
                    real_height = windowWidth / aspectRatio;
                    real_width = windowWidth;

                }
                var startX = centerX - Math.round(real_width / 2);
                var startY = centerY - Math.round(real_height / 2);
                if (startX <= 0) startX = 0;
                if (startY <= 0) startY = 0;


                var res = {
                    "x": startX,
                    "y": startY,
                    "w": Math.round(real_width),
                    "h": Math.round(real_height)
                }
                resolve(res)
            }, 10)
        },

        video_to_div(x, y) {
            const isFullScreen = document.fullscreenElement != null;

            const video = document.querySelector("video");
            const width = video.videoWidth
            const height = video.videoHeight
            var aspectRatio = width / height;

            var windowWidth, windowHeight, windowRatio, centerX, centerY;

            if (isFullScreen) {
                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;
                windowRatio = windowWidth / windowHeight;
                centerX = Math.floor(windowWidth / 2);
                centerY = Math.floor(windowHeight / 2);

            } else {
                // 非全屏
                const myvideo = document.querySelector(".player");
                const style = window.getComputedStyle(myvideo)
                windowWidth = parseInt(style.getPropertyValue('width'));
                windowHeight = parseInt(style.getPropertyValue('height'));
                centerX = Math.floor(windowWidth / 2);
                centerY = Math.floor(windowHeight / 2);
                windowRatio = windowWidth / windowHeight;
            }
            var result_x, result_y;
            if (windowRatio >= aspectRatio) {
                // width

                const real_width = windowHeight * aspectRatio;
                result_x = x + centerX - Math.round(real_width / 2);
                result_y = y;

            } else {
                // height 
                const real_height = windowWidth / aspectRatio;
                result_y = y + centerY - Math.round(real_height / 2);
                result_x = x;
            }
            return {
                "x": result_x,
                "y": result_y
            }

        },

        div_to_video(x, y) { //是否要加约束
            const isFullScreen = document.fullscreenElement != null;

            const video = document.querySelector("video");
            const width = video.videoWidth
            const height = video.videoHeight
            var aspectRatio = width / height
            var windowWidth, windowHeight, windowRatio, centerX, centerY;

            if (isFullScreen) {
                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;
                windowRatio = windowWidth / windowHeight;
                centerX = Math.floor(windowWidth / 2);
                centerY = Math.floor(windowHeight / 2);

            } else {
                // 非全屏
                const myvideo = document.querySelector(".player");
                const style = window.getComputedStyle(myvideo)
                windowWidth = parseInt(style.getPropertyValue('width'));
                windowHeight = parseInt(style.getPropertyValue('height'));
                centerX = Math.floor(windowWidth / 2);
                centerY = Math.floor(windowHeight / 2);
                windowRatio = windowWidth / windowHeight;
            }

            if (windowRatio >= aspectRatio) {
                // width
                const real_width = windowHeight * aspectRatio;
                x = x - centerX + Math.round(real_width / 2);

            } else {
                // height 
                const real_height = windowWidth / aspectRatio;
                y = y - centerY + Math.round(real_height / 2);
            }
            return {
                "x":x,
                "y":y
            }
        },

        readJson_draw_Coords(coor) {

            if (this.mycanvas && coor != undefined) {
                // canvas 坐标修改
                const video = document.querySelector("video");

                const video_height = video.videoHeight;
                const video_width = video.videoWidth;

                const window_w = this.mycanvas.width;
                const window_h = this.mycanvas.height;
                
                // console.log(video_height / window_h, window_h / window_w);
                // console.log(coor);
                this.coordsData = coor.map((d) => d.coords);
                // console.log(this.coordsData);
                let coord_Data = JSON.parse(JSON.stringify(this.coordsData));
                
                coord_Data.map((d) => {
                    d = d.forEach((coor1) => {
                        coor1.x = coor1.x * window_w / video_width;
                        coor1.y = coor1.y * window_h / video_height;
                        return coor1;
                    })
                    return d
                })


                const ctx = this.mycanvas.getContext("2d");

                ctx.clearRect(0, 0, this.mycanvas.width, this.mycanvas.height); // clear canvas
                coord_Data.forEach((coords) => {
                    const currentTime = video.currentTime;
                    this.drawPolygon(ctx, coords, currentTime);
                });
            } else {
                console.log("mycanvas does not exist.");
            }


        },

        async VideoplayResize() {
            let myVideo = document.querySelector(".player");
            const parent = myVideo.parentNode.parentNode;
            const parentStyles = window.getComputedStyle(parent);
            // parent.style.aspectRatio=aspectRatio;
            const parentWidth = parseInt(parentStyles.getPropertyValue('width'));
            const parentHeight = parseInt(parentStyles.getPropertyValue('height'));
            myVideo.style.width = `${parentWidth - 10}px`;
            myVideo.style.height = `${parentHeight - 10}px`;
            this.options.width = `${parentWidth - 10}px`;
            this.options.height = `${parentHeight - 10}px`;

            // canvas resize
            await this.Get_video_range().then(res => {
                this.mycanvas.width = res.w;
                this.mycanvas.height = res.h;
                this.mycanvas.style.top = res.y + "px";
                this.mycanvas.style.left = res.x + "px";
                this.rect_canvas.width = res.w;
                this.rect_canvas.height = res.h;
                this.rect_canvas.style.top = res.y + "px";
                this.rect_canvas.style.left = res.x + "px";
            });

        },

        // helper function to draw a polygon onto a canvas
        drawPolygon(ctx, coords, currentTime) {
            // console.log(currentTime);
            currentTime;
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            const firstCoord = coords[0];
            
            // console.log(coords);
            // console.log(firstCoord);
            ctx.moveTo(firstCoord.x | 0, firstCoord.y | 0);
            coords.slice(1).forEach((coord) => {
                // console.log(coord);
                ctx.lineTo(coord.x | 0, coord.y | 0);
            });
            ctx.closePath();

            ctx.stroke();
        },

        async createCanvas() {
            const canvas = this.mycanvas;

            await this.Get_video_range().then(res => {
                canvas.width = res.w;
                canvas.height = res.h;
                canvas.style.top = res.y + "px";
                canvas.style.left = res.x + "px";
                canvas.style.position = "absolute";
                canvas.style.zIndex = "3";
                if (!this.Sendcoordinate) {
                    canvas.style.pointerEvents = "none"
                }
            });

            // console.log(canvas);
            // console.log("createCanvas");
            return canvas;
        },

        toggle() {
            console.log("refresh");

            if (this.Sendcoordinate) {
                const dot_now = document.querySelector(".player").querySelector("#dot");
                if (dot_now) {
                    document.querySelector(".player").removeChild(dot_now);
                }
                this.mode="监控定位模式"
                this.Sendcoordinate = false;
                this.mycanvas.style.pointerEvents = "none";
                this.rect_canvas.style.pointerEvents = "none";
            } else {
                this.mode="拉框放大模式"
                this.Sendcoordinate = true;
                this.mycanvas.style.pointerEvents = "auto"
                this.rect_canvas.style.pointerEvents = "auto";
            }

            let data =
            {
                "cameraid": 320000003,
                "coords": [
                    {
                        "x": 0,
                        "y": 0
                    }
                ],
                "errorcode": 200,
                "packetscr": 4,
                "packettype": 255,
                "timestamp": 1685096760439,
                "timestampscr": 0,
                "type": 1
            }

            this.message = JSON.stringify(data);
            console.log(this.message)
            this.sendMessage();
            // eventBus.$emit('clearMapPoint')
        },

        captureScreenshot() {
            const video = document.querySelector("video");
            // 将视频当前帧绘制到Canvas上
            const ctx = this.mycanvas.getContext("2d");
            console.log(this.mycanvas);

            const picHeight = this.mycanvas.height;
            const picWidth = this.mycanvas.width;
            ctx.drawImage(video, 0, 0, picWidth, picHeight);

            // 获取Canvas中的图像数据URL
            const dataUrl = this.mycanvas.toDataURL("image/png");

            // 处理截屏图像数据
            // console.log(dataUrl);
            this.saveDataUrlAsPNG(dataUrl, "screenshot.png");
            ctx.clearRect(0, 0, this.mycanvas.width, this.mycanvas.height); // clear canvas
        },

        dataURLToBlob(dataUrl) {
            const arr = dataUrl.split(",");
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        saveDataUrlAsPNG(dataUrl, fileName) {
            const blob = this.dataURLToBlob(dataUrl);
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = fileName;
            downloadLink.click();
        },



        // 退出全屏状态，移除内容
        async handleFullscreenChange(event) {
            const videoElement = event.target;
            const fullscreenElement = document.fullscreenElement;

            if (fullscreenElement === videoElement) {
                const canvas = await this.createCanvas();
                const canvas_rect = await this.createCanvas2();
                videoElement.appendChild(canvas);
                videoElement.appendChild(canvas_rect)

                const refreshButton = this.createSwitchButton();
                const captureButton = this.createCaptureButton();
                videoElement.appendChild(refreshButton);
                videoElement.appendChild(captureButton);
                this.mycanvas = canvas;
            } else {
                videoElement.removeChild(videoElement.querySelector('canvas'));
                videoElement.removeChild(videoElement.querySelector('button'));
                const canvas = await this.createCanvas();
                const canvas_rect = await this.createCanvas2();

                this.mycanvas = canvas;
                document.querySelector(".player").appendChild(this.mycanvas);
                document.querySelector(".player").appendChild(canvas_rect);
            }
        },

    }
};
</script>
  
  
<style>
.player {
    position: relative;
    height: 100% !important;
    width: 100% !important;
    //margin: auto;
    z-index: 0;
    //padding-bottom: 56.25%;
    /* pointer-events: none; */
}
#Switch {
  position: absolute;
  top: 90%;
  left: 28%;
  z-index: 8;
  font-weight: bold;
}
#Capture {
  position: absolute;
  top: 90%;
  left: 59%;
  z-index: 8;
  font-weight: bold;
}
.btn1 {
  display:flex;
  background-image: linear-gradient(to right, #25aae1, #40e495);
  box-shadow: 0 0.5vh 2vh 0 rgba(49, 196, 190, 0.75);
  border: 0;
  height: 4vh;
  font-size: 1.1vw;
  font-weight: bold;
  border-radius: 3vh;
  color: #fafafa;
  outline: none;
  cursor: pointer;
}
.btn1:hover {
  transform: translateY(-0.3vh); /* 悬停时按钮向上移动 2px */
  color: white;
}
.btn1:active {
  transform: translateY(1px); /* 点击时按钮向下移动 1px */
  box-shadow: 0 0.5vh 2vh 0 rgba(49, 196, 190, 0.75); /* 添加点击时的阴影效果 */
}
</style>
  