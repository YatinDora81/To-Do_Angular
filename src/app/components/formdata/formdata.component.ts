import { CommonModule } from '@angular/common';
import { Component, Output , EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../ToDo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formdata',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './formdata.component.html',
  styleUrl: './formdata.component.css'
})
export class FormdataComponent {
  
  @Output() addNewTodo : EventEmitter<Todo> = new EventEmitter();

  title: string = '';
  desc: string = '';
  priority: string = '';

  constructor(private toastr: ToastrService) {}

  submitHandler(){
    const t = this.title.trim()
    const d = this.desc.trim()
    const p = this.priority.trim();
    if(t==="" || d==="" || p===""){
      if(t==="") this.toastr.error("Please fill Title")
      else if(d==="")this.toastr.error("Please fill description")
      else this.toastr.error("Please fill Priority")
      return;
    }
    // console.log(this.title , this.desc , this.priority);
    const myUniqueId = crypto.randomUUID();
    let newTodo = new Todo(myUniqueId,this.title,this.desc,"To-do", "1" ,new Date());
    if(this.priority==="2") newTodo = new Todo(myUniqueId,this.title,this.desc,"To-do", "2" ,new Date());
    else if(this.priority==="3") newTodo = new Todo(myUniqueId,this.title,this.desc,"To-do", "3" ,new Date());
  
    this.addNewTodo.emit(newTodo)
    this.toastr.success("Added New Task Successfully");
    
    //reset form
    this.title = "";
    this.desc = "";
    this.priority = "";
  }
}
