import React from 'react';
import {Link} from 'react-router-dom';


function AdminDashboard(){
    return (
        <div className="container">
           <Link href="/admin/user/list">User List</Link><br/>
           <Link href="/admin/book/list">Book List</Link><br/>
           {/* <a href="#">Link</a><br/>
           <a href="#">Link</a> */}
        </div>);
}
export default AdminDashboard;