const todoform = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const formBtn = document.querySelector("#form-btn")
const taskCount = document.querySelector("#task-count")
const completeCount= document.querySelector("#tsak-copmleted")
let todos = [{
   id: Date.now() + 1,
   text: "Goto gym ",
   iscompleted: false
},

{
   id: Date.now() + 2,
   text: "revise weeb dev ",
   iscompleted: true
},

{
   id: Date.now() + 3,
   text: "do hardwork ",
   iscompleted: false
}
];


let editTodoId = null;//flag

todoform.addEventListener('submit', (e) => {
   e.preventDefault();


   const todovalue = todoInput.value.trim();

   if (!todovalue) {
      return
   }

   console.log({ editTodoId, todovalue });

   // todos.push(todovalue);
   if (editTodoId) {
      todos = todos.map((todo) => {
         if (todo.id === Number(editTodoId)) {
            return {
               ...todo,
               text: todovalue
            }
         }
         return todo
      })
       editTodoId= null;
   formBtn.textContent= "Add";
   formBtn.classList.remove("startEdit");
   formBtn.classList.remove("bg-amber-400");
   formBtn.classList.add("bg-violet-700");
   }

   else {
      // renderTodo()
      let newTodo = {
         id: Date.now(),
         text: todovalue,
         iscompleted: false
      }

   // editTodoId= null;
   // formBtn.textContent= "Add";
   // formBtn.classList.remove("startEdit");


      todos.push(newTodo)
      // addTodo(newTodo);
   }
   todoInput.value = ""
   renderTodo()
})


function renderTodo() {

   todoList.innerHTML = " ";
   todos.forEach(function (todo) {
      addTodo(todo);
   })
}


function addTodo(todo) {
   const li = document.createElement("li");
   li.dataset.id = todo.id;
   li.textContent = todo.text;
   li.className = ` <li data-id="1" class="   mt-2 flex gap-2 border  border-slate-300 p-4 rounded-lg overflow-hidden">
    
</li>

`
   todoList.append(li);
   li.innerHTML = `  
                    <input  data-action="toggle" ${todo.iscompleted ? "checked" : ""} data-id=${todo.id} ${todo.iscompleted === true ? 'checked' : ''} type="checkbox" >
                    <p class="flex-1 ${todo.iscompleted ? "line-through text-red-600" : " "} ">${todo.text} </p>
                    <div class="flex gap-2">
                     <div class="  rounded-sm px-2.5 py-1 bg-amber-100   text-amber-700 " >           
                        <button data-action="edit" data-id=${todo.id}>Edit</button> 
                         </div>
                        <div class="  rounded-sm px-2.5 py-1 bg-red-100   text-red-700" >
                        <button data-action="delete" data-id=${todo.id}>Delete</button>
                        </div>
                    </div>
                </li>`
               
                taskCount.textContent = `TASKS (${todos.length})`

           completeCount.textContent = `COMPLETED: ${todos.filter((todo)=> todo.iscompleted).length}`    
}

renderTodo()

//event deligation 
todoList.addEventListener(`click`, (e) => {
   const li = e.target.closest('li')

   let checkbox = e.target.closest('input[type="checkbox"]');//css selector to select only checkbox input
   let btn = e.target.closest('button');
   let action = e.target.dataset.action;
   const id = li.dataset.id;


   if (action === "delete") {
      deleteTodo(e, id)

   }

   if (action === "edit") {
      startEdit(id)
   }

   if (action === "toggle") {
      todos = todos.map((todo) => {
         if (todo.id === Number(id)) {
            return {
               ...todo,
               iscompleted: !todo.iscompleted
            }
         }
         return todo
      })
      renderTodo();
   }
})

function deleteTodo(e, id) {
   e.target.closest('li').remove();
   todos = todos.filter((todo) => {
      if (todo.id !== Number(id)) {
         return todo;

      }
   })
   renderTodo();
}


function startEdit(id) {

   editTodoId = id;

   let currentTodo = todos.find((todo) => {
      if (todo.id === Number(id)) {
         return todo
      }
      
   })


   
   todoInput.value = currentTodo.text

   formBtn.textContent = "update";
   formBtn.classList.remove("bg-violet-700")
   formBtn.classList.add("bg-amber-400")
 }



const body = document.querySelector("body")
let colorStr = "0123456789abcdef"

// let randomValue = Math.floor(Math.random() * colorStr.length)+1



setInterval(()=>{
   let color = ""
for(let i = 0 ; i<6 ;i++){
let randomValue = Math.floor(Math.random() * colorStr.length)
color = color + colorStr[randomValue]
}
body.style.backgroundColor = `#${color}`

},500)

