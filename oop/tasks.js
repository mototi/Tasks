class Task {
    name;
    periority;

    pending = true;

    edit_mode = false ;

    constructor( name , periority ){
        this.name = name;
        this.periority = periority;
    }

    Is_Valid = () => {

        if(!isNaN(this.name) || this.name == "") return false;
        if(isNaN(Number(this.periority))) return false;
        if(this.periority > 3 || this.periority < 1) return false;

        return true;
    }

    Change_status = () => {
        if(this.pending){this.pending = false;} 
        else{this.pending = true ;}
    }
}

let array = [];

const Add_Task = () => {
    let name = document.getElementById('task_name').value;
    let periority = document.getElementById('task_periority').value;
    let task = new Task( name , periority);

    if(!task.Is_Valid()) {
        alert(` invalid data inputs `); 
        return;
    }

    let x =  find_index(task.periority);
    array.splice(x,0,task);

    table_render();

    document.getElementById('task_name').value = "" ;
    document.getElementById('task_periority').value = "";
}



const get_Row = (task , i) => {
    return `
        <tr id="row_${i}">
            <td>${i+1}</td>
            <td>${task.name}</td>
            <td>${task.periority}</td>
            <td>
                <button onclick="Remove_Task(${i})"> Done </button>
                <button onclick="Edit_Task(${i})"> Edit </button>
            </td>
            <td>
                <button onclick="change_pending(${i})" id="bt_${i}">
                on it</button>
            </td>
        </tr>`
} 

const find_index = (periority) => {
    if(array.length == 0 ) return 0 ;

    for( let i = 0 ; i < array.length ; i++){
        if(array[i].periority > periority) return i ;
        else if ((array[i].periority == periority)) return i+1;
    }

    return array.length ; 
}


const table_render = () => {
    document.getElementById('tbody').innerHTML="";
    for(let i = 0 ; i < array.length ; i++){
        if(array[i].edit_mode){ 
            let y = get_edited_row(i);
            document.getElementById('tbody').innerHTML += y ;
            continue;
        }
        let x = get_Row(array[i] , i);
        document.getElementById('tbody').innerHTML += x ;
    }
}

const Remove_Task = (i) => {
    array.splice(i,1);
    table_render();
}


const Edit_Task = (i) => {
    array[i].edit_mode = true;
    table_render();
}

const get_edited_row = (i) => {
    return `
    <tr id="row_${i}">
        <td>${i+1}</td>
        <td>
            <input type="text" id="taskN${i}" value = "${array[i].name}">
        </td>
        <td>
            <input type="number" id="taskP${i}" value = "${array[i].periority}">
        </td>
        <td>
            <button onclick="save(${i})"> Save </button>
            <button onclick="cancel(${i})"> Cancel </button>
        </td>
        <td> 
            <button onclick="change_pending(${i})" id="bt_${i}">
            on it</button>
        </td>
    </tr>`
};

const save = (i) => {
    let n = document.getElementById(`taskN${i}`).value;
    let p = document.getElementById(`taskP${i}`).value;
    let temp = new Task(n,p);
    if(!temp.Is_Valid()){
        alert(` invalid data inputs `); 
        return;
    }
    array[i].name = n ;
    array[i].periority = p ;
    array[i].edit_mode = false ;

    array.sort( ( a , b ) => {
        return a.periority - b.periority
       })

    table_render();
}

const cancel = (i) => {
    array[i].edit_mode = false;
    table_render();
}



const change_pending = (i) => {
    array[i].Change_status();
    if(!array[i].pending){
        document.getElementById(`bt_${i}`).innerText = "move to pendding"
    }
    else{
        document.getElementById(`bt_${i}`).innerText = "on it"
    }  
}
