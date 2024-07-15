import { Component, OnInit } from '@angular/core';
import { FormdataComponent } from '../formdata/formdata.component';
import { Todo } from '../../ToDo';
import { CommonModule } from '@angular/common';
import { SingleTodoComponent } from '../single-todo/single-todo.component';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { FormsModule } from '@angular/forms';
import { History } from '../../History';
import { HistoryPageComponent } from "../history-page/history-page.component";


@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [FormdataComponent, CommonModule, SingleTodoComponent, FormsModule, HistoryPageComponent , HistoryPageComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css'
})
export class MainContainerComponent implements OnInit {
    
  todos : Todo [] = [];
  todos2 : Todo [] = []; // orignal
  historyArray : History[] = [];
  sortBy !: string
  isHistory !: boolean

  localtodos : any = {}
  localtodos2 : any = {}
  localhistoryarray : any = {}
  

  constructor(){
    //getlocalstored data 
    
    this.localtodos = localStorage.getItem("localtodos") ;
    if(this.localtodos!==null && this.localtodos!=="") this.todos = JSON.parse(this.localtodos) 
    
    this.localtodos2 = localStorage.getItem("localtodos2") ;
    if(this.localtodos2!==null  && this.localtodos!=="") this.todos = JSON.parse(this.localtodos2)

    this.localhistoryarray = localStorage.getItem("localhistoryarray");
    if(this.localhistoryarray!==null  && this.localtodos!=="") this.todos = JSON.parse(this.localhistoryarray)

      // console.log(localStorage);
      
    // window.sessionStorage.getItem("")
    // window.localStorage.getItem("mmi")
  
    
  }

  ngOnInit(): void {

    
    this.localtodos = localStorage.getItem("localtodos") ;
    if(this.localtodos!==null && this.localtodos!=="") this.todos = JSON.parse(this.localtodos) 
    
    this.localtodos2 = localStorage.getItem("localtodos2") || "";
    if(this.localtodos2!==null  && this.localtodos!=="") this.todos = JSON.parse(this.localtodos2)

    this.localhistoryarray = localStorage.getItem("localhistoryarray") || "";
    if(this.localhistoryarray!==null  && this.localtodos!=="") this.todos = JSON.parse(this.localhistoryarray)

    this.sortBy = '1'
    this.isHistory = false;
    this.historyArray = [];
    this.todos = [
      {
        id: "123456789",
        title: "Dummy Title 1",
        desc: "This is a dummy description 1.",
        status: "To-do",
        priority: "2",
        createdAt: new Date(),
        updateAt: new Date()
      },
      {
        id: "321654987",
        title: "Dummy Title 2",
        desc: "This is a dummy description 2.",
        status: "To-do",
        priority: "3",
        createdAt: new Date(),
        updateAt: new Date()
      },
      {
        id: "654789321",
        title: "Dummy Title 3",
        desc: "This is a dummy description 3.",
        status: "In-Progress",
        priority: "1",
        createdAt: new Date(),
        updateAt: new Date()
      },
      {
        id: "7412589363",
        title: "Dummy Title 4",
        desc: "This is a dummy description 4.",
        status: "Completed",
        priority: "1",
        createdAt: new Date(),
        updateAt: new Date()
      }
    ];
    this.todos2 = [...this.todos]
  }

  toggleHistoryPage(){
    this.isHistory = !this.isHistory
  }

  deleteTodo(tod : Todo){
    const ind = this.todos.indexOf(tod);
    this.todos.splice(ind,1)
    this.todos2 = [...this.todos];

    //history update
    const newhistory = new History(tod.id,tod.title , tod.desc , "Task Deleted" , tod.status , tod.priority , tod.createdAt , tod.updateAt)
    this.historyArray.push( newhistory )

    this.sortMethods()

    //add in local storage
    localStorage.setItem("localtodos" , JSON.stringify(this.todos) )
    localStorage.setItem("localtodos2" , JSON.stringify(this.todos2) )
    localStorage.setItem("localhistoryarray" , JSON.stringify(this.historyArray) )
    
  }

  updateTodo(tod : Todo){
    const index = this.todos.findIndex(t => t.id === tod.id);
    // console.log('ipfj' , index , tod);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...tod, updateAt: new Date() };
      this.todos2 = [...this.todos];
    }
    // console.log(this.todos);
    const newhistory = new History(tod.id,tod.title , tod.desc , "Task Updated" , tod.status , tod.priority , tod.createdAt , tod.updateAt)
    this.historyArray.push( newhistory )

    this.sortMethods()


    //add in local storage
    localStorage.setItem("localtodos" , JSON.stringify(this.todos) )
    localStorage.setItem("localtodos2" , JSON.stringify(this.todos2) )
    localStorage.setItem("localhistoryarray" , JSON.stringify(this.historyArray) )
    
    
  }

  addTodo(tod : Todo){
    // console.log('fjoir' , tod);
    this.todos.unshift(tod)
    this.todos2 = [...this.todos];

    const newhistory = new History(tod.id,tod.title , tod.desc , "New Task Added" , tod.status , tod.priority , tod.createdAt , tod.updateAt)
    this.historyArray.push( newhistory )

    this.sortMethods()


    //add in local storage
    localStorage.setItem("localtodos" , JSON.stringify(this.todos) )
    localStorage.setItem("localtodos2" , JSON.stringify(this.todos2) )
    localStorage.setItem("localhistoryarray" , JSON.stringify(this.historyArray) )
    
  }

  changeState(tod : Todo){

    const index = this.todos.findIndex(t => t.id === tod.id);
    // console.log('ipfj' , index , tod);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...tod, updateAt: new Date() };
      this.todos2 = [...this.todos];
    }

    const newhistory = new History(tod.id,tod.title , tod.desc , "Task Status Updated" , tod.status , tod.priority , tod.createdAt , tod.updateAt)
    this.historyArray.push( newhistory )

    // console.log(this.todos);
    // console.log(tod , "fnuo");

    this.sortMethods()
    

    //add in local storage
    localStorage.setItem("localtodos" , JSON.stringify(this.todos) )
    localStorage.setItem("localtodos2" , JSON.stringify(this.todos2) )
    localStorage.setItem("localhistoryarray" , JSON.stringify(this.historyArray) )
    
  }

  sortMethods(){
    // console.log(this.sortBy , "468");
    if(this.sortBy==='1'){
      this.todos = [...this.todos2]
    }
    else if(this.sortBy==='2'){
      //completed
      this.todos = this.todos2.filter((to)=> to.status==="Completed")
    }
    else if(this.sortBy==='3'){
      //todo
      this.todos = this.todos2.filter((to)=> to.status==="To-do")
    }
    else if(this.sortBy==='4'){
      this.todos = this.todos2.filter((to)=> to.status==="In-Progress")
    }
    else if(this.sortBy==='5'){
      //priority
      this.todos = [...this.todos2]
      this.todos.sort((a, b) => parseInt(a.priority) - parseInt(b.priority) );
    }
    
  }

  downloadCSV(){
    const options = {
      noDownload: false,
      headers: ["id","Title", "Description", "Status" ,  "Priority" , "Created At" , "Updated At"]
    };
    new ngxCsv(this.todos2, 'All Tasks'  , options);
  }

}
