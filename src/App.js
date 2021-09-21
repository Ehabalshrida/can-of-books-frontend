import React, { Component } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import axios from 'axios';
import BestBooks from './components/BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[],
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







  render() {
    return (
      <>
       <Header/>
{

this.state.showData&&this.state.data.map(item=>{
return <BestBooks title={item.title} description={item.description} status={item.status} email={item.email}/>
})


}


       <Footer/> 
      </>
    )
  }
}

export default App