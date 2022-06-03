'use strict';
const carrotSound = new Audio('./sound/carrot_pull.mp3');

export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.field = document.querySelector('.game_field');
        this.fieldRect = field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }

    init() {
        field.innerHTML = '';
        // 벌레와 당근을 생성힌 뒤 field에 추가 해줌
        this._addItem('carrot', CARROT_COUNT, './img/carrot.png');
        this._addItem('bug', BUG_COUNT, './img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
    
        for(let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    onClick(event) {
        const target = event.target;
    
        // matches: css 셀렉터가 맞는지 확인.
        if(target.matches('.carrot')) {
            target.remove();
            playSound(carrotSound);
            this.onItemClick && this.onItemClick('carrot');
        } else if(target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}