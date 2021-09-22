import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
 class BestBooks extends Component {
    render() {
        return (
            <>
             <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>title</th>
      <th>description</th>
      <th>status</th>
      <th>email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{this.props.title}</td>
      <td>{this.props.description}</td>
      <td>{this.props.status}</td>
      <td>{this.props.email}</td>
      
    </tr>
    
  </tbody>
</Table>  
<button onClick={()=>{this.props.handleDelete(this.props.id)}}>Delete</button>
<button onClick={()=>{this.props.handleUpdate(this.props.id,this.props.title, this.props.description,this.props.status,this.props.email)}}>Update</button>
                
            </>
        )
    }
}

export default BestBooks
