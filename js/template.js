class Computer{
    constructor(name, dat, type){
        this.name = name;
        this.dat = dat;
        this.type = type;
        this.address = null;
    }
    setAddress = (address) => {
        this.address = address;
      };
    insertAddress = (address1) => {
       
     /* let row = document.getElementsByClassName('.insertTh')[0];
      let cell = document.createElement("th");
      cell.innerHTML = `address`;
  
      row.appendChild(cell);*/
    

       const thAddress = document.querySelectorAll('.insertTh')[0];
       thAddress.insertAdjacentHTML('beforeend', '<th>address</th>');
        //one.innerHTML = '<th>address</th>';

      //  $( ".insertTh th:nth-child(4)").after('<th>address</th>');
        
        /*let CrAddress = document.createElement('td');
        CrAddress.textContent = `${this.address}`;*/

        const tdInAddress = document.querySelectorAll('.inGet')[0];
        if(address1 !== null){
        tdInAddress.insertAdjacentHTML('beforeend', `<td>${address1}</td>`);
        }
/*
       let tdDataAddress = document.getElementsByClassName('inGet');
        if(tdDataAddress!=null){
  
       $( ".inGet td:nth-child(5)").after( `<td>${address1}</td>`);
        
        }*/
              
      };
    getObjectComp = () => ({
        name: this.name,
        dat: this.dat,
        type: this.type,
        address: this.address
      });
}