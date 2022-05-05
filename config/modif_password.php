<?php

session_start();
if(!empty($_SESSION['autorisation']) && $_SESSION['autorisation'] == 'iseed') {
    
    if(!empty($_POST)){
        include('configbdd.php');
        require('function.php');

        $old_pass = $_POST['old_pass'];
        $new_pass = $_POST['new_pass'];
        $confirm_new_pass = $_POST['confirm_new_pass'];
        $compte = $_SESSION['id'];

        // Test si les variables ne sont pas vides
        if (!empty($old_pass) && !empty($new_pass) && !empty($confirm_new_pass)){

            $verif = $bdd->prepare('SELECT * FROM comptes WHERE id = :id');
            $verif->bindValue(':id', $compte, PDO::PARAM_INT);
            $verif->execute();
            $data = $verif->fetch();
            $verif->closeCursor();
            $result = $data['mdp'];
            $hashedPasswordCheck = password_verify($old_pass, $result);

            // Vérifie que le mot de passe crypté correspond au mot de passe entré
            if ($hashedPasswordCheck){
                if($new_pass == $confirm_new_pass){
                    $passwordhash = password_hash($new_pass, PASSWORD_DEFAULT);
                    $query = $bdd->prepare('UPDATE comptes SET mdp = :mdp WHERE id = :id');
                    $query->bindValue(':mdp', $passwordhash, PDO::PARAM_STR);
                    $query->bindValue(':id', $compte, PDO::PARAM_INT);
                    $insertion = $query->execute();

                    if($insertion) {
                        echo 'changed';
                    } else { echo 'error'; }
                } else { echo 'error'; }
            } else { echo 'error'; }
        } else { echo 'error'; }
    } else { echo 'error'; }
}else { echo 'error'; }
?>