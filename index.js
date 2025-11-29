var booknameInput = document.getElementById('bookmarkName')
var bookurlInput = document.getElementById('bookmarkUrl')

var bookArray = []

if(localStorage.getItem('bookscontainer')==null){
    bookArray = []
}
else{
    bookArray = JSON.parse(localStorage.getItem('bookscontainer'))
    displaydata()
}


function addbook(){

    if(booknameInput.value=="" || bookurlInput.value == ""){
       window.alert("Site Name or Url is not valid")
        return;
    }

    if(validationname() && validationurl()){
           
               var book = {
        name:booknameInput.value,
        url:bookurlInput.value
    }

    console.log(book);

    bookArray.push(book)
    console.log(bookArray)
    localStorage.setItem('bookscontainer',JSON.stringify(bookArray))
    clearform()
    displaydata()
    }
    else{
        window.alert(`Site Name or Url is not valid, Please follow the rules below :
            
1- Site name must contain at least 3 characters
2- Site URL must be a valid one`)
    }


    }
    
    




function clearform(){
    booknameInput.value = null
    bookurlInput.value = null
}

function displaydata(){
    var cartona = ``
    for(var i=0; i<bookArray.length; i++){
        cartona+=`               <tr>
                                   <td>${i+1}</td>
                    <td>${bookArray[i].name}</td>
                    <td>
                        <button onclick="visitbook('${bookArray[i].url}')" target="_blank" class="btn btn-success pe-2" id="visitbtn">
                            <i class="fa-solid fa-eye pe-2"></i>
                            Visit
                        </button>
                    </td>
                    <td>
                         <button onclick="deletebook(${i})" class="btn btn-danger pe-2" id="deletebtn">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete
                        </button>
                    </td>
                    </tr>  `
    }
    document.getElementById('tablecontent').innerHTML=cartona
}

function deletebook(index){
    bookArray.splice(index,1)
    localStorage.setItem('bookscontainer',JSON.stringify(bookArray))
    displaydata()
}

function visitbook(url){
    window.open(url,"_blank")
}

var regexforUrl = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\S*)?$/;

function validationurl(){

    var term = bookurlInput.value

    if(regexforUrl.test(term)){
        bookurlInput.classList.add('is-valid')
        bookurlInput.classList.remove('is-invalid') 
        return true;
    }
    else{
       bookurlInput.classList.add('is-invalid')
       bookurlInput.classList.remove('is-valid')
       return false;
    }
  
}

var regexforName = /^[a-zA-Z0-9]{3,}/

function validationname(){
    var term = booknameInput.value

    if(regexforName.test(term)){
        booknameInput.classList.add('is-valid')
        booknameInput.classList.remove('is-invalid')
        return true;
    }
    else{
        booknameInput.classList.add('is-invalid')
        booknameInput.classList.remove('is-valid')
        return false;
    }
}