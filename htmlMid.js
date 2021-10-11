//button showandHide
document.getElementById('showForm').addEventListener("click",function(){
    if(showForm.innerHTML=="Hide Form Add New Student"){
        showForm.innerHTML="Show Form Add New Student";
    }
    else{
        showForm.innerHTML="Hide Form Add New Student";
    }
})

//select faculty and prody
let selection = {
    'Akademi Sekretari Manajemen Indonesia Klabat': ['Sekretari (D3)'],
    'Fakultas Ekonomi dan Bisnis': ['Akuntansi', 'Manajemen'],
    'Fakultas Filsafat': ['Ilmu Filsafat'],
    'Fakultas Ilmu Komputer': ['Informatika', 'Sistem Informasi'],
    'Fakultas Keguruan dan Ilmu Pendidikan': ['Pendidikan Agama', 'Pendidikan Bahasa Inggris', 'Pendidikan Ekonomi', 'Pendidikan Luar Sekolah'],
    'Fakultas Keperawatan': ['Keperawatan', 'Profesi Ners'],
    'Fakultas Pertanian': ['Agroteknologi'],
    'Pascasarjana': ['Magister Manajemen', 'Magister Teologi']
}
window.onload = function () {
    let faculty = document.getElementById('facultyForm');
    let program = document.getElementById('studyForm');
    for (let x in selection) {
        faculty.options[faculty.options.length] = new Option(x, x);
    }
faculty.onchange = function () {
        program.length = 1;
        let z = selection[this.value];
        for (let i = 0; i < z.length; i++) {
            program.options[program.options.length] = new Option(z[i], z[i])
        }
    }
}


//Data Students display Table
var data_Student = [
	{
		nim: 1050220100039,
		fullName: 'Ariana Grande',
		gender: 'Female',
		fakultas: 'Fakultas Ilmu Komputer',
		prodi: 'Informatika'
	},
	{
		nim: 1030218100040,
		fullName: 'Nicolas Cage',
		gender: 'Male',
		fakultas: 'Fakultas Ilmu Komputer',
		prodi: 'Sistem Informasi'
	},
	{
		nim: 1050218100041,
		fullName: 'Tom Cruise',
		gender: 'Male',
		fakultas: 'Fakultas Ekonomi dan Bisnis',
		prodi: 'Akuntansi'
	}
]

//Add Data Student
const addForm = document.querySelector("#addBttn");

addForm.addEventListener('click', () => {
    let addNim = document.querySelector("#NIM").value;
    let addName = document.querySelector("#fullName").value;
    let addGender = document.querySelector('input#Male').checked;
    let addGenderF = document.querySelector('input#Female').checked;
    let addFaculty = document.querySelector("#facultyForm").options[document.querySelector("#facultyForm").selectedIndex].value;
    let addProdi = document.querySelector("#studyForm").options[document.querySelector("#studyForm").selectedIndex].value;;

    //validation data
    //validaton NIM
    if (/^\d+$/.test(addNim) != true) {
        alert("Invalid Student NIM");
        return;
    }
   //validaton Name
    if (/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(addName) != true) {
        alert("Invalid Student Name");
        return;
    }
    //validation Gender
    if(addGender =='' && addGenderF == ''){
        alert("Invalid Gender");
        return;
    }
    if (addGender == true) {
        addGender = 'Male';
    } 
    if (addGenderF==true){
        addGender = 'Female';
    }
    //validation faculty
    if (addFaculty == '') {
        alert("Invalid Faculty");
        return;
    }
    //validation Prodi
    if (addProdi == '') {
        alert("Invalid Program Study");
        return;
    }
    //validate if there is the same nim
    if (data_Student.map((s) => s.nim).includes(addNim) == true) {
        alert(`Duplicate NIM Detected!`);
        return;
    }
    //new student data will be pushed
    data_Student.push({
        nim: addNim,
        fullName: addName,
        gender: addGender,
        fakultas: addFaculty,
        prodi: addProdi,
    });
    alert(`${addName} added.`);
    update_list_data();
    document.querySelector("form").reset();
});

//display all students
const listStudent = document.querySelector("#students");
function update_list_data() {
    listStudent.innerHTML = "";
    for (student of data_Student) {
        let tr = document.createElement("tr");
        for (key in student) {
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(student[key]));
            td.className=[key];
            tr.appendChild(td);
        }

        //action, and #delete, 
        let symbol_Delete = document.createElement("td");
        let delete_icon = `<button onclick="deleteData(this)" type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>`
        symbol_Delete.innerHTML = delete_icon;
        tr.appendChild(symbol_Delete);
        listStudent.appendChild(tr);
    }
}
update_list_data();


//delete data student
function deleteData(btn) {
    var rowData = btn.closest('tr').rowIndex - 1;
    const delete_data = confirm("Are You Sure To Delete Data?");
    if (delete_data == true) {
        data_Student.splice(rowData, 1);
    }
    update_list_data();
}


//filter Search Data by faculty and prody
function FilterByFaculty() {
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById('faculties');
    filter = input.value.toUpperCase();
    table = document.getElementById("students");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByClassName("fakultas")[0];
        if (td) {
            txtValue = td.textContent || td.innerText || td.value;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "0") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function FilterByStudy() {
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById('prodyy');
    filter = input.value.toUpperCase();
    table = document.getElementById("students");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByClassName("prodi")[0];
        if (td) {
            txtValue = td.textContent || td.innerText || td.value;
            if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "0") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

var form_Student = document.getElementById("form-student");
function filtForm(event) {
    event.preventDefault();
}
form_Student.addEventListener('submit', filtForm);


//search Data by font
let searchData = document.querySelector("#searchName");
searchData.addEventListener("input", () => {
    if (searchData.length == 0) {
        update_list_data();
    } else {
        listStudent.innerHTML = "";

        //filter student by name
        let showStudents = data_Student.filter((s) => {
            return s.fullName.toLowerCase().includes(searchData.value.toLowerCase());
        });
        for (student of showStudents) {
            let tr = document.createElement("tr");
            for (key in student) {
                let td = document.createElement("td");
                td.appendChild( document.createTextNode(student[key]) );
                td.name_Class=[key];
                tr.appendChild(td);
            }
 
            //action #delete, 
            let symbol_Delete = document.createElement("td");
            let delete_icon = `<button onclick="deleteData(this)" type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>`
            symbol_Delete.innerHTML = delete_icon;
            tr.appendChild(symbol_Delete);
            listStudent.appendChild(tr);
        }
    }
});