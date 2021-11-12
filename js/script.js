const addButton = document.querySelector('.add');
const resetButton = document.querySelector('.reset');
const showButton = document.querySelector('.show');
const removeButton = document.querySelector('.remove');
const closeButton = document.querySelector('.close');
const filterButton = document.querySelector('.filter');

const addInputButton = document.querySelector('.add-input');
const addressInput = document.querySelector('.address-input');
//const addressTag = document.querySelector('.address-tag');
const one = document.getElementsByClassName('one');

const selectID = document.getElementById('selectID');
const form = document.querySelector('form');
const tbody = document.querySelector('.tbody');
const modalTable = document.querySelector('.modal-table');

const insertTh = document.getElementsByClassName('insertTh');
const inGet = document.getElementsByClassName('inGet');

const closeModalWindow = () => {
    modalTable.style.display = 'none';
    getDataFromDB();
  };
  
  const openModalWindow = () => {
    modalTable.style.display = 'flex';
  };
  
  closeButton.addEventListener('click', closeModalWindow);
  
  resetButton.addEventListener('click', () => {
    form.reset();
  });

  const db = openDatabase('computers','0.1', 'DB of computers',  200000);

 let computers = [];

  const createDataBase = () => {
      if(!db){
          alert('creation db priblem!!!');
      }

      db.transaction(function(tx){
          tx.executeSql('create table if not exists computersTable (id integer primary key autoincrement, name varchar(20), dat date, type varchar(20), address varchar(20))',
          );
      });
      getDataFromDB();
  };

  const getDataFromDB = () => {
      
    db.transaction(function (tx) {
      tx.executeSql(
        'select * from computersTable',
        [],
        function (tx, results) {
          var len = results.rows.length,
            i;
          tbody.innerHTML = '';
          selectID.innerHTML = '';
          computers = [];
  
          for (i = 0; i < len; i++) {
              
            computers.push(results.rows.item(i));
            selectID.innerHTML += `<option value=${results.rows.item(i).id}>${
              results.rows.item(i).id
            }</option>`;
            tbody.innerHTML += `
                <tr class='inGet'>
                    <td>${results.rows.item(i).id}</td>
                    <td>${results.rows.item(i).name}</td>
                    <td>${results.rows.item(i).dat}</td>
                    <td id="inCell">${results.rows.item(i).type}</td>
                    </tr>`;
                   /* const newCell = document.querySelectorAll('#inCell')[0];
                    if(results.rows.item(i).address !== undefined){
                      newCell.insertAdjacentHTML('afterend', `<td>${results.rows.item(i).address}</td>`);
                    }*/
          }
        },
        null,
      );
     // console.log("getData"+`${results.rows.length}`);
      console.log("end of func getData");
    });
  };
  
  const getDataFromDBWithAddress = () => {
      
    db.transaction(function (tx) {
      tx.executeSql(
        'select * from computersTable',
        [],
        function (tx, results) {
          var len = results.rows.length,
            i;
          tbody.innerHTML = '';
          selectID.innerHTML = '';
          computers = [];
  
          for (i = 0; i < len; i++) {
              
            computers.push(results.rows.item(i));
            selectID.innerHTML += `<option value=${results.rows.item(i).id}>${
              results.rows.item(i).id
            }</option>`;
            tbody.innerHTML += `
                <tr class='inGet'>
                    <td>${results.rows.item(i).id}</td>
                    <td>${results.rows.item(i).name}</td>
                    <td>${results.rows.item(i).dat}</td>
                    <td>${results.rows.item(i).type}</td>
                    <td>${results.rows.item(i).address}</td>
                </tr>`;
          }
        },
        null,
      );
     // console.log("getData"+`${results.rows.length}`);
      console.log("end of func getData");
    });
  };

const addItemToDB = (item, flag) => {
    console.log("add item funct");
    db.transaction(function (tx) {
      tx.executeSql(
        'insert into computersTable (name, dat, type, address) values (?, ?, ?, ?)',
        [item.name, item.dat, item.type, item.address],
        
      );
      console.log("inner space of add");
    });
    if(flag==1){
      console.log("inf without address");
        getDataFromDB();
    }
    else{
      console.log("inf with address");
      getDataFromDBWithAddress();
    }
  
  };

  const deleteItemFromDB = (id) => {
    console.log(id);
    db.transaction(function (tx) {
      tx.executeSql(`delete from computersTable where id = ${id}`, []);
    });
    getDataFromDB();
  };
  
  createDataBase();

  addButton.addEventListener('click', (e) => {
    e.preventDefault();
  
    const nameC = document.querySelector('.computer-name').value;
    const deliveryDate = document.querySelector('#delivery-date').value;
    const deliveryType = document.querySelector('#delivery-type').value;
    const address = document.querySelector('.address-input').value;
    const newComp = new Computer(nameC, deliveryDate, deliveryType);
   
    if (address) {
      newComp.setAddress(address);
      newComp.insertAddress(address);
      addItemToDB(newComp.getObjectComp(), flag=2);
    }
    else{
      addItemToDB(newComp.getObjectComp(), flag=1);
    }
    form.reset();
   // addressInput.style.display = 'none';
  });

  addInputButton.addEventListener('click', () => {
    addressInput.style.display = 'flex';
  });

  removeButton.addEventListener('click', () => {
    const removeByID = document.getElementById('selectID').value;
    console.log(removeByID);
    deleteItemFromDB(removeByID);
    if (computers.length === 1) {
      selectID.innerHTML = '';
      tbody.innerHTML = '';
    }
  });
  
  showButton.addEventListener('click', openModalWindow);
  
  filterButton.addEventListener('click', () => {
    const filterComputers = computers.filter((computer) => computer.type == "pickup");
    tbody.innerHTML = '';
    for (let i = 0; i < filterComputers.length; i++) {
      tbody.innerHTML += `
          <tr>
              <td>${filterComputers[i].id}</td>
              <td>${filterComputers[i].name}</td>
              <td>${filterComputers[i].dat}</td>
              <td>${filterComputers[i].type}</td>
          </tr>`;
    }
    openModalWindow();
  });
  
 
  