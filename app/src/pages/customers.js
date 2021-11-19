import React, {useState, useEffect } from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';

function Customers() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalRemove, setModalRemove] = useState(false);
    const [modalInsert, setModalInsert] = useState(false);

    useEffect(() => {
        fetch("https://caldar2021-api.herokuapp.com/customers")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result.customers);
            },
            (error) => {
              setIsLoaded(false);
              setError(error);
            }
          )
    }, [])

    const [selectedCustomer, setSelectedCustomer] = useState({
        customerId: '',
        dni: '',
        surname: 0,
        name: 0,
        dateOfBirth: '',
        created_at: ''
    });

    const selectCustomer = (element, action) => {
        setSelectedCustomer(element);
        (action === 'edit') ? setModalEdit(true) : setModalRemove(true)
    }
    
    const handleChange = e => {
        const {name, value} = e.target;
        setSelectedCustomer((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const edit = () => {
        let newData = items;
        newData.map(element => {
          if (element._id === selectedCustomer._id) {
            element.dni = selectedCustomer.dni;
            element.name = selectedCustomer.name;
            element.surname = selectedCustomer.surname;
            element.dateOfBirth = new Date(selectedCustomer.dateOfBirth);
            element.created_at = new Date(selectedCustomer.created_at);
            element.customerId = selectedCustomer.customerId;
          }
        });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        };
        // fetch('https://reqres.in/api/posts', requestOptions)
        //     .then(response => response.json())
        //     .then(data => setPostId(data.id));
        
        setItems(newData);
        setModalEdit(false);
        setIsLoaded(true);
    }
    
    const remove = () => {
        setItems(items.filter(element => element.customerId !== selectedCustomer.customerId));
        setModalRemove(false);
    }
    
    const openModalInsert = () => {
        setSelectedCustomer(null);
        setModalInsert(true);
    }
    
const insert = () => {
    var insertData = selectedCustomer;
    insertData.customerId = items[items.length-1].id + 1;
    var newData = items.boilers;
    newData.push(insertData);
    setItems(newData);
    setModalInsert(false);
}

if (error) {
    return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
    return <div>Loading...</div>;
} else {
    return (
        <div className="customers">
          
         <h1>Clientes</h1>
         <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>DNI</th>
                <th>Apellido</th>
                <th>Nombre</th>
                <th>Fecha de Nacimiento</th>
                <th>Fecha de Alta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items?.map(element=>(
                <tr>
                  <td>{element.customerId}</td>
                  <td>{element.dni}</td>
                  <td>{element.surname}</td>
                  <td>{element.name}</td>
                  <td>{element.dateOfBirth}</td>
                  <td>{element.created_at}</td>
                  <td>
                      <button className="btn btn-primary" onClick={()=>selectCustomer(element, 'edit')}>Editar</button> {"   "} 
                      <button className="btn btn-danger" onClick={()=>selectCustomer(element, 'remove')}>Eliminar</button>
                   </td>
                </tr>
              ))
              }
            </tbody>
          </table>
    
    
          <Modal isOpen={modalEdit}>
            <ModalHeader>
              <div>
                <h3>Editar Cliente</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Customer ID</label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  name="customerId"
                  value={selectedCustomer && selectedCustomer.customerId}
                />
                <br />
    
                <label>DNI</label>
                <input
                  className="form-control"
                  type="text"
                  name="dni"
                  value={selectedCustomer && selectedCustomer.dni}
                  onChange={handleChange}
                />
                <br />
    
                <label>Apellido</label>
                <input
                  className="form-control"
                  type="text"
                  name="surname"
                  value={selectedCustomer && selectedCustomer.surname}
                  onChange={handleChange}
                />
                <br />

                <label>Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={selectedCustomer && selectedCustomer.name}
                  onChange={handleChange}
                />
                <br />

                <label>Fecha de Nacimiento</label>
                <input
                  className="form-control"
                  type="date"
                  name="dateOfBirth"
                  value={selectedCustomer && new Date(selectedCustomer.dateOfBirth)}
                  onChange={handleChange}
                />
                <br />

                <label>Fecha de Alta</label>
                  <DateTimePicker
                    onChange={handleChange}
                    value={selectedCustomer && new Date(selectedCustomer.created_at)}
                  />

                {/* <input
                  className="form-control"
                  type="date"
                  name="created_at"
                  readOnly
                  value={selectedCustomer && new Date(selectedCustomer.created_at)}
                  onChange={handleChange}
                /> */}
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={()=>edit()}>
                Actualizar
              </button>
              <button
                className="btn btn-danger"
                onClick={()=>setModalEdit(false)}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
    
    
          <Modal isOpen={modalRemove}>
            <ModalBody>
              ¿Estás Seguro que deseas eliminar la cliente {selectedCustomer && selectedCustomer.dni}?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>remove()}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={()=>setModalRemove(false)}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
    
    
            <Modal isOpen={modalInsert}>
            <ModalHeader>
              <div>
                <h3>Agregar nuevo cliente</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Customer ID</label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  name="customerId"
                  value={selectedCustomer ? selectedCustomer.selectCustomer: ''}
                />
                <br />
    
                <label>DNI</label>
                <input
                  className="form-control"
                  type="text"
                  name="dni"
                  value={selectedCustomer ? selectedCustomer.dni: ''}
                  onChange={handleChange}
                />
                <br />
    
                <label>Apellido</label>
                <input
                  className="form-control"
                  type="text"
                  name="surname"
                  value={selectedCustomer ? selectedCustomer.surname: ''}
                  onChange={handleChange}
                />
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary"
              onClick={()=>insert()}>
                Agregar
              </button>
              <button
                className="btn btn-danger"
                onClick={()=>setModalInsert(false)}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      );
  }
}

export default Customers;