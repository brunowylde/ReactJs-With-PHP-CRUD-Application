import React, {Fragment} from 'react';
import { Link,Redirect } from 'react-router-dom';
import Header from './Header';
export default class User extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: []
		}
  this.allUser = this.allUser.bind(this);
		
	}
	componentWillMount() {
		this.allUser()
	}

allUser(){
	fetch('http://localhost/ReactJs-With-PHP-CRUD-Application/API/funcionario.php')
		  .then(response => response.json())
		  .then(data =>{ 
			this.setState({ data:data })
		});
}

dalate(e){
	let url = `http://localhost/ReactJs-With-PHP-CRUD-Application/API/funcionario.php?id=${e}`;
	fetch(url, {
		method: 'DELETE', 
	}).then(res => res.json())
	.then(response => {
			alert("Funcionário deletado!");
			this.allUser();
	})
	.catch(error => alert('Error:' +  error));
}


	render() {
		const user =  this.state.data.map(item => {
			return(
				<tr key={item.id}>
					<td>{item.nome}</td>
					<td>{item.sobrenome}</td>
					<td>{item.data_nasc}</td>
					<td>{item.cargo}</td>
					<td>{item.salario}</td>
					<td>
						<Link className="btn btn-primary" to={`/users/${item.id}`}>Edit</Link>
						<button type="button" onClick={(e)=>this.dalate(item.id,e)} className="btn btn-danger ml-3">Delete</button>
					</td>
				</tr>
			)
			// 
		})
		return (
			<Fragment> 
				<Header></Header>
			<div className="container">
			  <div className="col my-5 shadow">
			  	<table className="table"> 
					  <tr>
						  <th>Nome</th>
						  <th>Sobrenome</th>
						  <th>Data Nasc</th>
						  <th>Cargo</th>
						  <th>Salario</th>
						  <th>Ação</th>
             </tr>
					 
					  <tbody>
						  {user}
					  </tbody>
				  </table>
			  </div>
			</div>
			</Fragment>
		);
	}
}

