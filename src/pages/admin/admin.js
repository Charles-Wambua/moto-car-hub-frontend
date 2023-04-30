import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./admin.css"
import { CreateProduct } from './CreateProduct';
import { RegisteredUsers } from '../auth/RegisteredUsers';

export const Admin = () => {
  const [activeForm, setActiveForm] = useState(null);

  const handleCreateClick = (event) => {
    event.preventDefault();
    setActiveForm("create");
  }

  const handleAddmoreClick = (event) => {
    event.preventDefault();
    setActiveForm("addmore");
  }
  

  let form;
  if (activeForm === "create") {
    form = <CreateProduct />;
  } else if (activeForm === "addmore") {
    form = <RegisteredUsers />;
  } else {
    form = <h3>Admin Panel</h3>;
  }

  return (
    <div className="maincontainer">
      <div className="sec1">
        <h1>Analytics</h1>
        <Link to="#" onClick={handleCreateClick}>Create Product</Link> <br/>
        <Link to="/users" onClick={handleAddmoreClick} >See Registered Users</Link>
      </div>
      <div className="sec2">
        {form}
      </div>
    </div>
  );
}
