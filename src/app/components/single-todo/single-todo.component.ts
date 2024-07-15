import { Component, Input, Output , EventEmitter } from '@angular/core';
import { Todo } from '../../ToDo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-todo',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './single-todo.component.html',
  styleUrl: './single-todo.component.css'
})
export class SingleTodoComponent {
  @Input() tod !: Todo;
  @Output() todoDelete : EventEmitter<Todo> = new EventEmitter()
  @Output() todoChangeState : EventEmitter<Todo> = new EventEmitter();
  @Output() todoUpdate : EventEmitter<Todo> = new EventEmitter()

  ntitle !: string 
  ndesc  !: string;
  npriority !: string
  toUpdate : boolean = false; 

  currStatus !: "To-do" | "Completed" | "In-Progress"

  constructor(private toastr: ToastrService){}   

  ngOnInit() {
    this.ntitle = this.tod.title;
    this.ndesc = this.tod.desc;
    this.npriority = this.tod.priority
    this.currStatus = this.tod.status
  }

  updateHandler(){
    if(this.toUpdate===true){
      // update kro
      this.toUpdate = !this.toUpdate;
      // console.log(this.ntitle);
      let newTodo = new Todo(this.tod.id,this.ntitle, this.ndesc , "To-do" , "1" , this.tod.createdAt , new Date() );
      if(this.npriority === "2") newTodo = new Todo(this.tod.id,this.ntitle, this.ndesc , "To-do" , "2" , this.tod.createdAt , new Date() );
      else if(this.npriority === "3") newTodo = new Todo(this.tod.id,this.ntitle, this.ndesc , "To-do" , "3" , this.tod.createdAt , new Date() );

      // console.log(newTodo);
      
      this.toastr.success("Task Update Successfully")

      this.todoUpdate.emit(newTodo)
      
    }
    else{

      this.toUpdate = !this.toUpdate;

    }
  }
  
  deleteHandler(currTodo : Todo){
    // console.log(currTodo);
    this.todoDelete.emit(currTodo)
    this.toastr.success("Task " + currTodo.title + "  deleted Successfully ")
  }

  changeState(currTodo: Todo) {
    console.log(this.currStatus);
    
    let newTodo = new Todo(
      currTodo.id,
      currTodo.title,
      currTodo.desc,
      this.currStatus,
      currTodo.priority,
      currTodo.createdAt,
      new Date()
    );
    
    this.todoChangeState.emit(newTodo);

    
  }
}
