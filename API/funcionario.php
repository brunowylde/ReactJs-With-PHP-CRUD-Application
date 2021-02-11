<?php 
 // required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 $con = mysqli_connect("localhost","root","","api");
 
 $request_method = $_SERVER['REQUEST_METHOD'];
  switch($request_method){
    case 'GET':
		getUser();
	    break;
	case 'POST':
        insertUser();
        break;
    case 'PUT':
        updateUser();
        break;
    case 'DELETE':
        deleteUser();
        break;
	case 'OPTIONS':
        //deleteEmployee();
        break;
    default:
        header('HTTP/1.0 405 Method Not Allowed');
        break;
  }
  
  function getUser(){
	  global $con;
	  if($con){
			$sql = "SELECT * FROM funcionario";
			$data = mysqli_query($con,$sql);
			$rows=array();
			while($r=mysqli_fetch_assoc($data)){
		  $rows[]=$r;
		  }
		  echo json_encode($rows,JSON_PRETTY_PRINT);
		 }
  }
 function insertUser(){
    $user = json_decode(file_get_contents("php://input"));
    if(isset($user)){
		 global $con;
		$nome = $user->Nome;
		$sobrenome = $user->Sobrenome;
		$cargo = $user->Cargo;
		$data_nasc = $user->Data_nasc;
		$salario = $user->Salario;
		if(!empty($nome) && !empty($sobrenome) && !empty($data_nasc)){
        $query  ="INSERT INTO funcionario (nome, sobrenome, cargo, data_nasc, salario) VALUES('$nome','$sobrenome','$cargo','$data_nasc',$salario)";
        if(mysqli_query($con, $query) or die(mysqli_error($con)) )
        {
            $response=array(
                'status' => 201,
                'status_message' =>'Funcionario adicionado!.',
				'status_nome' => $nome
            );
        }else
        {
            $response=array(
                'status' => 400,
                'status_message' =>'Falha ao adicionar funcionario.'
            );
        }
    }
    else
    {
        $response=array(
            'status' => 400,
            'status_message' =>'Request Body Empty.'
        );
    }
}
    header('Content-Type: application/json');
    echo json_encode($response);
 }
 function deleteUser(){
	  $user = $_GET['id'];
	 if(isset($user)){
		 global $con;
		$id = $user;
	 $sql=mysqli_query($con,"DELETE  FROM funcionario WHERE id='$id' ") or die(mysqli_error($con));
  if($sql){
		$response=array(
            'status' =>202 ,
            'status_message' =>'Funcionario deletado.',
			'status_id' => $id
        );
  }else{
	  $response=array(
            'status' =>204 ,
            'status_message' =>'error'
        );
  }
	 }
   header('Content-Type: application/json');
    echo json_encode($response);
 }
 function updateUser(){
    $user = json_decode(file_get_contents("php://input"));
    if(isset($user)){
		 global $con;
		$nome = $user->Nome;
		$sobrenome = $user->Sobrenome;
		$cargo = $user->Cargo;
		$data_nasc = $user->Data_nasc;
		$salario = $user->Salario;
		$id = $user->Id;

		if(!empty($nome) && !empty($sobrenome) && !empty($data_nasc)){
        $query  = " UPDATE funcionario SET nome='$nome',sobrenome='$sobrenome',cargo='$cargo',data_nasc='$data_nasc',salario=$salario WHERE id=$id";
        if(mysqli_query($con, $query) or die(mysqli_error($con)) )
        {
            $response=array(
                'status' => 201,
                'status_message' =>'Funcionario atualizado!',
				'status_nome' => $nome
            );
        }else
        {
            $response=array(
                'status' => 400,
                'status_message' =>'Falha ao atualizar funcionario.'
            );
        }
    }
    else
    {
        $response=array(
            'status' => 400,
            'status_message' =>'Request Body Empty.'
        );
    }
}
    header('Content-Type: application/json');
    echo json_encode($response);
} 
 
 
 
 
 ?>