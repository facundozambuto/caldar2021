import React, {useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalRemove, setModalRemove] = useState(false);
    const [modalInsert, setModalInsert] = useState(false);

    useEffect(() => {
        fetch("https://caldar2021-api.herokuapp.com/boilers")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result.boilers);
            },
            (error) => {
              setIsLoaded(false);
              setError(error);
            }
          )
    }, [])

    const [selectedBoiler, setSelectedBoiler] = useState({
        boilerId: '',
        brand: '',
        capacity: 0,
        temperature: 0,
        madeDate: '',
        created_at: ''
    });

    const selectBoiler  = (element, action) => {
        setSelectedBoiler(element);
        (action === 'edit') ? setModalEdit(true) : setModalRemove(true)
    }
    
    const handleChange = e => {
        const {name, value} = e.target;
        setSelectedBoiler((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const edit = () => {
        let newData = items;
        newData.map(element => {
          if (element._id === selectedBoiler._id) {
            element.brand = selectedBoiler.brand;
            element.temperature = parseFloat(selectedBoiler.temperature);
            element.capacity = parseFloat(selectedBoiler.capacity);
            element.madeDate = selectedBoiler.madeDate;
            element.created_at = selectedBoiler.created_at;
            element.boilerId = selectedBoiler.boilerId;
          }
        });
        setItems(newData);
        setModalEdit(false);
        setIsLoaded(true);
    }
    
    const remove = () => {
        setItems(items.filter(element => element.boilerId !== selectedBoiler.boilerId));
        setModalRemove(false);
    }
    
    const openModalInsert = () => {
        setSelectedBoiler(null);
        setModalInsert(true);
    }
    
const insert = () => {
    var insertData = selectedBoiler;
    insertData.boilerId = items[items.length-1].id + 1;
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
        <div className="App">
         <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Capacidad</th>
                <th>Temperatura</th>
                <th>Fecha de Fabricación</th>
                <th>Fecha de Alta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items?.map(element=>(
                <tr>
                  <td>{element.boilerId}</td>
                  <td>{element.brand}</td>
                  <td>{element.capacity}</td>
                  <td>{element.temperature}</td>
                  <td>{element.madeDate}</td>
                  <td>{element.created_at}</td>
                  <td>
                      <button className="btn btn-primary" onClick={()=>selectBoiler(element, 'edit')}>Editar</button> {"   "} 
                      <button className="btn btn-danger" onClick={()=>selectBoiler(element, 'remove')}>Eliminar</button>
                   </td>
                </tr>
              ))
              }
            </tbody>
          </table>
    
    
          <Modal isOpen={modalEdit}>
            <ModalHeader>
              <div>
                <h3>Editar Caldera</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID</label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  name="boilerId"
                  value={selectedBoiler && selectedBoiler.boilerId}
                />
                <br />
    
                <label>Marca</label>
                <input
                  className="form-control"
                  type="text"
                  name="brand"
                  value={selectedBoiler && selectedBoiler.brand}
                  onChange={handleChange}
                />
                <br />
    
                <label>Capacidad</label>
                <input
                  className="form-control"
                  type="number"
                  name="capacity"
                  value={selectedBoiler && selectedBoiler.capacity}
                  onChange={handleChange}
                />
                <br />

                <label>Temperatura</label>
                <input
                  className="form-control"
                  type="number"
                  name="temperature"
                  value={selectedBoiler && selectedBoiler.temperature}
                  onChange={handleChange}
                />
                <br />

                <label>Fecha de Fabricación</label>
                <input
                  className="form-control"
                  type="text"
                  name="madeDate"
                  value={selectedBoiler && selectedBoiler.madeDate}
                  onChange={handleChange}
                />
                <br />

                <label>Fecha de Alta</label>
                <input
                  className="form-control"
                  type="text"
                  name="created_at"
                  readOnly
                  value={selectedBoiler && selectedBoiler.created_at}
                  onChange={handleChange}
                />
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
              ¿Estás Seguro que deseas eliminar la caldera {selectedBoiler && selectedBoiler.brand}?
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
                <h3>Agregar nueva caldera</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID</label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  name="boilerId"
                  value={selectedBoiler ? selectedBoiler.selectBoiler: ''}
                />
                <br />
    
                <label>Marca</label>
                <input
                  className="form-control"
                  type="text"
                  name="brand"
                  value={selectedBoiler ? selectedBoiler.brand: ''}
                  onChange={handleChange}
                />
                <br />
    
                <label>Capacidad</label>
                <input
                  className="form-control"
                  type="text"
                  name="capacity"
                  value={selectedBoiler ? selectedBoiler.capacity: ''}
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

export default App;
