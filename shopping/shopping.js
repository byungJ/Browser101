const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');
const form = document.querySelector('.new-form');

form.addEventListener('submit', event => {
    event.preventDefault();
    onAdd();
})

// 사용자가 클릭 했을때 이벤트를 처리하는 함수는 보통 on이라고 붙힙니다.
function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    if(text === '') {
        input.focus();
        return;
    }
    console.log(text);

    // 2. 새로운 아이템을 만듬 (텍스트 + 삭제버튼)
    const item = createItem(text);
    
    // 3. items 컨테이너안에 새로 만든 아이템을 추가한다.
    items.appendChild(item);

    // 4. 인풋을 초기화 한다.
    input.value = '';
    input.focus();

    // 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({ block: 'center' });
}

// form으로 대체
// addBtn.addEventListener('click', () => {
//     onAdd();
// })

let id = 0; //UUID

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item_row');
    itemRow.setAttribute('data-id', id);

    itemRow.innerHTML = `
    <div class="item">
        <span class="item_name">${text}</span>
        <button class="item_delete">
            <i class="fa-solid fa-trash-can" data-id=${id}></i>
        </button>
    </div>
    <div class="item_divider"></div>`;

    // const item = document.createElement('div');
    // item.setAttribute('class', 'item');

    // const name = document.createElement('span');
    // name.setAttribute('class', 'item_name');
    // name.innerText = text;

    // const deleteBtn = document.createElement('button');
    // deleteBtn.setAttribute('class', 'item_delete');
    // deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    // deleteBtn.addEventListener('click', () => {
    //     items.removeChild(itemRow);
    // });

    // const itemDivider = document.createElement('div');
    // itemDivider.setAttribute('class', 'item_divider');

    // item.appendChild(name);
    // item.appendChild(deleteBtn);

    // itemRow.appendChild(item);
    // itemRow.appendChild(itemDivider);
    id++;
    return itemRow;
}

// form으로 대체
// keypress 사용하면 안됩니다.
// input.addEventListener('keydown', event => {
//     // 한글 다 만들어 지고 처리(아니면 keyup을 사용.)
//     if(event.isComposing) {
//         return;
//     }
//     if(event.key == 'Enter') {
//         onAdd();
//     }
// });

items.addEventListener('click', event => {
    const id = event.target.dataset.id;
    if(id) {
        console.log('click');
        const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
});