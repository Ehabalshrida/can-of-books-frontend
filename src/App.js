import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import axios from 'axios';
import BestBooks from './components/BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from './components/loginbutton';
import LogoutButton from './components/logoutbutton';
//import specialcontent from './components/specialcontent';
import { withAuth0 } from '@auth0/auth0-react';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[],
        title:"",
        description:"",
        status:"",
        email:"",
        id:"",
     showUpdate:false,
      showData: false,
    }
  }
  componentDidMount=()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`).then(response=>{
      this.setState({
        data:response.data,
        

        showData:true,
      })
    })
  }
  handleDelete=(id)=>{
    let config={
      method:"DELETE",
      baseURL:process.env.REACT_APP_BACKEND_URL,
      url:`/deleteBook/${id}`
    }
    axios(config).then(res=>{
      this.setState({
        data:res.data,
        showData:true,

      })
    })

  }
  handletitle=(e)=>{
    this.setState({title:e.target.value});
  }
  handledescription=(e)=>{
    this.setState({description:e.target.value});
  }
  handlestatus=(e)=>{
    this.setState({status:e.target.value});
  }
  handleemail=(e)=>{
    this.setState({email:e.target.value});
  }
  handleSubmit=async(e)=>{
    e.preventDefault();
    let newobj= {
      title:this.state.title,
        description:this.state.description,
        status:this.state.status,
        email:this.state.email
    }
    let config={
      method:"POST",
      baseURL:process.env.REACT_APP_BACKEND_URL,
      url:`/createBook`,
      data:newobj,
      
    }
    console.log(config);
    await axios(config).then(res=>{
      console.log(res.data)
      this.setState({
        data:res.data,
        
        showData:true,

      })

      

    }).catch(e=>{
      console.log(e)})
  }
  handleUpdate=(id,title,description,status,email)=>{
    this.setState({
      title:title,
      description:description,
      status:status,
      email:email,
      id:id,
      showUpdate:true
    })
  }
  handleUpdateForm=(e)=>{
    e.preventDefault();
    let config={
      method:"PUT",
      baseURL:process.env.REACT_APP_BACKEND_URL,
      url:`/update/${this.state.id}`,
      data:{
        title:this.state.title,
        description:this.state.description,
        status:this.state.status,
        email:this.state.email,
      }
    }
    axios(config).then(res=>{
      this.setState({
        data:res.data,
        showData:true,

      })
    });
  }


  







  render() {
    return (
      <>
           {this.props.auth0.isAuthenticated?<>
               <LogoutButton/>

      {
          !this.state.showUpdate?<>
          <form onSubmit={this.handleSubmit}>
          <input type="texts" placeholder="title" onChange={this.handletitle}/>
          <input type="texts" placeholder="description" onChange={this.handledescription}/>
          <input type="texts" placeholder="email" onChange={this.handleemail}/>
          <input type="texts" placeholder="status" onChange={this.handlestatus}/>
          <input type="submit" value="create"/>
        </form>
          </>:
          // Update form
        <form onSubmit={this.handleUpdateForm}>
        <input type="texts" placeholder="title" onChange={this.handletitle}/>
          <input type="texts" placeholder="description" onChange={this.handledescription}/>
          <input type="texts" placeholder="email" onChange={this.handleemail}/>
          <input type="texts" placeholder="status" onChange={this.handlestatus}/>
        <input type="submit" value="update"/>
      </form>   
        }

      
      
       <Header/>
{

this.state.showData&&this.state.data.map(item=>{
return <BestBooks title={item.title} description={item.description} status={item.status} email={item.email} id={item._id}
handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
})


}
<br/>

       <Footer/> </>:
       <LoginButton/>
  }
      </>
    )
  }
}

export default withAuth0 (App)