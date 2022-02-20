export class Updown {
    constructor(container, changebox, num, url) {
        this.container = container;
        this.changebox = changebox;
        this.num = num;
        this.url = url;
    }
    add() {
        this.container.addEventListener('click', this.handleadd)
    }
    remove(){
        this.container.removeEventListener('click',this.handleadd);
        this.container.addEventListener('click',()=>{
            alert('请先登录豆瓣')
        })
    }
    handleadd = () => {
        this.num++;
        this.changebox.innerHTML = this.num;
        fetch(this.url, {
            method: 'GET'
        })
    }
}