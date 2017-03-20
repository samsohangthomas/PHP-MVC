<?php

namespace App\Core\Database;
use PDO;

class QueryBuilder
{
	protected $pdo;
	
	public function __construct($pdo)
	{
		$this->pdo = $pdo;
	}

	/**
	* Auth Check
	*/

	public function authenticate($table,$email,$password){
		$email=$email;
		$password=md5($password);
		$statement = $this->pdo->prepare('select * from '.$table.' where email="'.$email.'" and password="'.$password.'"');
		$statement->execute();
		$res = $statement->fetchAll(PDO::FETCH_CLASS);
		return $res;
	}

	/**
	 * selects all the records from the given table
	 */
	public function raw($query)
	{
		$statement = $this->pdo->prepare($query);
		$statement->execute();
		return $statement->fetchAll(PDO::FETCH_CLASS);
	}
	public function rawTrue($query)
	{
		$statement = $this->pdo->prepare($query);
		$statement->execute();
		return true;
	}
	/**
	 * selects all the records from the given table
	 */
	public function find($table,$id)
	{
		$statement = $this->pdo->prepare("select * from {$table} where id={$id}");
		$statement->execute();
		return $statement->fetchAll(PDO::FETCH_CLASS);
	}


	/**
	 * selects all the records from the given table
	 */
	public function all($table)
	{
		//var_dump($table);
		$statement = $this->pdo->prepare("select * from {$table}");
		$statement->execute();
		return $statement->fetchAll(PDO::FETCH_CLASS);
		//var_dump($statement->fetchAll(PDO::FETCH_OBJ));
		//var_dump($statement->fetchAll(PDO::FETCH_CLASS, 'className'));
	}

	/**
	 * dynamic inserts into the tables
	 */
	public function insert($table, array $data)
	{
		$sql = sprintf('insert into %s (%s) values (%s)',
				$table,
				implode(', ', array_keys($data)),
				':'.implode(', :', array_keys($data))
			);

		 // dd($sql);
		try {

			$statement = $this->pdo->prepare($sql);
			$statement->execute($data);

		} catch(Exception $e) {
			die('Something went wrong!');
		}
	}

	/**
	 * dynamic inserts into the tables
	 */
	public function insertGetId($table, array $data)
	{
		$sql = sprintf('insert into %s (%s) values (%s)',
				$table,
				implode(', ', array_keys($data)),
				':'.implode(', :', array_keys($data))
			);

		 // dd($sql);
		try {

			$statement = $this->pdo->prepare($sql);
			$statement->execute($data);
			$lastId = $this->pdo->lastInsertId();
			return $lastId;

		} catch(Exception $e) {
			die('Something went wrong!');
		}
	}


	/**
	 * dynamic update into the tables
	 */
	public function update($table, array $data,$id)
	{
       $dataArr=implode(':',array_keys($data));
       $dataArr=explode(':',$dataArr);
       // dd($dataArr);
       $sqldata=null;
       foreach($dataArr as $k=>$v){
       	$sqldata .= $v.' = :'.$v.' , ';
       }
       $sqldata=trim($sqldata);
       $sqldata=rtrim($sqldata,',');

		$sql = sprintf("update %s set %s  where id=%s",$table,$sqldata,$id);

		  // dd($sql);
		try {

			$statement = $this->pdo->prepare($sql);
			$statement->execute($data);

		} catch(Exception $e) {
			die('Something went wrong!');
		}
	}


/**
	 * selects all the records from the given table
	 */
	public function delete($table,$id)
	{
		try {
			$statement = $this->pdo->prepare("delete from {$table} where id={$id}");
			$statement->execute();
			return true;
		} catch(Exception $e) {
			return false;
		}

	}


/**
	 * activate user
	 */
	public function activateUser($table,$id)
	{
		try {
			$statement = $this->pdo->prepare("update {$table} set status=1 where id={$id}");
			$statement->execute();
			return true;
		} catch(Exception $e) {
			return false;
		}

	}


/**
	 * deactivate user
	 */
	public function deactivateUser($table,$id)
	{
		try {
			$statement = $this->pdo->prepare("update {$table} set status=0 where id={$id}");
			$statement->execute();
			return true;
		} catch(Exception $e) {
			return false;
		}

	}

/**
	 * deactivate user
	 */
	public function changePassword($table,$password,$id)
	{
		// dd($id);
		$sql="update {$table} set password='{$password}' where id={$id}";
		try {
			$statement = $this->pdo->prepare($sql);
			$statement->execute();
			return true;
		} catch(Exception $e) {
			return false;
		}

	}


	
}