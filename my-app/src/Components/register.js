import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'
import Header from './Header';
export default class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Nome:'',
            Sobrenome :'',
            Cargo:'',
            Salario:'',
            Data_nasc:'',
            errors: {}
        }
           
        this.handleSubmit = this.handleSubmit.bind(this)
    }
   
  
  handleSubmit(event) {
      event.preventDefault();
      if(this.handleValidation()){
        var nome = this.state.Nome;
        var sobrenome =  this.state.Sobrenome;
        var data_nasc = this.state.Data_nasc;
        var salario = this.state.Salario;
        var cargo = this.state.Cargo;
        var url = 'http://localhost/ReactJs-With-PHP-CRUD-Application/API/funcionario.php';
        var data = {Nome: nome, Sobrenome:sobrenome,Salario:salario,Data_nasc:data_nasc,Cargo:cargo};
        fetch(url, {
          method: 'POST', 
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json',
          }
        }).then(res => res.json())
        .then(response => {
          debugger
            alert("Registrado com sucesso!");
            this.props.history.push(`/users`)
        })
        .catch(error => alert('Error:' +  error));
      }
    }

  handleValidation(){
    let fields = this.state;
    let formIsValid = true;
    return formIsValid;
  }

  handleChange(field, e){  
    let fields = this.state;
    fields[field] = e.target.value; 
    if(this.handleValidation(field, e)){
        this.setState({fields})
        }           
    }

    render() {
         return(
          <Fragment>
          <Header></Header>   
        <div className="container">
            <div className="card col-md-8 offset-md-2 my-5 shadow ">
            <div className="card-body">
            <form onSubmit= {this.handleSubmit.bind(this)} method="POST">
            <div className="form-group">
    <label>Nome</label>
    <input type="text" className="form-control" onChange={this.handleChange.bind(this, "Nome")} name="Nome" placeholder="Nome"/>
  </div>
  <div className="form-group">
    <label>Sobrenome</label>
    <input type="text" className="form-control" onChange={this.handleChange.bind(this, "Sobrenome")} name="Sobrenome" placeholder="Sobrenome"/>
  </div>
  <div className="form-group">
    <label>Data de Nascimento</label>
    <input type="date" className="form-control" onChange={this.handleChange.bind(this, "Data_nasc")} name="Data_nasc"/>
  </div>
  <div className="form-group">
    <label>Cargo</label>
    <input type="text" className="form-control" onChange={this.handleChange.bind(this, "Cargo")} name="Cargo" placeholder="Cargo"/>
  </div>
  <div className="form-group">
    <label>Salário</label>
    <input type="text" className="form-control" name="Salario" onChange={this.handleChange.bind(this, "Salario")} placeholder="Salario"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Cadastrar</button>
</form>
            </div>
            </div>
        </div>
        </Fragment>
		);
    }
}




                           
