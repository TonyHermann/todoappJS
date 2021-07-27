const inputTodo = document.querySelector('#input');
const ul = document.querySelector('ul');
const ulFooter = document.querySelector('.ul-footer');
const itemsLeft = document.querySelector('.ul-footer__itemsleft');
const clearButton = document.querySelector('.ul-footer__button');
const controls = document.querySelector('.controls');
const header = document.querySelector('header');

// itemList for save every TODO
const itemList = {
    all: '',
    active: '',
    completed: ''
}

document.addEventListener('DOMContentLoaded', function () {
    startApp();
    var viewport = document.querySelector("meta[name=viewport]");
    console.log(viewport);
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
});

const startApp = () => {
    console.log('Started');

    initInput();
    initUlFooter();
    initControls();
    initThemeToggle();
};



const initInput = () => {
    inputTodo.addEventListener('keypress', function (e) {
        // This waits to 'enter' key for be pressed to start the code
        const x = e.target.value;


        if (e.key === 'Enter') {
            if (x.length > 2) {
                let item = { 
                    text: `${e.target.value}`,
                    id: `${itemList.all.length}`
                };
    
                console.log(item);
    
                // Simulates the add a new todo function
                inputTodo.value = '';
    
                // Add the new TODO to the itemList
                addToList(item);
            } else {
                alert('In order to add your todo, it have to contain at least 2+ characters')
            };
            
        };
         

    });
};

const addToList = (item) => {
    // Add the new TODO to the itemList
    const {
        all, active
    } = itemList;
    itemList.all = [...all, item];
    itemList.active = [...active, item];

    console.log(itemList);

    initUlFooter();

    const li = createLi(item);

    // console.log(li);
    ul.insertBefore(li, ul.childNodes[0]);
};

const createLi = (item) => {

    const li = document.createElement('li');

    li.setAttribute('data-status', 'active');
    li.setAttribute('draggable', 'true');
    
    const fatherdiv = document.createElement('div');
    fatherdiv.classList.add('radio');

    const div = document.createElement('div');
    div.classList.add('radio__radio');

    fatherdiv.addEventListener('click', function(){
        div.classList.toggle('active');
        p.classList.toggle('line-through');
        if (p.classList.contains('line-through')) {
            const {
                all, active, completed
            } = itemList;

            itemList.completed = [...completed, item];
            li.setAttribute('data-status', 'completed');

            const y = itemList.active;
            const newActive = y.filter(lala => {
                return lala != item;
            })
            itemList.active = newActive;

            // console.log('added');
            // console.log(itemList);
            // console.log('contains');
            initUlFooter();
        } else {
            const {
                all, active, completed
            } = itemList;
            const x = itemList.completed;
            // console.log(x)
            // console.log('not contains');
            let newCompleted = x.filter(lala => {
                return lala != item; 
            });
            itemList.completed = newCompleted;

            itemList.active = [...active, item];
            li.setAttribute('data-status', 'active');

            // console.log('removed');
            // console.log(itemList);
            initUlFooter();
        }
    })
   
    const p = document.createElement('p');
    p.classList.add('todo__thing');
    p.textContent = item.text;

    const svg = document.createElement('svg');
    svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd"
    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
    </svg>`
    svg.classList.add('handle');

    svg.setAttribute('data-id', `${item.id}`);
    initClearEntry(svg)
    
    fatherdiv.appendChild(div);
    li.appendChild(fatherdiv);
    li.appendChild(p);
    li.appendChild(svg);

    return li
};

const clearCompleted = () => {
    clearButton.addEventListener('click', function(){
        
        // console.log(newAllList);

        // itemList.all = newAllList;
        itemList.completed = '';
        
        ul.childNodes.forEach(function(item){
            
            if (item.nodeName === 'LI') {
                console.log('laslalasl')
                if (item.dataset.status === 'completed') {
                    console.log('vkvkvkvkvk')
                    

                    itemList.all = itemList.active;
                    ul.removeChild(item);
                }
            }
        })
    });
};

const initUlFooter = () => {
    itemsLeft.textContent = `${itemList.active.length} item(s) left`;
    clearCompleted();
    
};

const initClearEntry = (element) => {
    element.addEventListener('click', function(){
        console.log(element.parentElement);
        ul.removeChild(element.parentElement);

        const {
            all, active, completed
        } = itemList;
       
        console.log(itemList.completed.length);
        if (itemList.completed.length > 0) {
            const x = itemList.completed;
            let newCompleted = x.filter(lala => {
            return lala.id != element.dataset.id; 
        });
        console.log(newCompleted);
        itemList.completed = newCompleted;
        } 
        if (itemList.active.length > 0) {
            const y = itemList.active;
            const newActive = y.filter(lele => {
                return lele.id != element.dataset.id;
            })
            console.log(newActive);
            itemList.active = newActive;
        }
        if (itemList.all.length > 0){
            const z = itemList.all;
            const newAll = z.filter(lili => {
                return lili.id != element.dataset.id;
            })
            itemList.all = newAll;
        }
        console.log(itemList);
        itemsLeft.textContent = `${itemList.active.length} item(s) left`;
    });
};

const allButton = document.querySelector('.all');
const activeButton = document.querySelector('.active');
const completedButton = document.querySelector('.completed');

const clearUl = () => {
    //It justs clear the Ul, not the itemList object.
    while (ul.firstChild) {
        if (!ul.firstChild.classList.contains('ul-footer')) {
            ul.removeChild(ul.firstChild);
        }
    }
};  

const initControls = () => {
    allButton.addEventListener('click', function(){
        allButton.classList.add('selectedFooter');
        activeButton.classList.remove('selectedFooter');
        completedButton.classList.remove('selectedFooter');
        ul.childNodes.forEach(function(elem){
            console.log(elem);
            if (elem.dataset.status === 'completed') {
                elem.classList.remove('display-none');
            }
            if (elem.dataset.status === 'active') {
                elem.classList.remove('display-none');
            }
        })
    })
    activeButton.addEventListener('click', function(){
        activeButton.classList.add('selectedFooter');
        allButton.classList.remove('selectedFooter');
        completedButton.classList.remove('selectedFooter');
        ul.childNodes.forEach(function(elem){
            console.log(elem);
            if (elem.dataset.status === 'completed') {
                elem.classList.add('display-none');
            }
            if (elem.dataset.status === 'active') {
                elem.classList.remove('display-none');
            }
        })
    });
    completedButton.addEventListener('click', function(){
        completedButton.classList.add('selectedFooter');
        allButton.classList.remove('selectedFooter');
        activeButton.classList.remove('selectedFooter');
        ul.childNodes.forEach(function(elem){
            console.log(elem);
            if (elem.dataset.status === 'active') {
                elem.classList.add('display-none');
            }
            if (elem.dataset.status === 'completed') {
                elem.classList.remove('display-none');
            }
        })
    });
};

const initThemeToggle = () => {
        const themeToggle = document.querySelector('.theme-toggle');

    themeToggle.addEventListener('click', function(){
        const html = document.querySelector('html');
        if (html.classList.contains('dark')) {
            console.log('lala')
            themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>'
        } else {
            themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>'
        }
        
        html.classList.toggle('dark');
    });
};

const sortable = document.querySelector('#sortable')
// new Sortable(sortable, {
//     animation: 150,
//     ghostClass: 'blue-background-class'
// });

new Sortable(sortable, {
    handle: '.handle', // handle's class
    animation: 150
});