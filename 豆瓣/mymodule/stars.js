export class Star {
    constructor(id,num,zoom) {
        this.container = document.getElementById(id);
        this.num = num;
        this.zoom=zoom;
    }
    create = () => {
        let display = 10-Math.round(this.num);
        this.container.style.backgroundPositionY = display * (-22) + 'px';
        this.container.style.width='110px';
        this.container.style.height='22px';
        this.container.style.backgroundImage='url(/mymodule/stars.png )'
        this.container.style.display='inline-block';
        this.container.style.zoom=this.zoom;
    }
}