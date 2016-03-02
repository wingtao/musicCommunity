<?php

include_once './Server.php';

class UserServer extends Server {

    public function __construct() {
        parent::__construct();
    }

    public function __destruct() {
        parent::__destruct();
    }

    public function run() {
        parent::run();
        if (!$this->openConnection()) {
            $this->_response = array(
                "success" => FALSE,
                "message" => "Can't open db connection"
            );
        }


        $type = $this->_request->type;
        if ($type === "USER_REGISTER") {
            $this->register();
        } else if ($type === "USER_LOGIN") {
            $this->login();
        }

        $this->closeConnection();
    }

    protected function register() {
        $sql = "insert into csuuser(company,id,password,address,cellphone,phone,email) values($1,$2,md5($3),$4,$5,$6,$7)";
        $result = pg_query_params($this->_connection, $sql, array(
            $this->_request->data->company,
            $this->_request->data->username,
            $this->_request->data->password,
            $this->_request->data->address,
            $this->_request->data->cellphone,
            $this->_request->data->phone,
            $this->_request->data->email
        ));
        if (!$result) {
            $this->_response = array(
                "success" => false,
                "message" => pg_last_error($this->_connection)
            );
            return;
        }
        pg_free_result($result);
        $this->_response = array(
            "success" => true,
            "message" => "ok"
        );
    }

    protected function login() {
        $sql = "select count(1) from csuuser where id=$1 and password = md5($2)";
        $result = pg_query_params($this->_connection, $sql, array(
            $this->_request->data->username,
            $this->_request->data->password
        ));


        if (!$result) {
            $this->_response = array(
                "success" => false,
                "message" => pg_last_error($this->_connection)
            );
            return;
        }

        $row = pg_fetch_row($result);

        if (intval($row[0]) == 1) {
            session_start();
            $_SESSION['username'] = $this->_request->data->username;
            $this->_response = array(
                "success" => true,
                "message" => "登录成功",
                "username" => $this->_request->data->username,
            );
            /**/
        } else {
            $this->_response = array(
                "success" => false,
                "message" => "用户名或密码错误！"
            );
        }

        pg_free_result($result);
    }

}

?>
