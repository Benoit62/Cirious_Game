<?php 
if(!empty($_POST['pseudo']) || !empty($_POST['mail'])) {
    include("configbdd.php");
    include("function.php");
    if(!empty($_POST['pseudo'])) {
        $pseudo = securisation($_POST['pseudo']);
    
        $query = $bdd->prepare("SELECT * FROM comptes WHERE pseudo = :pseudo");
        $query->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
        $query->execute();
        $exist = $query->rowCount();
        $data = $query->fetchAll();
        $query->closeCursor();
        if($exist > 0) {
            echo 'exist';
        }
    }
    if(!empty($_POST['mail'])) {
        $mail = securisation($_POST['mail']);
    
        $query = $bdd->prepare("SELECT * FROM comptes WHERE mail = :mail");
        $query->bindValue(':mail', $mail, PDO::PARAM_STR);
        $query->execute();
        $exist = $query->rowCount();
        $data = $query->fetchAll();
        $query->closeCursor();
        if($exist > 0) {
            echo 'exist';
        }
    }
}
?>