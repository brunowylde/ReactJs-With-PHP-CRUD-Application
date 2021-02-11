import React from 'react';

export default class EditUser extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
          data:{
            nome:'',
            sobrenome:'',
            cargo:'',
            salario:'',
            data_nasc:'',
            id:''
          }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
  

   componentDidMount(){
       debugger
      const { match: { params } } = this.props;
       let url = 'http://localhost/ReactJs-With-PHP-CRUD-Application/API/funcionario.php';
        fetch(url)
         .then(response => response.json())
		  .then(data =>{ 
        debugger
            let edit = data.find(x =>x.id === params.userId);
            if(edit){
            this.setState({data:edit})
            }
  });
   } 
    handleSubmit(event) {
        event.preventDefault();
          debugger
          var id =this.state.data.id;
          var nome =this.state.data.Nome;
          var sobrenome =  this.state.data.Sobrenome;
          var cargo = this.state.data.Cargo;
          var salario = this.state.data.Salario;
          var data_nasc = this.state.data.Data_nasc;
          var url = 'http://localhost/ReactJs-With-PHP-CRUD-Application/API/funcionario.php';
          var data = {Id:id,Nome: nome, Sobrenome:sobrenome,Cargo:cargo,Salario:salario, 'Data_nasc': data_nasc};
          
          fetch(url, {
            method: 'PUT', 
            body: JSON.stringify(data),
          }).then(res => res.json())
          .then(response => {
              alert("Funcionario atualizado!");
              this.props.history.push(`/users`)
          })
          .catch(error => alert('Error:' +  error));
    }

    handleChange(field, e){  
      let fields = this.state.data;
      fields[field] = e.target.value;        
      this.setState({fields});
  }

    render() {
      debugger
      const a = this.state.data.nome;
        return (
            <div className="container">
            <div className="card col-md-8 offset-md-2 my-5 shadow ">
            <div className="card-body">
            <form onSubmit= {this.handleSubmit.bind(this)} method="POST">
            <div className="form-group">
    <label>Nome</label>
    <input type="text" className="form-control"  name="Nome" placeholder={this.state.data.nome} onChange={this.handleChange.bind(this, "Nome")}/>
  </div>
  <div className="form-group">
    <label>Sobrenome</label>
    <input type="text" className="form-control" name="Sobrenome" placeholder={this.state.data.sobrenome} onChange={this.handleChange.bind(this, "Sobrenome")}/>
  </div>
  <div className="form-group">
    <label>Cargo</label>
    <input type="text" className="form-control" name="Cargo" placeholder={this.state.data.cargo} onChange={this.handleChange.bind(this, "Cargo")}/>
  </div>
  <div className="form-group">
    <label>Data de Nascimento</label>
    <input type="date" className="form-control" name="Data_nasc" placeholder={this.state.data.data_nasc} onChange={this.handleChange.bind(this, "Data_nasc")}/>
  </div>
  <div className="form-group">
    <label>Salário</label>
    <input type="text" className="form-control" name="Salario" placeholder={this.state.data.salario} onChange={this.handleChange.bind(this, "Salario")}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Atualizar</button>
<a className="ml-4" onClick={()=>this.props.history.push('/users') }>Voltar</a>
</form>
            </div>
            </div>
        </div>      
            );

    }
}