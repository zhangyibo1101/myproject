export class Tag {
    constructor(container, str) {
        this.str = str;
        let category = document.createElement('div');
        this.category = category;
        category.className = 'category';
        this.container = container;
        this.num=0;
    }
    create() {
        this.tags = [];
        this.str.split(',').map(this.handlecreate)
        this.tags[0].style.backgroundColor="#258DCD";
        this.tags[0].style.color='#fff';
    }
    handlecreate=(item)=>{
        let tag = document.createElement('span');
        this.tags[this.tags.length] = tag;
        tag.innerHTML = item;
        this.category.appendChild(tag);
        this.container.appendChild(this.category);
    }
    
    operate() {
        this.tags.map(this.handleoperate)
    }
    handleoperate=(item,index)=>{
        item.addEventListener('click', () => {
            item.style.backgroundColor = "#258DCD";
            item.style.color = "#fff";
            this.tags.filter(sonitem => sonitem != item).map(item => {
                item.style.backgroundColor = "transparent";
                item.style.color = "#333";
            })
            this.num=index;
        })
    }
    requestnum() {
        return [this.num,this.tags[this.num].innerHTML];
    }
}


