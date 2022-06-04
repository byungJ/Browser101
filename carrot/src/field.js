'use strict';
import * as sound from './sound.js'

const CARROT_SIZE = 80;

export const ItemType = Object.freeze(
    {
        carrot: 'carrot',
        bug: 'bug',
    }
)

export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.field = document.querySelector('.game_field');
        this.fieldRect = this.field.getBoundingClientRect();

        // 1. this.onClick = this.onClick.bind(this); 직접 바인딩
        // 2. () => {} Arrow함수 사용하기
        this.field.addEventListener('click',this.onClick);
    }

    init() {
        this.field.innerHTML = '';
        // 벌레와 당근을 생성힌 뒤 field에 추가 해줌
        this._addItem('carrot', this.carrotCount, './img/carrot.png');
        this._addItem('bug', this.bugCount, './img/bug.png');
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

    // 3. 엘리추천
    // onClick이라는 맴버변수로 만들고 arrow function을 가리키고 있습니다.
    onClick = (event) => {
        const target = event.target;
    
        // matches: css 셀렉터가 맞는지 확인.
        if(target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        } else if(target.matches('.bug')) {
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}