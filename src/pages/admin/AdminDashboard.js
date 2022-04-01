import React from 'react';
import {Link} from 'react-router-dom';


function AdminDashboard(){
    return (
        <div className="container">
           <Link to="/admin/user/list">User List</Link><br/>
           <Link to="/admin/book/list">Book List</Link><br/>
           <Link to="/admin/loan/list">Book Loan List</Link><br/>
         
        </div>);
}
export default AdminDashboard;