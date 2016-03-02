<?php

include_once './DBConfig.php';

class Server {

    protected $_connection = false;
    protected $_request = false;
    protected $_response = false;

    public function __construct() {
        $this->_response = array(
            "success" => false,
            "message" => "Unknown error",
            "username" => "Unknown"
        );
    }

    public function __destruct() {
        ;
    }

    public function setRequest($req) {
        $this->_request = $req;
    }

    public function getResponse() {
        return $this->_response;
    }

    public function run() {
        
    }

    public function openConnection() {
        global $HOST, $PORT, $DBNAME, $PASSWORD, $USER;
        $connstr = "host=" . $HOST
                . " port=" . $PORT
                . " dbname=" . $DBNAME
                . " user=" . $USER
                . " password=" . $PASSWORD;
        $this->_connection = pg_connect($connstr);
        return $this->_connection;
    }

    public function closeConnection() {
        if ($this->_connection) {
            pg_close($this->_connection);
        }
    }

}
?>

