<template>
    <div>   
        <h3 class="text-center mt-2">Todo App ✔</h3>
        <hr class="my-2">
        <label for="todoText"></label>
        <input @keydown.enter="addTodo" id="todoText" placeholder="Add something to do...">
            <ul>
            <li v-for="todo in todoList" :key="todo" class="d-flex justify-content-between align-items-center">
                <span :class="{lined: todo.isCompleted }" >{{todo.title}}</span> 
                <div>
                    <input type="checkbox"  @click="completeTodo($event, todo)" class="check" :checked="todo.isCompleted" />
                    <button @click="delTodo(todo)" class="sm red" >Delete</button>  
                </div>
                
            </li>
        </ul>
        <todoResult :completedTodos = "completedTodos" :uncompletedTodos = "uncompletedTodos"/>
    </div>
</template>

<script>
import todoResult from "../components/todoResult.vue"
import {mapGetters} from "vuex"
export default {
    components: {
        todoResult
    },
    data(){
        return {
            todoList: [],
            completeState: "✔"
        }
    },
    async created(){
        // console.log(this.$store.state.user.todoList)
        // this.todoList = await this.$store.state.user.todoList
        await this.$appAxios.get(`/todoList?userId=${this.getCurrentUser.id}`).then(res=>{
            this.todoList = res.data
        })
    },
    methods: {
        addTodo(e){
            this.$appAxios.post(`/todoList`, {title: e.target.value, isCompleted: false, userId: this.getCurrentUser.id}).then(res=>{
                //console.log(res)
                this.todoList.push(res.data)
                
            })
        },
        delTodo(todo){
            this.$appAxios.delete(`/todoList/${todo.id}`)
            this.todoList = this.todoList.filter(t => t.id !== todo.id)
            //console.log(todo)
        },
        completeTodo(event, todo){
            this.$appAxios.patch(`/todoList/${todo.id}`, {isCompleted: event.target.checked})
            todo.isCompleted = event.target.checked
            
        }
    },
    computed:{
        ...mapGetters(["getCurrentUser"]),
        completedTodos(){
            return this.todoList.filter(t => t.isCompleted).length
        },
        uncompletedTodos(){
            return this.todoList.filter(t => !t.isCompleted).length
        }
    }
}
</script>

<style>
    .lined{
        text-decoration: line-through;
    }
    /*.check{
        appearance: none;
        
    }*/
</style>