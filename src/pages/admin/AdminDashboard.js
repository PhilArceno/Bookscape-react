import React from 'react';


function AdminDashboard(){
    return (
        <div className="container">
           <a href="/admin/user/list">User List</a><br/>
           <a href="/admin/book/list">Book List</a><br/>
           <a href="#">Link</a><br/>
           <a href="#">Link</a>
        </div>);
}
export default AdminDashboard;