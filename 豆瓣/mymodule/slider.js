export class Slider {
    constructor(container, styles, page, distance, time, plugins = []) {
        this.container = container;
        this.page = page;
        this.distance = distance;
        this.time = time;
        this.index = 0;
        this.plugins = plugins;
        this.plugincreator = [this.control, this.dotcontrol, this.counter]
        this.init(styles, this.plugins);
        this.createinner();
        this.lock = true;
        this.timer();
    }
    isObject(tested) {
        return tested.__proto__ === Object.prototype;
    }
    init(styles, plugins) {
        if (this.isObject(styles)) {
            this.initStyle(styles);
        }
        this.registerPlugins(plugins);
    }
    //给外层容器添加样式
    initStyle(styles) {
        Object.keys(styles).forEach((key) => {
            this.setStyleAttribute(this.container, key, styles[key]);
        });
        this.setStyleAttribute(this.container, "position", "relative");
        this.setStyleAttribute(this.container, "overflow", "hidden");
    }
    setStyleAttribute(dom, key, value) {
        dom.style[key] = value;
    }
    // 创建内部滑动条
    createinner=()=>{
        this.innerslide = document.createElement('ul');
        this.innerslide.style.transition='all ease 1s'
        this.innerslide.style.width = -this.distance*(this.page+1) + 'px';
        this.innerslide.style.height = this.container.style.height;
        this.innerslide.style.position = 'absolute';
        this.innerslide.style.left='0';
        console.log(this.innerslide.style.width)
        this.container.appendChild(this.innerslide);
        this.createorigin();
        this.createclone();
    }
    createorigin=()=>{
        this.originarea=document.createElement('div');
        this.originarea.style.float='left';
        this.originarea.style.height= this.container.style.height;
        this.originarea.style.width=-this.distance*this.page+'px';
        this.innerslide.appendChild(this.originarea)
    }
    createclone=()=>{
        this.clonearea=document.createElement('div');
        this.clonearea.style.float='left';
        this.clonearea.style.height= this.container.style.height;
        this.clonearea.style.width=-this.distance+'px';
        this.innerslide.appendChild(this.clonearea)
    }
    //添加控制器插件
    registerPlugins = (plugins) => {
        plugins.forEach((plugin, idx) => {
            if (plugin) {
                this.plugincreator[idx](plugin);
            }
        })
    }
    control = (plugin) => {
        plugin.innerHTML = `
        <div class='slider-control'>
        <div class='control-left'></div>
        <div class='control-right'></div>
        </div>`
        plugin.querySelector('.control-left').addEventListener('click', this.silderleft);
        plugin.querySelector('.control-right').addEventListener('click', this.sliderright);
    }
    dotcontrol = (plugin) => {
        plugin.innerHTML =
            `<div class="slider-control2">
        <div class="control-left"></div>
        ${'<div class="dot"></div>'.repeat(5)}
        <div class="control-right"></div>
        </div>`
        plugin.querySelector('.control-left').addEventListener('click', this.silderleft);
        plugin.querySelector('.control-right').addEventListener('click', this.sliderright);
        this.dotslide(Array.from(plugin.querySelectorAll('.dot')));
    }
    counter = (plugin) => {
        plugin.innerHTML =
            `<div id="count">
        <span class="numberchange"></span>
        /
        <span>${this.page}</span>
        </div>`
        this.commpute(plugin.querySelector('.numberchange'))
    }
    silderleft = () => {
        if (!this.lock) return;
        this.index--;
        if (this.index == -1) {
            this.innerslide.style.transition = 'none';
            this.innerslide.style.left = this.page * this.distance + 'px';
            this.index = this.page - 1;
            setTimeout(() => {
                this.innerslide.style.left = this.index * this.distance + 'px'
                this.innerslide.style.transition = "1s ease";
            }, 0);
        } else {
            this.innerslide.style.left = this.index * this.distance + 'px'
        }
        this.registerPlugins(this.plugins);
        this.lock = false;
        setTimeout(() => {
            this.lock = true;
        }, 1000);
    }
    sliderright = () => {
        if (!this.lock) return;
        this.index++;
        this.innerslide.style.transition = "1s ease";
        this.innerslide.style.left = this.index * this.distance + 'px'
        if (this.index == this.page) {
            this.index = 0;
            setTimeout(() => {
                this.innerslide.style.left = 0;
                this.innerslide.style.transition = "none";
            }, 1001);
        }
        this.registerPlugins(this.plugins);
        this.lock = false;
        setTimeout(() => {
            this.lock = true;
        }, 1000);
    }
    dotslide(dots) {
        dots.map((dot, idx) => {
            if (this.index == idx) {
                dot.classList.add('dotchange');
            } else {
                dot.classList.remove('dotchange');
            }

        })
    }
    commpute = (count) => {
        if (this.index >= 0 && this.index < this.page) {
            count.innerHTML = `${this.index+1}`
        }
    }
    //设置计时器
    timer() {
        if (this.time) {
            this.start();
            this.container.addEventListener("mouseover", () => {
                this.stop();
            });
            this.container.addEventListener("mouseout", () => {
                this.start();
            });
        }
    }
    start() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.sliderright();
            }, this.time);
        }
    }
    stop() {
        this.interval && clearInterval(this.interval);
        this.interval = null;
    }
    clone=( begin, end)=> {
        const lis=this.innerslide.querySelectorAll('.clone');
        Array.from(lis).slice(begin,end).map(item=>{
            this.clonearea.appendChild(item.cloneNode(true));
        })
    }
}